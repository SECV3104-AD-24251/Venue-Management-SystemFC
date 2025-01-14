import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface ScheduleProps {
    schedules: any[]; // It seems like schedules should be an array
}

const Schedule = ({ schedules }: ScheduleProps) => {
    // Check if schedules is defined and is an array
    if (!schedules || schedules.length === 0) {
        return (
            <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Class Schedule</h2>}>
                <Head title="Class Schedule" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="font-bold text-xl"></h3>
                                <p>No schedules available.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Class Schedule</h2>}>
            <Head title="Class Schedule" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-xl">Class Schedule</h3>
                            <table className="min-w-full mt-4">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Class Name</th>
                                        <th className="px-4 py-2 text-left">Lecturer</th>
                                        <th className="px-4 py-2 text-left">Day</th>
                                        <th className="px-4 py-2 text-left">Start Time</th>
                                        <th className="px-4 py-2 text-left">End Time</th>
                                        <th className="px-4 py-2 text-left">Venue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map((schedule) => (
                                        <tr key={schedule.id}>
                                            <td className="px-4 py-2">{schedule.class_name}</td>
                                            <td className="px-4 py-2">{schedule.lecturer_name}</td>
                                            <td className="px-4 py-2">{schedule.day}</td>
                                            <td className="px-4 py-2">{schedule.start_time}</td>
                                            <td className="px-4 py-2">{schedule.end_time}</td>
                                            <td className="px-4 py-2">{schedule.venue.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Schedule;
