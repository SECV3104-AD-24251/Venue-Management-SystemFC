import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const CreateSchedule = () => {
    const { data, setData, post, processing, errors } = useForm({
        class_name: '',
        section: '',
        lecturer_name: '',
        day: '',
        start_time: '',
        end_time: '',
        venue_id: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        post(route('schedules.store')); // Call the store route
    };
    

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl leading-tight text-gray-800">Create Schedule</h2>}>
            <Head title="Create Schedule" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Class Name</label>
                                    <input
                                        type="text"
                                        value={data.class_name}
                                        onChange={(e) => setData('class_name', e.target.value)}
                                        className="w-1/2 mt-1 rounded-md border-gray-300"
                                    />
                                    {errors.class_name && <p className="text-red-500 text-sm">{errors.class_name}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Section</label>
                                    <input
                                        type="text"
                                        value={data.section}
                                        onChange={(e) => setData('section', e.target.value)}
                                        className="w-1/2 mt-1 rounded-md border-gray-300"
                                    />
                                    {errors.section && <p className="text-red-500 text-sm">{errors.section}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Lecturer Name</label>
                                    <input
                                        type="text"
                                        value={data.lecturer_name}
                                        onChange={(e) => setData('lecturer_name', e.target.value)}
                                        className="w-1/2 mt-1 rounded-md border-gray-300"
                                    />
                                    {errors.lecturer_name && <p className="text-red-500 text-sm">{errors.lecturer_name}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Day</label>
                                <select
                                    value={data.day}
                                    onChange={(e) => setData('day', e.target.value)}
                                    className="w-1/2 mt-1 rounded-md border-gray-300"
                                >
                                    <option value="">Select a day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                </select>
                                    {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
                                </div>


                                <div className="mb-4">
                                    <label className="block text-gray-700">Start Time</label>
                                    <input
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        className="w-1/2 mt-1 rounded-md border-gray-300"
                                    />
                                    {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">End Time</label>
                                    <input
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        className="w-1/2 mt-1 rounded-md border-gray-300"
                                    />
                                    {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    Create Schedule
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateSchedule;
