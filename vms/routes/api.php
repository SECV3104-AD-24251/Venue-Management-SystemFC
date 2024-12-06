<?php

use App\Http\Controllers\VenueController;
use Illuminate\Support\Facades\Route;


Route::get('/venues', [VenueController::class, 'index']);

