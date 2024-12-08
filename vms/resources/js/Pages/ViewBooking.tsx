import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

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
    time: string;
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
                                                <th className="border-b px-4 py-2 text-left">Time</th>
                                                <th className="border-b px-4 py-2 text-left">Capacity</th>
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
                                                        <td className="border-b px-4 py-2">{booking.time}</td>
                                                        <td className="border-b px-4 py-2">{booking.capacity}</td>
                                                    </tr>
                                                    {expandedRow === booking.id && (
                                                        <tr>
                                                            <td colSpan={4} className="border-b px-4 py-2">
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
