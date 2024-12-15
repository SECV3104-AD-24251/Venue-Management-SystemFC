import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Venue {
  id: number;
  name: string;
  location: string;
  capacity: number;
}

export default function Dashboard({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const [venues, setVenues] = useState<Venue[]>([]);

  // State for total rooms and bookings
  const [totalRooms, setTotalRooms] = useState<number | null>(null);
  const [totalBookings, setTotalBookings] = useState<number | null>(null);

  // State for notifications
  const [notifications, setNotifications] = useState<string[]>([]);

  // Fetch total room count, bookings count, venues data, and notifications
  useEffect(() => {
    // Fetch venues data
    axios.get('/api/venues')
      .then(response => {
        setVenues(response.data); // Set the venues data to state
      })
      .catch(error => {
        console.error('Error fetching venues:', error);
      });

    // Fetch total rooms count
    axios.get('/api/rooms/count') // Ensure this endpoint returns the total room count
      .then(response => {
        setTotalRooms(response.data.totalRooms); // Set total rooms to state
      })
      .catch(error => {
        console.error('Error fetching room count:', error);
      });

    // Fetch total bookings count
    axios.get('/api/bookings/count')
      .then(response => {
        setTotalBookings(response.data.totalBookings); // Set total bookings to state
      })
      .catch(error => {
        console.error('Error fetching bookings count:', error);
      });

    // Fetch notifications
    axios.get('/api/notifications') // Ensure this endpoint returns a list of notifications
      .then(response => {
        setNotifications(response.data.notifications); // Set notifications to state
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      {/* Notification Section */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="list-disc list-inside">
                  {notifications.map((notification, index) => (
                    <li key={index} className="mb-2">
                      {notification}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No new notifications.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Statistics */}
      <Box
        sx={{
          mt: 4,
          display: 'flex', // Enables Flexbox
          gap: '40px', // Space between boxes
          flexWrap: 'wrap', // Allows wrapping to the next row
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Box 1 - Total Rooms */}
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
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            Total Rooms
          </Typography>

          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            {totalRooms !== null ? totalRooms : 'Loading...'}
          </Typography>
        </Box>

        {/* Box 2 - Total Bookings */}
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
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            Total Bookings
          </Typography>

          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
            {totalBookings !== null ? totalBookings : 'Loading...'}
          </Typography>
        </Box>
      </Box>

      {/* Welcome Back Section */}
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
