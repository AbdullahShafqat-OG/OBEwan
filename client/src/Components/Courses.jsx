import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Typography } from "@mui/material";

export default function AdminDashboard() {
  const Course = (props) => (
    <TableRow>
      <TableCell>{props.course.code}</TableCell>
      <TableCell>{props.course.name}</TableCell>
      <TableCell>{props.course.instructor}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={() => deleteCourse(props.course)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const response = await fetch("http://localhost:4000/api/course-list/");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const courses = await response.json();
      console.log(courses);
      setCourses(courses);
    }
    getCourses();

    return;
  }, []);

  function courseList() {
    return courses.map((course) => {
      return <Course course={course} key={course._id} />;
    });
  }

  function addCourse() {
    window.location.href = "/dashboard/admin/addCourse";
  }

  async function deleteCourse(course) {
    const response = await fetch(
      `http://localhost:4000/api/delete-course/${course._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      window.location.href = "/courses";
    }
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "40px",
        }}
      >
        <Typography variant="h5">Courses</Typography>
        <Button
          startIcon={<AddIcon></AddIcon>}
          color="secondary"
          variant="contained"
          align="right"
          onClick={() => {
            addCourse();
          }}
        >
          Add Course
        </Button>
      </Box>
      <Table sx={{ border: "1px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{courseList()}</TableBody>
      </Table>
    </Container>
  );
}
