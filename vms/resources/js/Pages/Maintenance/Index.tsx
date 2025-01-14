import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

interface Maintenance {
    id: number;
    description: string;
    scheduled_for_date: string;
    scheduled_for_time: string;
    status: string;
    venue: { name: string };
}

interface Props {
    maintenances: Maintenance[];
}

export default function MaintenanceList({ maintenances }: Props) {
    const viewMaintenanceDetails = (maintenanceId: number) => {
        const maintenance = maintenances.find(m => m.id === maintenanceId);
        if (maintenance) {
            alert(`Maintenance scheduled for ${maintenance.scheduled_for_date} at ${maintenance.scheduled_for_time}.`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maintenance List
                </h2>
            }
        >
            <Head title="Maintenance List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-semibold">Manage Maintenance</h3>
                                <Link
                                    href={route('maintenance.create')}
                                    className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Add Maintenance
                                </Link>
                            </div>

                            <table className="min-w-full mt-6 table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Name</th>
                                        <th className="px-4 py-2 border-b">Description</th>
                                        <th className="px-4 py-2 border-b">Scheduled Date</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                        <th className="px-4 py-2 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-2">
                                                No maintenance records available.
                                            </td>
                                        </tr>
                                    ) : (
                                        maintenances.map((maintenance) => (
                                            <tr key={maintenance.id}>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.venue.name}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.description}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.scheduled_for_date}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.status}</td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <button
                                                        onClick={() => viewMaintenanceDetails(maintenance.id)}
                                                        className={`rounded-md px-4 py-2 text-white ${
                                                            maintenance.status === 'Not Available'
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : 'bg-blue-500 hover:bg-blue-700'
                                                        }`}
                                                    >
                                                        {maintenance.status === 'Not Available' ? 'Available' : 'View Details'}
                                                    </button>
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
}
