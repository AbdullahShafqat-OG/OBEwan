import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#489BFC",
    },
    text: { primary: "#000000", secondary: "#489BFC" },
  },
  typography: {
    fontFamily: ['"DM Sans"', "sans-serif"].join(","),
    button: {
      fontWeight: "700",
      fontSize: "16px",
      textTransform: "none",
    },
    h4: {
      fontWeight: "700",
      fontSize: "32px",
    },
    h5: {
      fontWeight: "700",
      fontSize: "24px",
    },
    h6: {
      fontWeight: "700",
      fontSize: "20px",
    },
    subtitle: {
      fontFamily: "DM Sans",
      fontWeight: "500",
    },
  },
});

const Plo = (props) => (
  <TableRow>
    <TableCell>{props.plo.name}</TableCell>
    <TableCell>{props.plo.label}</TableCell>
    <TableCell>{props.plo.statement}</TableCell>
    <TableCell>{props.plo.degree}</TableCell>
    <TableCell>
      <Stack direction="row" spacing={0}>
        <IconButton>
          <EditIcon></EditIcon>
        </IconButton>
        <IconButton>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Stack>
    </TableCell>
  </TableRow>
);

const Course = (props) => (
  <TableRow>
    <TableCell>{props.course.name}</TableCell>
    <TableCell>{props.course.instructors}</TableCell>
    <TableCell>button or cascading view for instructors</TableCell>
  </TableRow>
);

export default function PloList() {
  const [plos, setPlos] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getPlos() {
      const response = await fetch("http://localhost:3000/api/plos/");

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
  }, [plos.length]);

  function ploList() {
    return plos.map((plo) => {
      return <Plo plo={plo} key={plo._id} />;
    });
  }

  useEffect(() => {
    async function getCourses() {
      const response = await fetch("http://localhost:3000/api/courses/");

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
  }, [courses.length]);

  function courseList() {
    return courses.map((course) => {
      return <Course course={course} key={course._id} />;
    });
  }

  function testFunction() {
    window.location.href = "/dashboard/admin/createPlo";
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" align="center" sx={{ m: "20px" }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h5">Courses</Typography>
        <Table sx={{ border: "1px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Instructors</TableCell>
              <TableCell>Mapping</TableCell>
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
            variant="contained"
            align="right"
            onClick={() => {
              testFunction();
            }}
          >
            Create PLO
          </Button>
        </Box>
        <Table sx={{ border: "1px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Statement</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ploList()}</TableBody>
        </Table>
      </Container>
    </ThemeProvider>
  );
}
