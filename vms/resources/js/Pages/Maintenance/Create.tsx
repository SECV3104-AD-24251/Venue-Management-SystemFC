import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';

export default function MaintenanceCreate() {
    // Venue type definition
    interface Venue {
        id: number;
        name: string;
        capacity: number;
        status: string;
    }

    // State for venues
    const [venues, setVenues] = useState<Venue[]>([]);
    const [suggestedVenue, setSuggestedVenue] = useState<Venue | null>(null);

    const { data, setData, errors, post, processing, reset } = useForm({
        venue_id: '',
        description: '',
        scheduled_for_date: '',
        scheduled_for_time: '',
    });

    // Fetch venues on component mount
    useEffect(() => {
        axios
            .get('/api/venues')
            .then((response) => setVenues(response.data))
            .catch((error) => console.error('Error fetching venues:', error));
    }, []);

    // Suggest a venue based on user input
    const suggestVenue = async () => {
        const { scheduled_for_date, scheduled_for_time } = data;

        // Reset suggestedVenue if required fields are missing
        if (!scheduled_for_date || !scheduled_for_time) {
            setSuggestedVenue(null);
            return;
        }

        // Check availability for each venue
        for (const venue of venues) {
            const isAvailable = await checkVenueAvailability(
                venue.id,
                scheduled_for_date,
                scheduled_for_time
            );

            if (isAvailable) {
                setSuggestedVenue(venue); // Suggest the first available venue
                return;
            }
        }

        // No suitable venue found
        setSuggestedVenue(null);
    };

    // Check venue availability
    const checkVenueAvailability = async (
        venue_id: number,
        date: string,
        time: string
    ) => {
        try {
            const response = await axios.post('/api/maintenance/check-time', {
                venue_id,
                scheduled_for_date: date,
                scheduled_for_time: time,
            });
            return response.data.success; // true if available, false if not
        } catch (error) {
            console.error('Error checking venue availability:', error);
            return false; // Assume unavailable on error
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/maintenance', data);

            if (response.data.success) {
                alert('Maintenance job created successfully!');
                reset(); // Reset form after successful submission
            } else {
                alert(response.data.message || 'An error occurred during maintenance job creation.');
            }
        } catch (error) {
            console.error('Error submitting maintenance job:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Maintenance Job</h2>}
        >
            <Head title="Create Maintenance" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Venue Selection */}
                                <div>
                                    <InputLabel htmlFor="venue_id" value="Venue" />
                                    <select
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(e) => setData('venue_id', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Select Venue</option>
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.venue_id} />
                                </div>

                                {/* Description */}
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Scheduled Date */}
                                <div>
                                    <InputLabel htmlFor="scheduled_for_date" value="Scheduled Date" />
                                    <TextInput
                                        id="scheduled_for_date"
                                        type="date"
                                        value={data.scheduled_for_date}
                                        onChange={(e) => setData('scheduled_for_date', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.scheduled_for_date} />
                                </div>

                                {/* Scheduled Time */}
                                <div>
                                    <InputLabel htmlFor="scheduled_for_time" value="Scheduled Time" />
                                    <TextInput
                                        id="scheduled_for_time"
                                        type="time"
                                        value={data.scheduled_for_time}
                                        onChange={(e) => setData('scheduled_for_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.scheduled_for_time} />
                                </div>

                                {/* Suggested Venue */}
                                {suggestedVenue && (
                                    <div className="p-4 bg-green-100 border border-green-400 rounded-md">
                                        <p>
                                            Suggested Venue: <strong>{suggestedVenue.name}</strong> (Capacity: {suggestedVenue.capacity})
                                        </p>
                                        <button
                                            type="button"
                                            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                                            onClick={() => setData('venue_id', suggestedVenue.id.toString())}
                                        >
                                            Select Suggested Venue
                                        </button>
                                    </div>
                                )}

                                {/* Submit */}
                                <div>
                                    <NormalButton disabled={processing}>Submit Maintenance Job</NormalButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
