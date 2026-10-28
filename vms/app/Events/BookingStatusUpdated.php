<?php

namespace App\Events;

use App\Models\Booking;
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
        return [
            'booking_id' => $this->booking->id,
            'venue_name' => $this->booking->venue->name ?? 'Unknown Venue',
            'date' => $this->booking->date?->format('Y-m-d'),
            'start_time' => $this->booking->start_time?->format('H:i'),
            'end_time' => $this->booking->end_time?->format('H:i'),
            'status' => $this->status,
            'rejection_reason' => $this->rejectionReason,
            'message' => $this->status === 'approved'
                ? "Your booking for {$this->booking->venue->name} on {$this->booking->date} has been approved."
                : "Your booking for {$this->booking->venue->name} on {$this->booking->date} was rejected.",
        ];
    }
}
