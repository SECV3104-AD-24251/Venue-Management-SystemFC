import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

// Define the TypeScript interface for the Venue
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
                    Dashboard
                </h2>
            }
        >
            <Head title = "Dashboard"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="text-xl">Hello</p>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
