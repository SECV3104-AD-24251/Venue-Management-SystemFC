<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    protected $fillable = [
        'name',
        'email',
        'password',
        'level',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    // app/Models/User.php
    public function getRoleAttribute(): string
    {
        return match ($this->level) {
            1 => 'admin',
            2 => 'lecturer',
            default => 'staff',
        };
    }

    // Method to check if a user has a specific role
    public function hasRole($role): bool
    {
        $roles = [
            'admin' => 1,
            'lecturer' => 2,
            'staff' => 3,
        ];

        return isset($roles[$role]) && $this->level <= $roles[$role];
    }

}
