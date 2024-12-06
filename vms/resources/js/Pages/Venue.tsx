import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

export default function Dashboard() {
    // Explicitly type the state as an array of Venue objects
    const [venues, setVenues] = useState<Venue[]>([]);

    // Fetch venues data from API on component mount
    useEffect(() => {
        axios.get('/api/venues')  // Ensure this endpoint is correct
            .then(response => {
                setVenues(response.data);  // Set the venues data to state
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }, []); // Empty dependency array makes this run only once

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Venue List
                </h2>
            }
        >
            <Head title="Venue List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* Table to display venues */}
                            <table className="min-w-full mt-6 table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Name</th>
                                        <th className="px-4 py-2 border-b">Location</th>
                                        <th className="px-4 py-2 border-b">Capacity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venues.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="text-center py-2">No venues available.</td>
                                        </tr>
                                    ) : (
                                        venues.map((venue) => (
                                            <tr key={venue.id}>
                                                <td className="text-center py-2 px-4 py-2 border-b">{venue.name}</td>
                                                <td className="text-center py-2 px-4 py-2 border-b">{venue.location}</td>
                                                <td className="text-center py-2 px-4 py-2 border-b">{venue.capacity}</td>
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
