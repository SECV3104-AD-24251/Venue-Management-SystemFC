<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Booking $booking): bool
    {
        return $booking->user_id === $user->id || $user->hasRole('admin');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Booking $booking): bool
    {
        return $booking->user_id === $user->id && $booking->status !== 'approved';
    }

    public function delete(User $user, Booking $booking): bool
    {
        return $booking->user_id === $user->id;
    }

    public function approve(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin') && $booking->status === 'pending';
    }

    public function reject(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin') && $booking->status === 'pending';
    }

    public function restore(User $user, Booking $booking): bool
    {
        return false;
    }

    public function forceDelete(User $user, Booking $booking): bool
    {
        return false;
    }
}
