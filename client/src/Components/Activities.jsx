import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Typography } from '@mui/material';

// Prints out the admin view 
// Requires that the admin be logged in
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
          <IconButton onClick={() => addMarks(props.activity)}>
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton onClick={() => deleteActivity(props.activity)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const [activities, setActivities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('SE-321');

  useEffect(() => {
    async function getActivities() {
      const response = await fetch(
        `http://localhost:4000/api/course-activity-list/${course}`
      );

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
  }, [course]);

  function activityList() {
    return activities.map((activity) => {
      return <Activity activity={activity} key={activity._id} />;
    });
  }

  function createActivity() {
    window.location.href = `/dashboard/admin/createActivity/${course}`;
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

  useEffect(() => {
    async function getCourses() {
      const response = await fetch('http://localhost:4000/api/course-list');

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const courses = await response.json();
      setCourses(courses);
    }
    getCourses();

    return;
  }, []);

  function courseList() {
    return courses.map((course) => {
      return (
        <MenuItem value={course.code} key={course._id}>
          {course.name}
        </MenuItem>
      );
    });
  }

  function addMarks(activity) {
    window.location.href = `/dashboard/admin/addMarks/${activity._id}`;
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
        <Typography variant="h5">Activities</Typography>

        <Button
          startIcon={<AddIcon></AddIcon>}
          color="secondary"
          variant="contained"
          align="right"
          onClick={() => {
            createActivity();
          }}
        >
          Add Activity
        </Button>
      </Box>

      <FormControl sx={{ width: '40%', my: '20px' }}>
        <InputLabel color="secondary">Course</InputLabel>
        <Select
          label="Course"
          color="secondary"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          {courseList()}
        </Select>
      </FormControl>

      <Card elevation={2}>
        <Table sx={{ border: '1px' }} size="small">
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
      </Card>
    </Container>
  );
}
