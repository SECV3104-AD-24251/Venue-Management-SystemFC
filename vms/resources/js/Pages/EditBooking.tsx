import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Booking {
    id: number;
    name: string;
    email: string;
    capacity: number;
    venue: { id: number; name: string };
    date: string;
    start_time: string;
    end_time: string;
    comments: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    rejection_reason: string | null;
    user_id: number;
}

interface EditBookingProps {
    booking: Booking;
    venues: { id: number; name: string }[];
}

const EditBooking: React.FC<EditBookingProps> = ({ booking, venues }) => {
    const { props } = usePage();
    const user = props.auth.user;
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

    const isApproved = booking.status === 'approved';
    const isOwnBooking = booking.user_id === user?.id;

    useEffect(() => {
        if (isApproved && isOwnBooking) {
            router.visit(route('viewbooking'));
        }
    }, [isApproved, isOwnBooking]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isApproved) return;
        router.patch(`/bookings/${booking.id}`, formData, {
            onSuccess: () => {
                alert('Booking updated successfully!');
                router.visit(route('viewbooking'));
            },
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
                            {isApproved && isOwnBooking && (
                                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                    This booking has been approved and cannot be modified. You are being redirected to your bookings list.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Venue</label>
                                    <select
                                        name="venue_id"
                                        value={formData.venue_id}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Start Time</label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">End Time</label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Comments</label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                        disabled={isApproved}
                                        className={`mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isApproved ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                {booking.rejection_reason && (
                                    <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                                        <p className="font-semibold">Rejection Reason:</p>
                                        <p>{booking.rejection_reason}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={isApproved}
                                        className={`px-4 py-2 rounded hover:bg-blue-700 ${isApproved ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                    >
                                        Update Booking
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('viewbooking'))}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditBooking;