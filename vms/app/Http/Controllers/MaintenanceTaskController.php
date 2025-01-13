<?php
// app/Http/Controllers/MaintenanceTaskController.php

namespace App\Http\Controllers;

use App\Models\MaintenanceTask;
use Illuminate\Http\Request;
use Inertia\Inertia;  // Import Inertia

class MaintenanceTaskController extends Controller
{
    // Fetch all maintenance tasks
    public function index()
    {
        $tasks = MaintenanceTask::with('venue')->get();

        // If you want to render a page with tasks using Inertia, use Inertia::render() here
        return Inertia::render('MaintenanceTasks', [
            'tasks' => $tasks
        ]);
    }

    // Create a new maintenance task
    public function store(Request $request)
    {
        $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'scheduled_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|in:pending,in_progress,completed',
            'description' => 'nullable|string',
        ]);

        $task = MaintenanceTask::create($request->all());

        // You can return a response with the task after creation
        return response()->json(['task' => $task], 201);
    }
}
