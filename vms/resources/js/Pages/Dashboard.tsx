import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

// Main Dashboard Component
const Dashboard = () => {
 
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);
  const [venues, setVenues] = useState<{ name: string }[]>([]);
 
  const [totalRooms, setTotalRooms] = useState<number | null>(null);
  
  const [totalBookings, setTotalBookings] = useState<number | null>(null);
  const [availableVenues, setAvailableVenues] = useState<number | null>(null);
  const { props } = usePage();
  const user = props.auth.user;
  

  useEffect(() => {
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
        setTotalRooms(response.data.totalRooms); 
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

    // Fetch notifications
    axios.get('/api/notifications') // Ensure this endpoint returns a list of notifications
      .then(response => {
        setNotifications(response.data.notifications); // Set notifications to state
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });

      axios.get('/api/venues/available')
      axios.get('/api/venues/available')
      .then(response => {
          if (response.data && response.data.availableVenues !== undefined) {
              setAvailableVenues(response.data.availableVenues);
          } else {
              console.error('Unexpected API Response:', response.data);
              setAvailableVenues(0); // Default to 0 if data is missing
          }
      })
      .catch(error => {
          console.error('Error fetching available venues:', error);
          setAvailableVenues(0); // Default to 0 if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  useEffect(() => {
    axios
        .get('/api/venues')
        .then((response) => {
            console.log('API Response:', response.data); // Debugging
            setVenues(response.data);
        })
        .catch((error) => {
            console.error('Error fetching venues:', error);
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
  <div
    className="mx-auto max-w-7xl sm:px-6 lg:px-8"
    style={{
      display: 'flex', // Enable Flexbox
      gap: '20px', // Add space between the containers
      justifyContent: 'space-between', // Adjust alignment (optional)
    }}
  >
    {/* Latest Activity Container */}
    <div
      className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg"
      style={{
        width: '50%', // Take half of the available width
      }}
    >
      <div className="p-6 text-gray-900">
        <h3 className="text-lg font-semibold mb-4">Latest Activity </h3>
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

    {/* Additional Container */}
    <div
      className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
      style={{
        width: '50%', // Take half of the available width
      }}
    >
      <div className="p-6 text-gray-900">
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
        
        <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
          {
          data: [5, 10, 7, 15, 9, 4], // Bookings on respective days
          },
  ]}
  width={500}
  height={300}
/>

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
            Most Booked Venue
          </Typography>

          <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
            {venues.length > 0 ? venues[0].name : 'Loading...'}
          </Typography>
        </Box>
        
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
            Available Venues
          </Typography>

          <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
          {availableVenues !== null ? availableVenues : 'Loading...'}
          </Typography>
        </Box>
      </Box>

      {/* Welcome Back Section */}
      <div className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              Welcome Back, {user.name} !
              

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};


export default Dashboard;
