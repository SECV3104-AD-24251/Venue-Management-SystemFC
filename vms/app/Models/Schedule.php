<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'section',
        'day',
        'time',
        'duration',
        'capacity',
        'lecturer_id',
        'venue_id',
        'class_name',
        'lecturer_name',
        'start_time',
        'end_time',
    ];

    public function lecturer()
    {
        return $this->belongsTo(User::class, 'lecturer_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id');
    }
}
