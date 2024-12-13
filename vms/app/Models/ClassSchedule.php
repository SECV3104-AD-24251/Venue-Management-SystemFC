<?php

// app/Models/ClassSchedule.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'venue_id', 'lecturer_name', 'day', 'start_time', 'end_time'
    ];

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
