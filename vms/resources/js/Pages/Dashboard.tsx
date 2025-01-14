import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

// Main Dashboard Component
const Dashboard = () => {
  // State to hold notifications
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);

  // State to hold total number of rooms
  const [totalRooms, setTotalRooms] = useState<number | null>(null);
  // State to hold total number of bookings
  const [totalBookings, setTotalBookings] = useState<number | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch notifications from the backend
    axios
      .get('/api/notifications')
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });

    // Fetch total rooms count
    axios
      .get('/api/rooms/count')
      .then((response) => {
        setTotalRooms(response.data.totalRooms); // Update state with total rooms count
      })
      .catch((error) => {
        console.error('Error fetching room count:', error);
      });

    // Fetch total bookings count
    axios
      .get('/api/bookings/count')
      .then((response) => {
        setTotalBookings(response.data.totalBookings); // Update state with total bookings count
      })
      .catch((error) => {
        console.error('Error fetching bookings count:', error);
      });
  }, []);

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
    >
      {/* Set the page title */}
      <Head title="Dashboard" />

      {/* Notification Section */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <ul className="list-disc list-inside">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="mb-2">
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <p>No new notifications.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Statistics Section */}
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
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
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>Total Rooms</Typography>
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
          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>Total Bookings</Typography>
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
              {/* Welcome message for the authenticated user */}
              Welcome Back, {usePage().props.auth.user.name}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
