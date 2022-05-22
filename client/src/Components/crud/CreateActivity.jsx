import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

function App() {
  const [name, setName] = useState('');
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('SE-321');
  const [clo, setClo] = useState('');
  const [clos, setClos] = useState([]);
  const [weightage, setWeightage] = useState('');
  const [maxMarks, setMaxMarks] = useState('');

  async function createActivity(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/api/create-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        course,
        clo,
        weightage,
        maxMarks,
      }),
    });

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

  useEffect(() => {
    async function getClos() {
      const response = await fetch(
        `http://localhost:4000/api/clo-list-course/${course}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const clos = await response.json();
      setClos(clos);
    }
    getClos();

    return;
  }, [course]);

  function courseList() {
    return courses.map((course) => {
      return (
        <MenuItem value={course.code} key={course._id}>
          {course.name}
        </MenuItem>
      );
    });
  }

  function cloList() {
    return clos.map((clo) => {
      return (
        <MenuItem value={clo.name} key={clo._id}>
          {clo.name}
        </MenuItem>
      );
    });
  }

  function changeWeightage(weightage) {
    if (weightage <= 100 && weightage >= 0) {
      setWeightage(weightage);
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Add Activity
      </Typography>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          color="secondary"
        />
        <TextField
          value={weightage}
          onChange={(e) => changeWeightage(e.target.value)}
          variant="outlined"
          label="Weightage"
          color="secondary"
        />
        <TextField
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
          variant="outlined"
          label="Max Marks"
          color="secondary"
        />
        <FormControl fullWidth>
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

        <FormControl fullWidth>
          <InputLabel color="secondary">CLO</InputLabel>
          <Select
            label="CLO"
            color="secondary"
            value={clo}
            onChange={(e) => setClo(e.target.value)}
          >
            {cloList()}
          </Select>
        </FormControl>

        <Button onClick={createActivity} variant="contained" color="secondary">
          Add
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
