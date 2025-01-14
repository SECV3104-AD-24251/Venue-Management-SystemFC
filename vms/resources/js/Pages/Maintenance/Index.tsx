import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

interface Maintenance {
    id: number;
    name: string;
    description: string;
    status: string;
}

export default function MaintenanceList() {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

    useEffect(() => {
        axios.get('/api/maintenances') // Ensure you have an endpoint to fetch maintenance data
            .then(response => {
                setMaintenances(response.data);
            })
            .catch(error => {
                console.error('Error fetching maintenance:', error);
            });
    }, []);

    const checkMaintenanceAvailability = async (maintenanceId: number) => {
        try {
            const response = await axios.post('/api/maintenances/check-availability', {
                maintenance_id: maintenanceId,
            });

            if (response.data.available) {
                alert(`Maintenance ${maintenanceId} is available!`);
            } else {
                alert(`Maintenance ${maintenanceId} is not available.`);
            }
        } catch (error) {
            console.error('Error checking availability:', error);
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
                                
                                {/* Add button only for staff */}
                                
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
                                        <th className="px-4 py-2 border-b">Status</th>
                                        <th className="px-4 py-2 border-b">Details</th>
                                        <th className="px-4 py-2 border-b">Availability</th>
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
                                                <td className="text-center px-4 py-2 border-b">{maintenance.name}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.description}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.status}</td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <Link
                                                        href={route('maintenance.show', { id: maintenance.id })}
                                                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                                    >
                                                        See Details
                                                    </Link>
                                                </td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <button
                                                        onClick={() => checkMaintenanceAvailability(maintenance.id)}
                                                        className={`rounded-md px-4 py-2 text-white ${
                                                            maintenance.status === 'Not Available'
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : 'bg-blue-500 hover:bg-blue-700'
                                                        }`}
                                                    >
                                                        {maintenance.status === 'Not Available' ? 'Not Available' : 'Check Availability'}
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
