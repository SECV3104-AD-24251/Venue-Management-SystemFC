import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
}

export default function Dashboard() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch initial list of venues
    useEffect(() => {
        axios
            .get('/api/venues')
            .then((response) => {
                setVenues(response.data);
            })
            .catch((error) => {
                console.error('Error fetching venues:', error);
            });
    }, []);

    // Automatically check availability when date/time changes
    useEffect(() => {
        if (selectedDate && selectedStartTime && selectedEndTime) {
            setLoading(true);

            const fetchAvailability = async () => {
                const updatedVenues = await Promise.all(
                    venues.map(async (venue) => {
                        try {
                            const response = await axios.post('/api/venues/check-availability', {
                                venue_id: venue.id,
                                date: selectedDate,
                                start_time: selectedStartTime,
                                end_time: selectedEndTime,
                            });
                            return { ...venue, status: response.data.available ? 'Available' : 'Not Available' };
                        } catch (error) {
                            console.error('Error checking availability for venue:', venue.id, error);
                            return venue; // Keep original venue data on error
                        }
                    })
                );

                setVenues(updatedVenues);
                setLoading(false);
            };

            fetchAvailability();
        }
    }, [selectedDate, selectedStartTime, selectedEndTime]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Venue 
                </h2>
            }
        >
            <Head title="Venue Availability" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-4">
                            {/* Date and Time Inputs */}
                            <div className="flex space-x-4">
                                <div>
                                    <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700">
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        id="selectedDate"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="selectedStartTime" className="block text-sm font-medium text-gray-700">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        id="selectedStartTime"
                                        value={selectedStartTime}
                                        onChange={(e) => setSelectedStartTime(e.target.value)}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="selectedEndTime" className="block text-sm font-medium text-gray-700">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        id="selectedEndTime"
                                        value={selectedEndTime}
                                        onChange={(e) => setSelectedEndTime(e.target.value)}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Loading Indicator */}
                            {loading && <p className="text-blue-500">Checking availability...</p>}

                            {/* Venue Table */}
                            <table className="min-w-full mt-6 table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">Name</th>
                                        <th className="px-4 py-2 border-b">Location</th>
                                        <th className="px-4 py-2 border-b">Capacity</th>
                                        <th className="px-4 py-2 border-b">Details</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venues.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-2">
                                                No venues available.
                                            </td>
                                        </tr>
                                    ) : (
                                        venues.map((venue) => (
                                            <tr key={venue.id}>
                                                <td className="text-center px-4 py-2 border-b">{venue.name}</td>
                                                <td className="text-center px-4 py-2 border-b">{venue.location}</td>
                                                <td className="text-center px-4 py-2 border-b">{venue.capacity}</td>
                                                <td className="text-center px-4 py-2 border-b">
                                                    <Link
                                                        href={route('venues.show', { id: venue.id })}
                                                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                                    >
                                                        See Details
                                                    </Link>
                                                </td>
                                                <td
                                                    className={`text-center px-4 py-2 border-b ${
                                                        venue.status === 'Available'
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {venue.status || 'Unknown'}
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
