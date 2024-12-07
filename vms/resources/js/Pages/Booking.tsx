import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import NormalButton from '@/Components/NormalButton';
import TextInput from '@/Components/TextInput';

export default function Booking() {
    interface Venue {
        id: number;
        name: string;
        capacity: number;
    }
    const [venues, setVenues] = useState<Venue[]>([]);
    const [capacity, setCapacity] = useState('');

    useEffect(() => {
        axios.get('/api/venues') // Replace with the correct backend API route
            .then(response => setVenues(response.data))
            .catch(error => console.error('Error fetching venues:', error));
    }, []);

    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        email: '',
        capacity: '',
        venue_id: '',
        date: '',
        time: '',
        comments: '',
    });

    const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredCapacity = e.target.value;
        setCapacity(enteredCapacity);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('bookings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Booking submitted successfully!');
                reset();
            },
            onError: (errors) => {
                console.error('Error submitting form:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Book a Venue</h2>}
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleBookingSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Full Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email (@graduate.utm.my)" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="capacity" value="Capacity" />
                                    <TextInput
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => {
                                            setData('capacity', e.target.value);
                                            handleCapacityChange(e);
                                        }}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.capacity} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="venue_id" value="Select Venue" />
                                    <select
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(e) => setData('venue_id', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Choose Venue --</option>
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name} (Capacity: {venue.capacity})
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.venue_id} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="date" value="Booking Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="block w-1/2"
                                    />
                                    <InputError message={errors.date} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="time" value="Booking Time" />
                                    <TextInput
                                        id="time"
                                        type="time"
                                        value={data.time}
                                        onChange={(e) => setData('time', e.target.value)}
                                        className="block w-1/2"
                                    />
                                    <InputError message={errors.time} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="comments" value="Additional Comments" />
                                    <textarea
                                        id="comments"
                                        value={data.comments}
                                        onChange={(e) => setData('comments', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <NormalButton disabled={processing}>Submit Booking</NormalButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
