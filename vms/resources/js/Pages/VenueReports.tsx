import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Report {
    venue_name: string;
    total_bookings?: number;
    total_maintenance?: number;
    completed_maintenance?: number;
    total_tasks?: number;
    completion_rate?: number;
    total_hours_booked?: number;
}

const VenueReports: React.FC = () => {
    const [reports, setReports] = useState({
        mostUsedVenues: [],
        mostMaintainedVenues: [],
        maintenanceCompletion: [],
        venueUtilization: [],
    });
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const handleRowClick = (name: string) => {
        setExpandedRow(expandedRow === name ? null : name);
    };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/api/reports/venue');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Venue Reports
                </h2>
            }
        >
            <Head title="Venue Reports" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold">Most Used Venues</h3>
                            <table className="min-w-full table-auto border-collapse mt-4">
                                <thead>
                                    <tr>
                                        <th className="border-b px-4 py-2">Venue Name</th>
                                        <th className="border-b px-4 py-2">Total Bookings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.mostUsedVenues.map((venue: Report, index: number) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleRowClick(venue.venue_name)}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            <td className="text-center border-b px-4 py-2">{venue.venue_name}</td>
                                            <td className="text-center border-b px-4 py-2">{venue.total_bookings}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h3 className="text-lg font-semibold mt-8">Venues with Most Maintenance</h3>
                            <table className="min-w-full table-auto border-collapse mt-4">
                                <thead>
                                    <tr>
                                        <th className="border-b px-4 py-2">Venue Name</th>
                                        <th className="border-b px-4 py-2">Total Maintenance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.mostMaintainedVenues.map((venue: Report, index: number) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="text-center border-b px-4 py-2">{venue.venue_name}</td>
                                            <td className="text-center border-b px-4 py-2">{venue.total_maintenance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h3 className="text-lg font-semibold mt-8">Maintenance Completion Analysis</h3>
                            <table className="min-w-full table-auto border-collapse mt-4">
                                <thead>
                                    <tr>
                                        <th className="border-b px-4 py-2">Venue Name</th>
                                        <th className="border-b px-4 py-2">Completed Maintenance</th>
                                        <th className="border-b px-4 py-2">Total Maintenance</th>
                                        <th className="border-b px-4 py-2">Completion Rate (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.maintenanceCompletion.map((venue: Report, index: number) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="text-center border-b px-4 py-2">{venue.venue_name}</td>
                                            <td className="text-center border-b px-4 py-2">{venue.completed_maintenance}</td>
                                            <td className="text-center border-b px-4 py-2">{venue.total_tasks}</td>
                                            <td className="text-center border-b px-4 py-2">{venue.completion_rate}%</td>
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

export default VenueReports;
