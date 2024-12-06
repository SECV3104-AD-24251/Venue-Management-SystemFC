import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import DangerButton from '@/Components/DangerButton';

export default function Booking() {
    return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Book a Venue
            </h2>
        }
    >
        <Head title="Booking"/>

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        Booking Page 
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}