import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import NormalButton from '@/Components/NormalButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Booking() {
    // Venue type definition
    interface Venue {
        id: number;
        name: string;
        capacity: number;
        status: string;
    }

    // State for venues and suggestion
    const [venues, setVenues] = useState<Venue[]>([]);
    const [suggestedVenue, setSuggestedVenue] = useState<Venue | null>(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [conflictErrors, setConflictErrors] = useState({
        
        date: '',
        start_time: '',
        end_time: '',
    });

    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        email: '',
        capacity: '',
        date: '',
        start_time: '',
        end_time: '',
        comments: '',
        venue_id: '', 
    });
    

    // Fetch venues on component mount
    useEffect(() => {
        axios
            .get('/api/venues')
            .then((response) => {
                console.log('Fetched Venues:', response.data); // Debugging
                setVenues(response.data);
            })
            .catch(error => console.error('Error fetching venues:', error));
    }, []);

    // Suggest a venue based on user input
    const suggestVenue = async () => {
        const { capacity, date, start_time, end_time } = data;
    
        // Reset suggestedVenue if required fields are missing
        if (!capacity || !date || !start_time || !end_time) {
            setSuggestedVenue(null);
            return;
        }
    
        // Filter venues based on capacity
        const matchingVenues = venues.filter(
            (venue) => Number(venue.capacity) >= Number(capacity)
        );
    
        console.log('Matching Venues:', matchingVenues); // Debugging
    
        if (matchingVenues.length === 0) {
            setSuggestedVenue(null);
            alert('No venues available for the specified capacity. Please adjust your input.');
            return;
        }
    
        // Randomize or prioritize venue selection
        const randomVenue = matchingVenues[Math.floor(Math.random() * matchingVenues.length)];
    
        // Check availability for the prioritized venue
        const isAvailable = await checkVenueAvailability(
            randomVenue.id,
            date,
            start_time,
            end_time
        );
    
        if (isAvailable) {
            setSuggestedVenue(randomVenue);
        } else {
            setSuggestedVenue(null);
            alert('No available venues for the selected time and date.');
        }
    };
 
    // Check venue availability
    const checkVenueAvailability = async (
        venue_id: number,
        date: string,
        start_time: string,
        end_time: string
    ) => {
        try {
            const response = await axios.post('/api/bookings/check-time', {
                venue_id,
                date,
                start_time,
                end_time,
            });
            console.log('Availability for Venue ${venue.id}', response.data);
            return response.data.success; // true if available, false if not
        } catch (error) {
            console.error('Error checking venue availability:', error);
            return false; // Assume unavailable on error
        }
    };
    

    // Update data and suggest a venue dynamically
    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
    
        if (['capacity', 'date', 'start_time', 'end_time'].includes(field)) {
            suggestVenue(); // Re-suggest venue dynamically
        }
    };
    
    
    // Handle form submission
    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('/bookings', data);
    
            if (response.data.success) {
                alert('Booking submitted successfully!');
                reset(); // Reset form after successful submission
                setIsButtonClicked(false);
                setSuggestedVenue(null);
            } else {
                alert(response.data.message || 'An error occurred during booking.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };
        
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Book a Venue</h2>}
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleBookingSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <InputLabel htmlFor="name" value="Full Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email (@.utm.my)" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                

                                {/* Booking Date */}
                                <div>
                                    <InputLabel htmlFor="date" value="Booking Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.date} />
                                </div>

                                {/* Booking Start Time */}
                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Time" />
                                    <TextInput
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => handleInputChange('start_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    
                                    <InputError message={errors.start_time} />
                                </div>

                                {/* Booking End Time */}
                                <div>
                                    <InputLabel htmlFor="end_time" value="End Time" />
                                    <TextInput
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => handleInputChange('end_time', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.end_time} />
                                </div>
                                {/* Capacity */}
                                <div>
                                    <InputLabel htmlFor="capacity" value="Capacity" />
                                    <TextInput
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                                        className="block w-1/2 border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter capacity"
                                    />
                                    <InputError message={errors.capacity} />
                                </div>

                                {/* Suggested Venue */}
                                {suggestedVenue && (
                                    <div className="block w-1/2 p-4 bg-green-100 border border-green-400 rounded-md">
                                        <p>
                                            Suggested Venue: <strong>{suggestedVenue.name}</strong> (Capacity: {suggestedVenue.capacity})
                                        </p>
                                    
                                        <button
                                            type="button"
                                            className={`mt-2 py-1 px-3 rounded ${
                                            isButtonClicked ? 'bg-green-500' : 'bg-blue-500'
                                        } text-white`}
                                            onClick={() => {
                                            setData('venue_id', suggestedVenue.id.toString());
                                            setIsButtonClicked(true); // Update the state to indicate the button was clicked
                                        }}
                                    >
                                        {isButtonClicked ? 'Venue Selected' : 'Select Suggested Venue'}
                                        </button>
                                    </div>
                                )}

                                {/* Comments */}
                                <div>
                                    <InputLabel htmlFor="comments" value="Comments" />
                                    <textarea
                                        id="comments"
                                        value={data.comments}
                                        onChange={(e) => handleInputChange('comments', e.target.value)}
                                        className="block w-1/2 mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                {/* Submit */}
                                <div>
                                    <NormalButton disabled={processing}>Submit Booking</NormalButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
