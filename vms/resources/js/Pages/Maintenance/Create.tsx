import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function MaintenanceCreate() {
    interface Venue {
        id: number;
        name: string;
        capacity: number;
        status: string;
    }
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loadingVenues, setLoadingVenues] = useState<boolean>(true);

    const { data, setData, errors, processing, reset } = useForm({
        venue_id: '',
        description: '',
        scheduled_for_date: '',
        scheduled_for_time: '',
    });

    // Fetch venues on component mount
    useEffect(() => {
        axios
            .get('/api/venues')
            .then((response) => {
                setVenues(response.data);
                setLoadingVenues(false);
            })
            .catch((error) => {
                console.error('Error fetching venues:', error);
                alert('Failed to load venues. Please refresh the page.');
                setLoadingVenues(false);
            });
    }, []);

    // Client-side validation
    

const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!data.venue_id) validationErrors.venue_id = 'Venue is required.';
    if (!data.description) validationErrors.description = 'Description is required.';
    if (!data.scheduled_for_date) validationErrors.scheduled_for_date = 'Scheduled date is required.';
    if (!data.scheduled_for_time) validationErrors.scheduled_for_time = 'Scheduled time is required.';

    setLocalErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
        return;
    }

    const confirmed = window.confirm('Are you sure you want to create this maintenance job?');
    if (!confirmed) return;

    try {
        const response = await axios.post('/maintenance', data);

        if (response.data.success) {
            alert('Maintenance job created successfully!');
            reset();
            setLocalErrors({}); // Clear local errors on success
        } else {
            reset();
            alert(response.data.message || 'Maintenance job created successfully!');
        }
    } catch (error: any) {
        console.error('Error submitting maintenance job:', error.response || error.message);
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
                                    {loadingVenues ? (
                                        <CircularProgress /> // Loading indicator while fetching venues
                                    ) : (
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
                                    )}
                                    <InputError message={localErrors.venue_id} />
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
                                    <InputError message={localErrors.description} />
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
                                    <InputError message={localErrors.scheduled_for_date} />
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
                                    <InputError message={localErrors.scheduled_for_time} />
                                </div>

                                {/* Submit */}
                                <div>
                                    <NormalButton disabled={processing || loadingVenues}>
                                        {processing ? 'Submitting...' : 'Submit Maintenance Job'}
                                    </NormalButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
