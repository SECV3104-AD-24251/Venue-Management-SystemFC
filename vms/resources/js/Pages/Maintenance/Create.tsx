// resources/js/Pages/Maintenance/Create.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';

const MaintenanceCreate = ({ venues }: { venues: any[] }) => {
    const { data, setData, errors, post, processing } = useForm({
        venue_id: '',
        description: '',
        scheduled_for: '',  // This will still hold the combined value
        scheduled_date: '',  // New date field
        scheduled_time: '',  // New time field
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Combine the date and time into one field before submitting
        const combinedDateTime = `${data.scheduled_date} ${data.scheduled_time}`;

        post('/maintenance', {
            data: {
                venue_id: data.venue_id,
                description: data.description,
                scheduled_for_date: data.scheduled_date,  
                scheduled_for_time: data.scheduled_time,
            },
            onSuccess: () => alert('Maintenance job created successfully!'),
            onError: (error) => alert('Error creating maintenance job'),

            
        });
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
                                    <InputLabel htmlFor="venue_id" value="Select Venue" />
                                    <select
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(e) => setData('venue_id', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Select Venue --</option>
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
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Scheduled Date */}
                                <div>
                                    <InputLabel htmlFor="scheduled_date" value="Scheduled Date" />
                                    <TextInput
                                        id="scheduled_date"
                                        type="date"
                                        value={data.scheduled_date}
                                        onChange={(e) => setData('scheduled_date', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.scheduled_date} />
                                </div>

                                {/* Scheduled Time */}
                                <div>
                                    <InputLabel htmlFor="scheduled_time" value="Scheduled Time" />
                                    <TextInput
                                        id="scheduled_time"
                                        type="time"
                                        value={data.scheduled_time}
                                        onChange={(e) => setData('scheduled_time', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.scheduled_time} />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <NormalButton disabled={processing}>Submit</NormalButton>
                                </div>
                            </form>

                            <Link href="/maintenance" className="mt-4 inline-block text-sm text-blue-500 hover:text-blue-700">
                                Back to Maintenance Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default MaintenanceCreate;
