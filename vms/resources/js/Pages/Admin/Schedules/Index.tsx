import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Schedule {
    id: number;
    class_name: string;
    section: number;
    lecturer_name: string | null;
    day: string;
    start_time: string | null;
    end_time: string | null;
    venue?: { name: string } | null;
}

interface Props {
    schedules: Schedule[];
}

export default function AdminSchedules({ schedules }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Class Schedules</h2>}>
            <Head title="Class Schedules" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-xl mb-4">Class Schedules</h3>
                            {(!schedules || schedules.length === 0) ? (
                                <p>No schedules available.</p>
                            ) : (
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left">Class Name</th>
                                            <th className="px-4 py-2 text-left">Section</th>
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
                                                <td className="px-4 py-2">{schedule.section}</td>
                                                <td className="px-4 py-2">{schedule.lecturer_name}</td>
                                                <td className="px-4 py-2">{schedule.day}</td>
                                                <td className="px-4 py-2">{schedule.start_time}</td>
                                                <td className="px-4 py-2">{schedule.end_time}</td>
                                                <td className="px-4 py-2">{schedule.venue?.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
