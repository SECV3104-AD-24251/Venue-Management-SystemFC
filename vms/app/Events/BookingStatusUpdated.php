<?php

namespace App\Events;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BookingStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Booking $booking,
        public string $status,
        public ?string $rejectionReason = null
    ) {}

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('App.Models.User.'.$this->booking->user_id);
    }

    public function broadcastAs(): string
    {
        return 'booking.status.updated';
    }

    public function broadcastWith(): array
    {
        $booking = $this->booking;

        return [
            'booking_id' => $booking->id,
            'venue_name' => $booking->venue->name ?? 'Unknown Venue',
            'date' => $booking->date?->format('Y-m-d'),
            'start_time' => $booking->start_time ? Carbon::parse($booking->start_time)->format('H:i') : null,
            'end_time' => $booking->end_time ? Carbon::parse($booking->end_time)->format('H:i') : null,
            'status' => $this->status,
            'rejection_reason' => $this->rejectionReason,
            'message' => $this->status === 'approved'
                ? 'Your booking for '.$booking->venue->name.' on '.$booking->date?->format('Y-m-d').' has been approved.'
                : 'Your booking for '.$booking->venue->name.' on '.$booking->date?->format('Y-m-d').' was rejected.',
        ];
    }
}
