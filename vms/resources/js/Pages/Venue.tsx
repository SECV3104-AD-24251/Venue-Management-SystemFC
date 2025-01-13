import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

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

    useEffect(() => {
        axios.get('/api/venues') // Ensure the API includes `is_booked`
            .then(response => {
                setVenues(response.data);
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch venue statuses dynamically
        const fetchVenueStatuses = async () => {
            const updatedVenues = await Promise.all(
                venues.map(async (venue) => {
                    try {
                        const response = await axios.post('/api/venues/status', {
                            venue_id: venue.id,
                            date: selectedDate, // Ensure you have this state
                            start_time: selectedStartTime, // Ensure you have this state
                            end_time: selectedEndTime, // Ensure you have this state
                        });
    
                        return { ...venue, status: response.data.status };
                    } catch (error) {
                        console.error('Error fetching status for venue:', venue.id, error);
                        return venue; // Keep original if there's an error
                    }
                })
            );
    
            setVenues(updatedVenues); // Update state with the new statuses
        };
    
        if (selectedDate && selectedStartTime && selectedEndTime) {
            fetchVenueStatuses();
        }
    }, [venues, selectedDate, selectedStartTime, selectedEndTime]);
    const checkAvailability = async (venueId: number, date: string, startTime: string, endTime: string) => {
        try {
            const response = await axios.post('/api/venues/check-availability', {
                venue_id: venueId,
                date,
                start_time: startTime,
                end_time: endTime,
            });
            return response.data.available; // Boolean indicating availability
        } catch (error) {
            console.error('Error checking availability:', error);
            return false;
        }
    };
    const handleCheckAvailability = async (venue: Venue) => {
        const isAvailable = await checkAvailability(venue.id, selectedDate, selectedStartTime, selectedEndTime);
    
        if (isAvailable) {
            alert(`${venue.name} is available!`);
        } else {
            alert(`${venue.name} is not available.`);
    
            // Update the venue's status to "Not Available" in the venues list
            setVenues((prevVenues) =>
                prevVenues.map((v) =>
                    v.id === venue.id ? { ...v, status: 'Not Available' } : v
                )
            );
        }
    };
    
        

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
                                                <td className="text-center px-4 py-2 border-b">

                                                <button
                                                    onClick={() => handleCheckAvailability(venue)}
                                                    disabled={venue.status === 'Not Available'}
                                                    className={`rounded-md px-4 py-2 text-white ${
                                                    venue.status === 'Not Available'
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-700'
                                                    }`}
                                                >
                                                {venue.status === 'Not Available' ? 'Not Available' : 'Check Availability'}
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
