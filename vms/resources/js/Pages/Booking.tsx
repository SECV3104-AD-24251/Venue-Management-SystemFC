import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';

export default function Booking() {
    // Define Venue type
    interface Venue {
        id: number;
        name: string;
        capacity: number;
    }

    // State for venues and filtering
    const [venues, setVenues] = useState<Venue[]>([]); // All venues
    const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]); // Filtered venues

    // Form handling
    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        email: '',
        capacity: '',
        venue_id: '',
        date: '',
        time: '',
        comments: '',
    });

    // Fetch venues on mount
    useEffect(() => {
        axios.get('/api/venues') // Replace with your actual API endpoint
            .then(response => {
                setVenues(response.data);
                setFilteredVenues(response.data); // Initially display all venues
            })
            .catch(error => console.error('Error fetching venues:', error));
    }, []);

    // Filter venues based on capacity input
    const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredCapacity = e.target.value;
        setData('capacity', enteredCapacity);

        if (enteredCapacity === '') {
            setFilteredVenues(venues); // Reset to all venues if input is cleared
        } else {
            const filtered = venues.filter(venue => venue.capacity >= Number(enteredCapacity));
            setFilteredVenues(filtered);
        }
    };

    // Handle form submission
    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('bookings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Booking submitted successfully!'); // Show success alert box
                reset(); // Reset the form
            },
            onError: (errors) => {
                console.error('Error submitting form:', errors); // Log errors if needed
            },
            //onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book a Venue
                </h2>
            }
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleBookingSubmit} className="space-y-6">
                                {/* Full Name */}
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

                                {/* Email */}
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

                                {/* Capacity */}
                                <div>
                                    <InputLabel htmlFor="capacity" value="Capacity" />
                                    <TextInput
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={handleCapacityChange}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter capacity"
                                    />
                                    <InputError message={errors.capacity} />
                                </div>

                                {/* Venue Dropdown */}
                                <div>
                                    <InputLabel htmlFor="venue_id" value="Select Venue" />
                                    <select
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(e) => setData('venue_id', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Choose a Venue --</option>
                                        {filteredVenues.length > 0 ? (
                                            filteredVenues.map((venue) => (
                                                <option key={venue.id} value={venue.id}>
                                                    {venue.name} (Capacity: {venue.capacity})
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No suitable venues found</option>
                                        )}
                                    </select>
                                    <InputError message={errors.venue_id} />
                                </div>

                                {/* Booking Date */}
                                <div>
                                    <InputLabel htmlFor="date" value="Booking Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.date} />
                                </div>

                                {/* Booking Time */}
                                <div>
                                    <InputLabel htmlFor="time" value="Booking Time" />
                                    <TextInput
                                        id="time"
                                        type="time"
                                        value={data.time}
                                        onChange={(e) => setData('time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.time} />
                                </div>

                                {/* Comments */}
                                <div>
                                    <InputLabel htmlFor="comments" value="Additional Comments" />
                                    <textarea
                                        id="comments"
                                        value={data.comments}
                                        onChange={(e) => setData('comments', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <NormalButton disabled={processing}>
                                        Submit Booking
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
