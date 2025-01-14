<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'venue_id', 'description', 'scheduled_for_date', 'scheduled_for_time', 'status',
    ];

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
