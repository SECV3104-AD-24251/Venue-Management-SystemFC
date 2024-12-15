import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface Venue {
    id: number;
    name: string;
}

interface Booking {
    id: number;
    name: string;
    email: string;
    capacity: number;
    venue_id: number;
    date: string;
    start_time: string;
    end_time: string;
    comments: string | null;
}

interface EditBookingProps {
    booking: Booking;
    venues: Venue[];
}

const EditBooking: React.FC<EditBookingProps> = ({ booking, venues }) => {
    const [formData, setFormData] = useState({ ...booking });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
        <AuthenticatedLayout header={<h2>Edit Booking</h2>}>
            <Head title="Edit Booking" />
            <div className="py-12">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>Venue</label>
                        <select
                            name="venue_id"
                            value={formData.venue_id}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        >
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleInputChange}
                            className="block w-full border"
                            required
                        />
                    </div>
                    <div>
                        <label>Comments</label>
                        <textarea
                            name="comments"
                            value={formData.comments || ''}
                            onChange={handleInputChange}
                            className="block w-full border"
                        />
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Update Booking
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditBooking;
