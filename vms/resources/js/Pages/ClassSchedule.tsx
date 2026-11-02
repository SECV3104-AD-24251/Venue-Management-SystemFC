import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

interface ScheduleProps {
    schedules: any[];
}

interface Venue {
    id: number;
    name: string;
    capacity: number;
}

interface ClassScheduleData {
    class_name: string;
    section: string;
    day: string;
    start_time: string;
    end_time: string;
    venue_id: string;
}

const Schedule = ({ schedules }: ScheduleProps) => {
    const { props } = usePage();
    const user = props.auth.user;

    const [venues, setVenues] = useState<Venue[]>([]);
    const [venuesLoading, setVenuesLoading] = useState(true);
    const [venuesError, setVenuesError] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm<ClassScheduleData>({
        class_name: '',
        section: '',
        day: '',
        start_time: '',
        end_time: '',
        venue_id: '',
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const { data: response } = await axios.get<Venue[]>('/api/venues');
                setVenues(response);
            } catch (error) {
                setVenuesError('Could not load venues. Please refresh the page.');
            } finally {
                setVenuesLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const updateField = (field: keyof ClassScheduleData, value: string) => {
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('lecturer.schedule.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const inputClass =
        'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Class Schedule</h2>}>
            <Head title="Class Schedule" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-xl">Class Schedule</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowForm((previous) => !previous)}
                                    className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    {showForm ? 'Cancel' : 'Add Schedule'}
                                </button>
                            </div>

                            {(!schedules || schedules.length === 0) ? (
                                <p>No schedules available.</p>
                            ) : (
                                <table className="min-w-full mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left">Class Name</th>
                                            <th className="px-4 py-2 text-left">Section</th>
                                            <th className="px-4 py-2 text-left">Lecturer</th>
                                            <th className="px-4 py-2 text-left">Day</th>
                                            <th className="px-4 py-2 text-left">Start Time</th>
                                            <th className="px-4 py-2 text-left">End Time</th>
                                            <th className="px-4 py-2 text-left">Venue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedules.map((schedule) => (
                                            <tr key={schedule.id}>
                                                <td className="px-4 py-2">{schedule.class_name}</td>
                                                <td className="px-4 py-2">{schedule.section}</td>
                                                <td className="px-4 py-2">{schedule.lecturer_name}</td>
                                                <td className="px-4 py-2">{schedule.day}</td>
                                                <td className="px-4 py-2">{schedule.start_time}</td>
                                                <td className="px-4 py-2">{schedule.end_time}</td>
                                                <td className="px-4 py-2">{schedule.venue?.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {showForm && (
                        <div className="mt-6 bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="font-bold text-xl mb-4">Add Class Schedule</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Lecturer</label>
                                    <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 px-3 py-2">
                                        {user?.name}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="class_name" className="block text-sm font-medium text-gray-700">
                                        Class Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="class_name"
                                        id="class_name"
                                        value={data.class_name}
                                        onChange={(e) => updateField('class_name', e.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.class_name && <p className="mt-1 text-sm text-red-600">{errors.class_name}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                                        Class Section (Number)
                                    </label>
                                    <input
                                        type="number"
                                        name="section"
                                        id="section"
                                        value={data.section}
                                        onChange={(e) => updateField('section', e.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="day" className="block text-sm font-medium text-gray-700">
                                        Day
                                    </label>
                                    <select
                                        name="day"
                                        id="day"
                                        value={data.day}
                                        onChange={(e) => updateField('day', e.target.value)}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">-- Select Day --</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                    </select>
                                    {errors.day && <p className="mt-1 text-sm text-red-600">{errors.day}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                                    <div>
                                        <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                                            Start Time
                                        </label>
                                        <input
                                            type="time"
                                            name="start_time"
                                            id="start_time"
                                            value={data.start_time}
                                            onChange={(e) => updateField('start_time', e.target.value)}
                                            className={inputClass}
                                            required
                                        />
                                        {errors.start_time && <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            name="end_time"
                                            id="end_time"
                                            value={data.end_time}
                                            onChange={(e) => updateField('end_time', e.target.value)}
                                            className={inputClass}
                                            required
                                        />
                                        {errors.end_time && <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="venue_id" className="block text-sm font-medium text-gray-700">
                                        Venue
                                    </label>
                                    <select
                                        name="venue_id"
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(e) => updateField('venue_id', e.target.value)}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">-- Select Venue --</option>
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={String(venue.id)}>
                                                {venue.name} (Capacity: {venue.capacity})
                                            </option>
                                        ))}
                                    </select>
                                    {venuesLoading && <p className="mt-1 text-sm text-gray-500">Loading venues...</p>}
                                    {venuesError && <p className="mt-1 text-sm text-red-600">{venuesError}</p>}
                                    {errors.venue_id && <p className="mt-1 text-sm text-red-600">{errors.venue_id}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Adding...' : 'Add Schedule'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Schedule;
