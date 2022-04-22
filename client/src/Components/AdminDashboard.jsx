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
  const Plo = (props) => (
    <TableRow>
      <TableCell>{props.plo.name}</TableCell>
      <TableCell>{props.plo.label}</TableCell>
      <TableCell>{props.plo.statement}</TableCell>
      <TableCell>{props.plo.degree}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={() => editPLO(props.plo)}>
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton onClick={() => deletePLO(props.plo)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const Course = (props) => (
    <TableRow>
      <TableCell>{props.course.code}</TableCell>
      <TableCell>{props.course.name}</TableCell>
      <TableCell>{props.course.instructor}</TableCell>
      <TableCell sx={{ whiteSpace: "pre" }}>
        {props.course.clos.join("\n")}
      </TableCell>
    </TableRow>
  );

  const [plos, setPlos] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getPlos() {
      const response = await fetch("http://localhost:4000/api/plo-list/");

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

  function ploList() {
    return plos.map((plo) => {
      return <Plo plo={plo} key={plo._id} />;
    });
  }

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

  function createPLO() {
    window.location.href = "/dashboard/admin/createPlo";
  }

  function editPLO(plo) {
    window.location.href = `/dashboard/admin/editPlo/${plo.name}`;
  }

  async function deletePLO(plo) {
    const response = await fetch(
      `http://localhost:4000/api/delete-plo/${plo.name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      window.location.href = "/dashboard/admin";
    }
  }

  function addCourse() {
    window.location.href = "/dashboard/admin/addCourse";
  }

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ m: "20px" }}>
        Admin Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
            <TableCell>CLOs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{courseList()}</TableBody>
      </Table>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">PLO List</Typography>
        <Button
          startIcon={<AddIcon></AddIcon>}
          color="secondary"
          variant="contained"
          align="right"
          onClick={() => {
            createPLO();
          }}
        >
          Add PLO
        </Button>
      </Box>
      <Table sx={{ border: "1px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Statement</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{ploList()}</TableBody>
      </Table>
    </Container>
  );
}
