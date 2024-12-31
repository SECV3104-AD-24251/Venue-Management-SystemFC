import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';

export default function Booking() {
    // Define Venue type
    interface Venue {
        id: number;
        name: string;
        capacity: number;
        equipment: string[];
    }

    // State for venues and suggestions
    const [venues, setVenues] = useState<Venue[]>([]);
    const [suggestedVenues, setSuggestedVenues] = useState<Venue[]>([]);
    const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

    // State for error popup
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    // Form handling
    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        email: '',
        capacity: '',
        date: '',
        start_time: '',
        end_time: '',
        equipment: [],
        special_requirements: '',
    });

    // Fetch venues on mount
    useEffect(() => {
        axios.get('/api/venues') // Replace with your actual API endpoint
            .then((response) => {
                setVenues(response.data);
                setFilteredVenues(response.data);
            })
            .catch((error) => console.error('Error fetching venues:', error));
    }, []);

    // Filter venues based on capacity input
    const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredCapacity = e.target.value;
        setData('capacity', enteredCapacity);

        if (enteredCapacity === '') {
            setFilteredVenues(venues); // Reset to all venues if input is cleared
        } else {
            const filtered = venues.filter((venue) => venue.capacity >= Number(enteredCapacity));
            setFilteredVenues(filtered);
        }
    };

    // Handle venue suggestion based on lecture needs
    const handleGetSuggestions = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            console.log({
                capacity: data.capacity,
                date: data.date,
                start_time: data.start_time,
                end_time: data.end_time,
                equipment: data.equipment.join(','),
                special_requirements: data.special_requirements,
            });            
            const response = await axios.post('/api/classroom-suggestions', {
                capacity: data.capacity,
                date: data.date,
                start_time: data.start_time,
                end_time: data.end_time,
                equipment: data.equipment.join(','),
                special_requirements: data.special_requirements,
            });
            setSuggestedVenues(response.data); // Update with suggestions
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setPopupMessage('An error occurred while fetching suggestions. Please try again.');
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Automatic Classroom Suggestions
                </h2>
            }
        >
            <Head title="Lecture Need Form" />

            {/* Error Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-red-600 text-lg font-semibold">{popupMessage}</h3>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleGetSuggestions} className="space-y-6">
                                {/* Lecture Details */}
                                <div>
                                    <InputLabel htmlFor="capacity" value="Class Size" />
                                    <TextInput
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={handleCapacityChange}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.capacity} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="date" value="Lecture Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.date} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Time" />
                                    <TextInput
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.start_time} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_time" value="End Time" />
                                    <TextInput
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.end_time} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="equipment" value="Required Equipment" />
                                    <select
                                        multiple
                                        value={data.equipment}
                                        onChange={(e) =>
                                            setData(
                                                'equipment',
                                                Array.from(e.target.selectedOptions).map((option: HTMLOptionElement) => option.value)

                                            )
                                        }
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="projector">Projector</option>
                                        <option value="soundSystem">Sound System</option>
                                        <option value="whiteboard">Whiteboard</option>
                                    </select>
                                    <InputError message={errors.equipment} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="special_requirements" value="Special Requirements" />
                                    <textarea
                                        id="special_requirements"
                                        value={data.special_requirements}
                                        onChange={(e) => setData('special_requirements', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                <NormalButton disabled={processing}>
                                    Get Suggestions
                                </NormalButton>
                            </form>

                            {/* Display Suggested Venues */}
                            {suggestedVenues.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold">Suggested Venues:</h3>
                                    {suggestedVenues.map((venue) => (
                                        <div key={venue.id} className="p-4 border rounded-md mt-2">
                                            <h4>{venue.name}</h4>
                                            <p>Capacity: {venue.capacity}</p>
                                            <p>Equipment: {venue.equipment.join(', ')}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
