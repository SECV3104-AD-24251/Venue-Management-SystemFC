<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->get('/venues', function (Request $request) {
    return \App\Models\Venue::all();
});
