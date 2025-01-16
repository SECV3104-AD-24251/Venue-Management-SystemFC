<?php
 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Specify the table name if it's not following the convention
    protected $table = 'bookings';

    // Define the fields that can be mass assigned
    protected $fillable = [
        'name',
        'email',
        'capacity',
        'venue_id',
        'date',
        'start_time',
        'end_time',
        'comments',
        'user_id',
    ];

    // Define the relationship with the Venue model
    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id');
    }
}
