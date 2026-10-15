<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Notifications\Notification;

class BookingApproved extends Notification
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
        return [
            'booking_id' => $this->booking->id,
            'venue_name' => $this->booking->venue->name ?? 'Unknown Venue',
            'date' => $this->booking->date?->format('Y-m-d'),
            'start_time' => $this->booking->start_time?->format('H:i'),
            'end_time' => $this->booking->end_time?->format('H:i'),
            'status' => 'approved',
            'message' => "Your booking for {$this->booking->venue->name} on {$this->booking->date} has been approved.",
        ];
    }

    public function toBroadcast(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
