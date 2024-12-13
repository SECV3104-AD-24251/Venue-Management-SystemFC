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

    // State for error popup
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    // Form handling
    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        email: '',
        capacity: '',
        venue_id: '',
        date: '',
        start_time: '',
        end_time: '',
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

    // Check for time conflict
    const checkTimeConflict = async () => {
        try {
            const response = await axios.post('/api/bookings/check-time', {
                venue_id: data.venue_id,
                date: data.date,
                start_time: data.start_time,
                end_time: data.end_time,
            });
            return response.data.success; // Return true if no conflict
        } catch (error) {
            console.error('Error checking time conflict:', error);
            return false; // If error, assume conflict
        }
    };

    // Handle form submission
    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for time conflict before submitting
        const conflict = await checkTimeConflict();

        if (!conflict) {
            setPopupMessage('This venue is already booked during the selected time. Please choose a different time.');
            setShowPopup(true);
            return; // Stop form submission if there's a conflict
        }

        post(route('bookings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Booking submitted successfully!'); // Show success alert box
                reset(); // Reset the form
            },
            onError: (errors) => {
                console.error('Error submitting form:', errors); // Log errors if needed

                // Check for specific errors and trigger the popup with the message
                const errorMessage = errors?.error || 'An error occurred. Please try again.';
                setPopupMessage(errorMessage);
                setShowPopup(true);
            },
        });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
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

            {/* Error Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-red-600 text-lg font-semibold">{popupMessage}</h3>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

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

                                {/* Booking Start Time */}
                                <div>
                                    <InputLabel htmlFor="start_time" value="Booking Start Time" />
                                    <TextInput
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.start_time} />
                                </div>

                                {/* Booking End Time */}
                                <div>
                                    <InputLabel htmlFor="end_time" value="Booking End Time" />
                                    <TextInput
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.end_time} />
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
