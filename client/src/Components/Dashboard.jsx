import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const response = await fetch('http://localhost:4000/api/course-list/');
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
        <Card
          elevation={2}
          sx={{ width: '31%', margin: '12px' }}
          key={course._id}
        >
          <CardContent>
            <Typography color="secondary" variant="h5" gutterBottom>
              {course.name}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.primary"
              variant="subtitle"
            >
              {course.code} <br /> Credits: 4.0
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 2 }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              href="/activities"
            >
              Activities
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              href={'/mapping/' + course._id}
            >
              CLO/PLO Mapping
            </Button>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <Stack direction="row" sx={{ margin: '50px', flexWrap: 'wrap' }}>
      {courseList()}
    </Stack>
  );
}
