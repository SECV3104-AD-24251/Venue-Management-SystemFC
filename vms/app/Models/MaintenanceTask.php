<?php

// app/Models/MaintenanceTask.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceTask extends Model
{
    use HasFactory;

    protected $fillable = ['venue_id', 'scheduled_date', 'start_time', 'end_time', 'status', 'description'];

    // Relationship with Venue model (assuming you have a Venue model)
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}

