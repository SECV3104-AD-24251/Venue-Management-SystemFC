import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface Venue {
    name: string;
}

interface Maintenance {
    id: number;
    venue: Venue;
    description: string;
    status: string;
    scheduled_for: string;
}

interface MaintenanceIndexProps {
    maintenances: Maintenance[];
}

const MaintenanceIndex: React.FC<MaintenanceIndexProps> = ({ maintenances }) => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleRowClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this maintenance record?')) {
            router.delete(`/maintenance/${id}`, {
                onSuccess: () => alert('Maintenance deleted successfully!'),
                onError: (errors) => alert('Error deleting maintenance'),
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Maintenance Jobs</h2>}>
            <Head title="Maintenance Jobs" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link href="/maintenance/create" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                                    Create Maintenance
                                </Link>
                            </div>

                            {maintenances.length === 0 ? (
                                <div className="text-red-500">No maintenance records found.</div>
                            ) : (
                                <div>
                                    <table className="min-w-full table-auto border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border-b px-4 py-2 text-left">Venue</th>
                                                <th className="border-b px-4 py-2 text-left">Description</th>
                                                <th className="border-b px-4 py-2 text-left">Status</th>
                                                <th className="border-b px-4 py-2 text-left">Scheduled For</th>
                                                <th className="border-b px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {maintenances.map((maintenance) => (
                                                <React.Fragment key={maintenance.id}>
                                                    <tr
                                                        onClick={() => handleRowClick(maintenance.id)}
                                                        className="cursor-pointer hover:bg-gray-100"
                                                    >
                                                        <td className="border-b px-4 py-2">{maintenance.venue.name}</td>
                                                        <td className="border-b px-4 py-2">{maintenance.description}</td>
                                                        <td className="border-b px-4 py-2">{maintenance.status}</td>
                                                        <td className="border-b px-4 py-2">{maintenance.scheduled_for}</td>
                                                        <td className="border-b px-4 py-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    router.visit(`/maintenance/${maintenance.id}`); // View Details
                                                                }}
                                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                                            >
                                                                View
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDelete(maintenance.id);
                                                                }}
                                                                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedRow === maintenance.id && (
                                                        <tr>
                                                            <td colSpan={5} className="border-b px-4 py-2">
                                                                <div>
                                                                    <p><strong>Description:</strong> {maintenance.description}</p>
                                                                    <p><strong>Scheduled For:</strong> {maintenance.scheduled_for}</p>
                                                                    <p><strong>Status:</strong> {maintenance.status}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MaintenanceIndex;
