<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Venue;
use App\Notifications\BookingApproved;
use App\Notifications\BookingRejected;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Booking::class);

        $bookings = Booking::with('venue')
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return Inertia::render('ViewBooking', [
            'bookings' => $bookings,
        ]);
    }

    public function adminIndex(Request $request)
    {
        $this->authorize('viewAny', Booking::class);

        $query = Booking::with(['venue', 'user', 'approvedBy'])
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('venue', fn ($v) => $v->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->filled('date_from')) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('date', '<=', $request->date_to);
        }

        $bookings = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'search', 'date_from', 'date_to']),
        ]);
    }

    public function getFilteredVenues(Request $request)
    {
        $lectureType = $request->input('lecture_type');
        $requiredEquipment = $request->input('equipment');
        $capacity = $request->input('capacity');

        $venues = Venue::where('capacity', '>=', $capacity)
            ->when($lectureType, function ($query, $lectureType) {
                return $query->where('lecture_type', $lectureType);
            })
            ->when($requiredEquipment, function ($query, $requiredEquipment) {
                return $query->whereJsonContains('equipment', $requiredEquipment);
            })
            ->get();

        return response()->json($venues);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Booking::class);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'capacity' => 'required|integer|min:1',
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'comments' => 'nullable|string',
        ]);

        $conflictingBookings = Booking::conflicts($request->venue_id, $request->date, $request->start_time, $request->end_time)
            ->where('status', '!=', 'rejected')
            ->get();

        if ($conflictingBookings->isNotEmpty()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'message' => 'Venue has conflicting bookings at this time.'], 422);
            }

            return redirect()->back()->with('error', 'Venue has conflicting bookings at this time.');
        }

        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'capacity' => $request->capacity,
            'venue_id' => $request->venue_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'comments' => $request->comments,
            'user_id' => Auth::id(),
            'status' => 'pending',
        ]);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Booking request submitted for approval!', 'booking' => $booking]);
        }

        return redirect()->back()->with('success', 'Booking request submitted for approval!');
    }

    public function checkTime(Request $request)
    {
        $this->authorize('create', Booking::class);

        $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $venue_id = $request->venue_id;
        $date = $request->date;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $conflictingBookings = Booking::conflicts($venue_id, $date, $start_time, $end_time)
            ->where('status', '!=', 'rejected')
            ->exists();

        if ($request->wantsJson()) {
            return response()->json(['success' => ! $conflictingBookings]);
        }

        return redirect()->back()->with('conflict', $conflictingBookings ? 'Conflict exists!' : 'No conflict');
    }

    public function approve(Request $request, $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        $this->authorize('approve', $booking);

        $conflicts = Booking::conflicts($booking->venue_id, $booking->date, $booking->start_time, $booking->end_time)
            ->where('status', 'approved')
            ->where('id', '!=', $booking->id)
            ->exists();

        if ($conflicts) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'message' => 'Cannot approve: venue now has a conflicting approved booking.'], 422);
            }

            return redirect()->back()->with('error', 'Cannot approve: venue now has a conflicting approved booking.');
        }

        $booking->update([
            'status' => 'approved',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        $booking->user->notify(new BookingApproved($booking));

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Booking approved.']);
        }

        return redirect()->back()->with('success', 'Booking approved.');
    }

    public function reject(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:1000',
        ]);

        $booking = Booking::findOrFail($id);

        $this->authorize('reject', $booking);

        $booking->update([
            'status' => 'rejected',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        $booking->user->notify(new BookingRejected($booking));

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Booking rejected.']);
        }

        return redirect()->back()->with('success', 'Booking rejected.');
    }

    public function destroy($id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        $this->authorize('delete', $booking);

        try {
            $booking->delete();

            return redirect()->back()->with('success', 'Booking deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete booking.');
        }
    }

    public function showSchedule()
    {
        $schedules = ClassSchedule::with('venue')->get();

        return Inertia::render('Schedule', [
            'schedules' => $schedules,
        ]);
    }

    public function edit($id)
    {
        $booking = Booking::with('venue')->findOrFail($id);

        $this->authorize('view', $booking);

        $venues = Venue::all();

        return Inertia::render('EditBooking', [
            'booking' => $booking,
            'venues' => $venues,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        $this->authorize('update', $booking);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'capacity' => 'required|integer',
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'comments' => 'nullable|string',
        ]);

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Booking updated successfully!');
    }

    public function getSuggestions(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'startTime' => 'required',
            'endTime' => 'required',
            'classSize' => 'required|integer',
            'equipment' => 'array',
            'specialRequirements' => 'string|nullable',
        ]);

        $availableClassrooms = Venue::where('capacity', '>=', $validated['classSize'])
            ->whereDoesntHave('bookings', function ($query) use ($validated) {
                $query->where('date', $validated['date'])
                    ->whereBetween('time', [$validated['startTime'], $validated['endTime']]);
            })
            ->whereDoesntHave('maintenances', function ($query) use ($validated) {
                $query->where('scheduled_for_date', $validated['date'])
                    ->where(function ($query) use ($validated) {
                        $query->whereNull('scheduled_for_time')
                            ->orWhereBetween('scheduled_for_time', [$validated['startTime'], $validated['endTime']]);
                    });
            })
            ->where(function ($query) use ($validated) {
                foreach ($validated['equipment'] as $equipment) {
                    $query->whereJsonContains('equipment', $equipment);
                }
            })
            ->get();

        return response()->json($availableClassrooms);
    }

    public function getNotifications()
    {
        $user = Auth::user();

        $dbNotifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'data' => $notification->data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->toISOString(),
                ];
            });

        return response()->json([
            'notifications' => $dbNotifications,
            'unread_count' => $user->unreadNotifications()->count(),
        ]);
    }

    public function markNotificationAsRead($id)
    {
        $updated = Auth::user()->notifications()
            ->where('id', $id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        if (! $updated) {
            $exists = Auth::user()->notifications()->where('id', $id)->exists();
            if (! $exists) {
                return response()->json(['success' => false, 'message' => 'Notification not found.'], 404);
            }
        }

        return response()->json(['success' => true]);
    }

    public function markAllNotificationsAsRead()
    {
        Auth::user()->unreadNotifications()
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }
}
