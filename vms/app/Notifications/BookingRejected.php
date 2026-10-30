<?php

namespace App\Notifications;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Notifications\Notification;

class BookingRejected extends Notification
{
    public function __construct(
        public Booking $booking
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase(object $notifiable): array
    {
        $booking = $this->booking;

        return [
            'booking_id' => $booking->id,
            'venue_name' => $booking->venue->name ?? 'Unknown Venue',
            'date' => $booking->date?->format('Y-m-d'),
            'start_time' => $booking->start_time ? Carbon::parse($booking->start_time)->format('H:i') : null,
            'end_time' => $booking->end_time ? Carbon::parse($booking->end_time)->format('H:i') : null,
            'status' => 'rejected',
            'rejection_reason' => $booking->rejection_reason,
            'message' => 'Your booking for '.$booking->venue->name.' on '.$booking->date?->format('Y-m-d').' was rejected. Reason: '.$booking->rejection_reason,
        ];
    }

    public function toBroadcast(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
