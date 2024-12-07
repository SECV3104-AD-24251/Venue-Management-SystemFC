<?php

use App\Http\Controllers\VenueController;
use Illuminate\Support\Facades\Route;


Route::apiResource('/venues', [VenueController::class, 'index']);

