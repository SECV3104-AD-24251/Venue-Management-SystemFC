import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface Venue {
    name: string;
}

interface Booking {
    id: number;
    name: string;
    email: string;
    capacity: number;
    venue: Venue | null;
    date: string;
    start_time: string;
    end_time: string;
    comments: string | null;
}

interface ViewBookingProps {
    bookings: Booking[];
}

const ViewBooking: React.FC<ViewBookingProps> = ({ bookings }) => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleRowClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // Delete Booking
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            router.delete(`/bookings/${id}`, {
                onSuccess: () => alert('Booking deleted successfully!'),
                onError: (errors) => alert('Error deleting booking'),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View My Booking
                </h2>
            }
        >
            <Head title="ViewBooking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {bookings.length === 0 ? (
                                <div className="text-red-500">No bookings found.</div>
                            ) : (
                                <div>
                                    <h3>Your Bookings:</h3>
                                    <table className="min-w-full table-auto border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border-b px-4 py-2 text-left">Venue</th>
                                                <th className="border-b px-4 py-2 text-left">Date</th>
                                                <th className="border-b px-4 py-2 text-left">Start Time</th>
                                                <th className="border-b px-4 py-2 text-left">End Time</th>
                                                <th className="border-b px-4 py-2 text-left">Capacity</th>
                                                <th className="border-b px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <React.Fragment key={booking.id}>
                                                    <tr
                                                        onClick={() => handleRowClick(booking.id)}
                                                        className="cursor-pointer hover:bg-gray-100"
                                                    >
                                                        <td className="border-b px-4 py-2">{booking.venue?.name || 'No venue'}</td>
                                                        <td className="border-b px-4 py-2">{booking.date}</td>
                                                        <td className="border-b px-4 py-2">{booking.start_time}</td>
                                                        <td className="border-b px-4 py-2">{booking.end_time}</td>
                                                        <td className="border-b px-4 py-2">{booking.capacity}</td>
                                                        <td className="border-b px-4 py-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDelete(booking.id);
                                                                }}
                                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedRow === booking.id && (
                                                        <tr>
                                                            <td colSpan={6} className="border-b px-4 py-2">
                                                                <div>
                                                                    <p><strong>Name:</strong> {booking.name}</p>
                                                                    <p><strong>Email:</strong> {booking.email}</p>
                                                                    <p><strong>Comments:</strong> {booking.comments || 'No comments'}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewBooking;
