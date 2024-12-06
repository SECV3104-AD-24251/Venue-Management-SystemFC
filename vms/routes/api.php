<?php

use App\Http\Controllers\VenueController;

Route::get('/venues', [VenueController::class, 'index']);