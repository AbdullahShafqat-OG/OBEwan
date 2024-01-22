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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

// Only the Admin is allowed to edit the CLOs table
// Requirements: IF the admin is logged in, then display table and allow for edits
// to be made. If not, then only display the table without allowing for edits
export default function AdminDashboard() {
  const [clos, setClos] = useState([]);
  const [course, setCourse] = useState('SE-321');
  const [courses, setCourses] = useState([]);

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

  const Clo = (props) => (
    <TableRow>
      <TableCell sx={{ width: '50px' }}>{props.clo.name}</TableCell>
      <TableCell>{props.clo.statement}</TableCell>
      <TableCell>{props.clo.course}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={0} sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={() => deleteCLO(props.clo)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  function cloList() {
    return clos.map((clo) => {
      return <Clo clo={clo} key={clo._id} />;
    });
  }

  function createCLO() {
    window.location.href = '/dashboard/admin/createClo';
  }

  async function deleteCLO(clo) {
    const response = await fetch(
      `http://localhost:4000/api/delete-clo/${clo._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      window.location.href = '/clos';
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
            createCLO();
          }}
        >
          Add CLO
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

      <Card elevation={2} sx={{ my: 2 }}>
        <Table sx={{ border: '1px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Statement</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{cloList()}</TableBody>
        </Table>
      </Card>
    </Container>
  );
}
