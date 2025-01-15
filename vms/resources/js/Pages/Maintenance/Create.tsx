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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/maintenance', data);

            if (response.data.success) {
                alert('Maintenance job created successfully!');
                reset(); // Reset form after successful submission
            } else {
                alert(response.data.message || 'Maintenance job created successfully!');
                reset();
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
