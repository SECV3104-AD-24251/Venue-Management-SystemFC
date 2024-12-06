<?php
// app/Http/Controllers/VenueController.php

use App\Http\Controllers\VenueController;
use Illuminate\Support\Facades\Route;

// Only keep this route definition (remove the duplicate one)

Route::get('/venues', [VenueController::class, 'index']);
Route::get('/venues', [VenueController::class, 'index']);

