<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_name',
        'section',
        'lecturer_name',
        'day',
        'start_time',
        'end_time',
        'venue_id',
    ];

    public function lecturer()
    {
        return $this->belongsTo(User::class, 'lecturer_id');
    }
}
