import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Typography } from '@mui/material';

export default function AdminDashboard() {
  const Activity = (props) => (
    <TableRow>
      <TableCell>{props.activity.name}</TableCell>
      <TableCell>{props.activity.maxMarks}</TableCell>
      <TableCell>{props.activity.course}</TableCell>
      <TableCell>{props.activity.clo}</TableCell>
      <TableCell>{props.activity.weightage}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={0} sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={() => deleteActivity(props.activity)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getActivities() {
      const response = await fetch('http://localhost:4000/api/activity-list/');

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const activities = await response.json();
      setActivities(activities);
    }
    getActivities();

    return;
  }, []);

  function activityList() {
    return activities.map((activity) => {
      return <Activity activity={activity} key={activity._id} />;
    });
  }

  function createActivity() {
    window.location.href = '/dashboard/admin/createActivity';
  }

  async function deleteActivity(activity) {
    const response = await fetch(
      `http://localhost:4000/api/delete-activity/${activity._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      window.location.href = '/activities';
    }
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '40px',
        }}
      >
        <Typography variant="h5">CLOs</Typography>
        <Button
          startIcon={<AddIcon></AddIcon>}
          color="secondary"
          variant="contained"
          align="right"
          onClick={() => {
            createActivity();
          }}
        >
          Add CLO
        </Button>
      </Box>
      <Table sx={{ border: '1px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Max Marks</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>CLO</TableCell>
            <TableCell>Weightage</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{activityList()}</TableBody>
      </Table>
    </Container>
  );
}
