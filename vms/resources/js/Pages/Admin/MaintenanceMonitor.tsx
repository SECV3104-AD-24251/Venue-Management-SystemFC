import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Maintenance {
    id: number;
    description: string;
    scheduled_for_date: string;
    scheduled_for_time: string;
    status: string;
    venue: { name: string };
    completed_at: string;
}

interface Props {
    maintenances: Maintenance[];
}

const MaintenanceMonitor: React.FC<Props> = ({ maintenances }) => {
    const [filter, setFilter] = useState<string>('all');

    const filteredMaintenances = maintenances.filter((maintenance: Maintenance) => {
        if (filter === 'all') return true;
        return maintenance.status === filter;
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maintenance Monitoring
                </h2>
            }
        >
            <Head title="Maintenance Monitoring" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-semibold">Monitor Venue Maintenance</h3>
                                <select
                                    className="rounded-md border-gray-300"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <table className="min-w-full table-auto border-collapse">
    <thead>
        <tr>
            <th className="border px-4 py-2">Venue Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Scheduled Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Completed Date</th>
        </tr>
    </thead>
    <tbody>
        {filteredMaintenances.length === 0 ? (
            <tr>
                <td colSpan={5} className="text-center py-4">
                    No maintenance records found.
                </td>
            </tr>
        ) : (
            filteredMaintenances.map((maintenance: Maintenance) => (
                <tr key={maintenance.id}>
                    <td className="border px-4 py-2 text-center">
                        {maintenance.venue.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                        {maintenance.description}
                    </td>
                    <td className="border px-4 py-2 text-center">
                        {maintenance.scheduled_for_date}
                    </td>
                    <td className="border px-4 py-2 text-center">
                        {maintenance.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                        {maintenance.completed_at || 'N/A'}
                    </td>
                </tr>
            ))
        )}
    </tbody>
</table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MaintenanceMonitor;
