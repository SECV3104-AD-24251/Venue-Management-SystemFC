import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import {Box, Typography} from '@mui/material'

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

export default function Dashboard(
    {
        header,
        children,
    }: PropsWithChildren<{ header?: ReactNode }>
) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    
    const [venues, setVenues] = useState<Venue[]>([]);

    // Fetch venues data from API on component mount
    useEffect(() => {
        axios.get('/api/venues')  // Ensure this endpoint is correct
            .then(response => {
                setVenues(response.data);  // Set the venues data to state
            })
            .catch(error => {
                console.error('Error fetching venues:', error);
            });
    }, []); 

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
        <Box
            sx={{
            mt: 4,
            ml: 10,
            display: 'flex', // Enables Flexbox
            gap: '40px', // Space between boxes
            flexWrap: 'wrap', // Allows wrapping to the next row
            justifyContent: 'flex-start', // Align boxes to the left
        }}
        >
    {/* Box 1 */}
            <Box
                sx={{
                width: '270px',
                height: '120px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px', 
                gap: '10px',
                }}
            >
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                Total Rooms
            </Typography>
    
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                801
            </Typography>
            </Box>

    {/* Box 2 */}
            <Box
                sx={{
                width: '270px',
                height: '120px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                gap: '10px',
            }}
            >
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                Total Bookings
            </Typography>
    
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                75
            </Typography>
            </Box>

    {/* Box 3 */}
            <Box
                sx={{
                width: '270px',
                height: '120px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                gap: '10px',
                }}
            >
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                Total Active Users
            </Typography>
    
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                20
            </Typography>
            </Box>

    {/* Box 4 */}
            <Box
                sx={{
                width: '270px',
                height: '120px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                gap: '10px',
            }}
            >
            <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                Total Registered Users
            </Typography>
    
          <Typography sx={{ fontSize: '20px', textAlign:'center'}}>
                190
            </Typography>
            </Box>
        </Box>

            <Head title = "Dashboard"/>
            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome Back, {user.name}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
