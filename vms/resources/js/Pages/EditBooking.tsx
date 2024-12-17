import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface EditBookingProps {
    booking: {
        id: number;
        name: string;
        email: string;
        capacity: number;
        venue: { id: number, name: string };
        date: string;
        start_time: string;
        end_time: string;
        comments: string | null;
    };
    venues: { id: number, name: string }[]; // List of available venues
}

const EditBooking: React.FC<EditBookingProps> = ({ booking, venues }) => {
    const [formData, setFormData] = useState({
        name: booking.name,
        email: booking.email,
        capacity: booking.capacity,
        venue_id: booking.venue.id,
        date: booking.date,
        start_time: booking.start_time,
        end_time: booking.end_time,
        comments: booking.comments || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.patch(`/bookings/${booking.id}`, formData, {
            onSuccess: () => alert('Booking updated successfully!'),
            onError: (errors) => alert('Error updating booking'),
        });
    };
    

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Booking</h2>}>
            <Head title="Edit Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Venue</label>
                                    <select
                                        name="venue_id"
                                        value={formData.venue_id}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Start Time</label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">End Time</label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Comments</label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Update Booking
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditBooking;
