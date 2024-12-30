import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Lecturer {
    id: number;
    name: string;
}

interface Classroom {
    id: number;
    name: string;
    capacity: number;
}

export default function AddSchedule() {
    const [formData, setFormData] = useState({
        subject: '',
        section: '',
        day: '',
        time: '',
        duration: '',
        capacity: '',
        classroom_id: '',
        lecturer_id: '',
    });
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch lecturers
        axios.get('/api/lecturers').then((response) => {
            setLecturers(response.data);
        });

        // Fetch classrooms
        axios.get('/api/venues').then((response) => {
            setClassrooms(response.data);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post('/api/schedules', formData)
            .then(() => {
                alert('Schedule added successfully!');
                setFormData({
                    subject: '',
                    section: '',
                    day: '',
                    time: '',
                    duration: '',
                    capacity: '',
                    classroom_id: '',
                    lecturer_id: '',
                });
            })
            .catch((error) => {
                setErrors(error.response.data.errors || {});
            });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Schedule" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-semibold mb-4">Add Schedule</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Lecturer */}
                                <div className="mb-4">
                                    <label htmlFor="lecturer_id" className="block text-sm font-medium text-gray-700">
                                        Lecturer
                                    </label>
                                    <select
                                        name="lecturer_id"
                                        id="lecturer_id"
                                        value={formData.lecturer_id}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">-- Select Lecturer --</option>
                                        {lecturers.map((lecturer) => (
                                            <option key={lecturer.id} value={lecturer.id}>
                                                {lecturer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject */}
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                        Class Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Section */}
                                <div className="mb-4">
                                    <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                                        Class Section (Number)
                                    </label>
                                    <input
                                        type="number"
                                        name="section"
                                        id="section"
                                        value={formData.section}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Day */}
                                <div className="mb-4">
                                    <label htmlFor="day" className="block text-sm font-medium text-gray-700">
                                        Day
                                    </label>
                                    <select
                                        name="day"
                                        id="day"
                                        value={formData.day}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">-- Select Day --</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>
                                </div>

                                {/* Start Time */}
                                <div className="mb-4">
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Duration */}
                                <div className="mb-4">
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                        Duration (Minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="duration"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="mb-4">
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        id="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Classroom */}
                                <div className="mb-4">
                                    <label htmlFor="classroom_id" className="block text-sm font-medium text-gray-700">
                                        Classroom
                                    </label>
                                    <select
                                        name="classroom_id"
                                        id="classroom_id"
                                        value={formData.classroom_id}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">-- Select Classroom --</option>
                                        {classrooms.map((classroom) => (
                                            <option key={classroom.id} value={classroom.id}>
                                                {classroom.name} (Capacity: {classroom.capacity})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Add Schedule
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
