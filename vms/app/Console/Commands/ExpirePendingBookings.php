<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Illuminate\Console\Command;

class ExpirePendingBookings extends Command
{
    protected $signature = 'bookings:expire-pending';

    protected $description = 'Expire pending bookings that are past their date';

    public function handle(): int
    {
        $expiredCount = Booking::where('status', 'pending')
            ->whereDate('date', '<', now()->toDateString())
            ->update([
                'status' => 'expired',
                'approved_at' => now(),
            ]);

        $this->info("Expired {$expiredCount} pending bookings.");

        return Command::SUCCESS;
    }
}
