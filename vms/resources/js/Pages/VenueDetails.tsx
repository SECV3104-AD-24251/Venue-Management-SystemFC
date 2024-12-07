import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import axios from 'axios';
import NormalButton from '@/Components/NormalButton';


export default function VenueDetails({ venue }: { venue: { name: string; location: string; capacity: number; image: string; info1: string; info2: string; info3:string; info4: string} }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Venue Details</h2>}
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                {/* Image Section */}
                                <img
                                    src={venue.image}
                                    alt={`Image of ${venue.name}`}
                                    className="rounded-lg w-full md:w-1/2 lg:max-w-md"
                                />

                                {/* Description Section */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4">{venue.name}</h3>
                                    <p className="mb-2"><strong>Location:</strong> {venue.location}</p>
                                    <p className="mb-4"><strong>Capacity:</strong> {venue.capacity}</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                                            <li>{venue.info1}</li>
                                            <li>{venue.info2}</li>
                                            <li>{venue.info3}</li>
                                            <li>{venue.info4}</li>

                                        </ul>
                                    </p>
                                </div>
                                <Link href='/booking'><NormalButton className="px-6 py-3 text-3xl font-semibold w-full md:w-auto">BOOK NOW</NormalButton></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

