<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'venue_id',
        'job_description',
        'scheduled_date',
        'status'
    ];

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
