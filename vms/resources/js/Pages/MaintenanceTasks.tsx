import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Modal, Box, Typography, Card, CardContent, Divider } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NormalButton from '@/Components/NormalButton';

interface MaintenanceTask {
  id: number;
  venue_id: number;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  status: string;
  description?: string;
}

const MaintenanceTasks: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [newTask, setNewTask] = useState<MaintenanceTask>({
    id: 0,
    venue_id: 0,
    scheduled_date: '',
    start_time: '',
    end_time: '',
    status: 'pending',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from API
  useEffect(() => {
    axios
      .get('/api/maintenance-tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Handle input changes for new task
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    axios
      .post('/api/maintenance-tasks', newTask)
      .then((response) => {
        setTasks([...tasks, response.data.task]);
        setIsModalOpen(false);
        setNewTask({
          id: 0,
          venue_id: 0,
          scheduled_date: '',
          start_time: '',
          end_time: '',
          status: 'pending',
          description: '',
        });
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Maintenance Tasks
        </h2>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <Box sx={{ padding: '1rem' }}>
                <Typography variant="h4" gutterBottom>
                  Maintenance Tasks
                </Typography>
                <NormalButton
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Maintenance Task
                </NormalButton>

                <Modal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  aria-labelledby="create-task-modal"
                  aria-describedby="create-new-maintenance-task"
                >
                  <Box
                    sx={{
                      padding: '2rem',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      width: '400px',
                      margin: '100px auto',
                      boxShadow: 24,
                    }}
                  >
                    <Typography variant="h6" id="create-task-modal" gutterBottom>
                      Create New Maintenance Task
                    </Typography>
                    <TextField
                      label="Scheduled Date"
                      type="date"
                      name="scheduled_date"
                      value={newTask.scheduled_date}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Start Time"
                      type="time"
                      name="start_time"
                      value={newTask.start_time}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="End Time"
                      type="time"
                      name="end_time"
                      value={newTask.end_time}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={newTask.description}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                    />
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      fullWidth
                      sx={{ marginTop: '1rem' }}
                    >
                      Save
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default MaintenanceTasks;
