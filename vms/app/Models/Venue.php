<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = ['name', 'location', 'capacity'];
}

