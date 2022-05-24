import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function App() {
  const [course, setCourse] = useState('SE-321');
  const [courses, setCourses] = useState([]);

  const [plo, setPlo] = useState('PLO-1');
  const [plos, setPlos] = useState([]);

  const [cloList, setCloList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`http://localhost:4000/api/course-list`);

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
    async function getPlos() {
      const response = await fetch(`http://localhost:4000/api/plo-list`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plos = await response.json();
      setPlos(plos);
    }
    getPlos();

    return;
  }, []);

  useEffect(() => {
    async function getCloList() {
      const response = await fetch(
        'http://localhost:4000/api/course-clo-list/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            course,
            plo,
          }),
        }
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const cloList = await response.json();
      setCloList(cloList);
    }
    getCloList();

    return;
  }, [plo, course]);

  function addOrUpdate(oldArr, newObj) {
    let index = oldArr.findIndex((obj) => obj.regNo === newObj.regNo);

    if (index === -1) {
      oldArr.push(newObj);
    } else {
      oldArr[index].cloScore += newObj.cloScore;
    }
    return oldArr;
  }

  function calcPloScores(e) {
    e.preventDefault();

    cloList.forEach(async (clo) => {
      const response = await fetch(
        `http://localhost:4000/api/clo-activity-list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            course,
            clo,
          }),
        }
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const activities = await response.json();
      setActivities(activities);

      let scores = [];

      activities.forEach(async (activity) => {
        const response = await fetch(
          `http://localhost:4000/api/get-student-activity/${activity._id}`
        );

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const students = await response.json();
        setStudents(students);

        students.forEach((student) => {
          let marks = student.marksArr.find(
            (marks) => marks.activityId === activity._id
          );

          // some code that add new obj or update existing one if it exists
          addOrUpdate(scores, {
            regNo: student.regNo,
            name: student.name,
            cloScore: marks.cloScore,
          });

          console.log(scores);
          setScores(scores);
        });
      });
    });
  }

  function courseList() {
    return courses.map((course) => {
      return (
        <MenuItem value={course.code} key={course._id}>
          {course.name}
        </MenuItem>
      );
    });
  }

  function ploList() {
    return plos.map((plo) => {
      return (
        <MenuItem value={plo.name} key={plo._id}>
          {plo.name}
        </MenuItem>
      );
    });
  }

  const Student = (props) => (
    <TableRow>
      <TableCell>{props.student.name}</TableCell>
      <TableCell>{props.student.regNo}</TableCell>
      <TableCell>{props.student.cloScore}</TableCell>
    </TableRow>
  );

  function studentList() {
    console.log(scores);
    return scores.map((score) => {
      return <Student student={score} key={score.regNo} />;
    });
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        {course.name}
      </Typography>
      <Typography variant="h5" sx={{ my: 3 }}>
        Calculate PLO Scores
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel color="secondary">Select a Course</InputLabel>
          <Select
            label="Select a Course"
            color="secondary"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courseList()}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel color="secondary">Select a PLO</InputLabel>
          <Select
            label="Select a PLO"
            color="secondary"
            value={plo}
            onChange={(e) => setPlo(e.target.value)}
          >
            {ploList()}
          </Select>
        </FormControl>

        <Button onClick={calcPloScores} variant="contained" color="secondary">
          Calculate
        </Button>

        <Card elevation={2}>
          <Table sx={{ border: '1px', backgroundColor: 'white' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Reg No</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{studentList()}</TableBody>
          </Table>
        </Card>
      </Stack>
    </Container>
  );
}

export default App;
