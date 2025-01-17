import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import axios from 'axios'

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
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    fetch('/refresh-csrf', {
        method: 'GET',
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
            const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
            if (csrfMetaTag) {
                csrfMetaTag.setAttribute('content', data.csrf_token);
                console.log('CSRF token refreshed:', data.csrf_token);
            } else {
                console.error('CSRF token meta tag not found.');
            }
        })
        .catch((error) => {
            console.error('Failed to refresh CSRF token:', error);
        });
    
    

    const [statuses, setStatuses] = useState(
        maintenances.reduce((acc, maintenance) => {
            acc[maintenance.id] = maintenance.status;
            return acc;
        }, {} as Record<number, string>)
    ); 
    

    const handleStatusChange = async (maintenanceId: number, newStatus: string) => {       
        if (newStatus === 'completed') {
            const confirmed = window.confirm(
                'Are you sure you want to mark this task as "completed"? Once marked, it cannot be changed.'
            );
            if (!confirmed) {
                return;
            }
        }
    
        try {
            const response = await fetch(`/api/maintenance/${maintenanceId}`, {              
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (response.ok) {
                // Update local state only on success
                setStatuses((prev) => ({
                    ...prev,
                    [maintenanceId]: newStatus,
                }));
                alert('Status updated successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error updating status:', errorData);
                alert('Failed to update the status. Please try again.');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update the status. Please try again.');
        }
    };
    

    const generateReport = async (maintenanceId: number) => {
        try {
            const response = await fetch(`/maintenance/${maintenanceId}/report`, {
                method: 'GET',
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate the report.');
            }
    
            // Convert the response to a blob
            const blob = await response.blob();
    
            // Create a download link for the blob
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Maintenance_Report_${maintenanceId}.pdf`;
            document.body.appendChild(a);
            a.click();
    
            // Clean up
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
    
            alert('Report generated successfully!');
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate the report. Please try again.');
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
                                        <th className="px-4 py-2 border-b">Venue Name</th>
                                        <th className="px-4 py-2 border-b">Description</th>
                                        <th className="px-4 py-2 border-b">Scheduled Date</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                        <th className="px-4 py-2 border-b">Action</th>
                                        <th className="px-4 py-2 border-b">Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-2">
                                                No maintenance records available.
                                            </td>
                                        </tr>
                                    ) : (
                                        maintenances.map((maintenance) => (
                                            <tr key={maintenance.id}>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.venue.name}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.description}</td>
                                                <td className="text-center px-4 py-2 border-b">{maintenance.scheduled_for_date}</td>
                                                <td className="text-center px-4 py-2 border-b">{statuses[maintenance.id]}</td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <div
                                                        className={`relative inline-block ${
                                                            statuses[maintenance.id] === 'completed' ? 'group' : ''
                                                        }`}
                                                    >
                                                        <select
                                                            value={statuses[maintenance.id]}
                                                            onChange={(e) =>
                                                                handleStatusChange(maintenance.id, e.target.value)
                                                            }
                                                            disabled={statuses[maintenance.id] === 'completed'}
                                                            className={`rounded-md border border-gray-300 px-2 py-1 ${
                                                                statuses[maintenance.id] === 'completed'
                                                                    ? 'bg-gray-200 cursor-not-allowed'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <option value="scheduled">scheduled</option>
                                                            <option value="in-progress">in-progress</option>
                                                            <option value="completed">completed</option>
                                                        </select>
                                                        {statuses[maintenance.id] === 'completed' && (
                                                            <span className="absolute left-0 top-full mt-1 hidden w-48 rounded-md bg-gray-700 p-2 text-xs text-white shadow-lg group-hover:block">
                                                                Task is already completed.
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <button
                                                        onClick={() => generateReport(maintenance.id)}
                                                        disabled={statuses[maintenance.id] !== 'completed'}
                                                        className={`rounded-md px-4 py-2 text-white ${
                                                            statuses[maintenance.id] === 'completed'
                                                                ? 'bg-green-500 hover:bg-green-700'
                                                                : 'bg-gray-400 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        Generate Report
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
