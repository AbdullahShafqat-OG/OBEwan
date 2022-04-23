import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, TextField, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

function App() {
  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  async function createClo(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/create-clo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        statement,
        course,
      }),
    });

    if (response.ok) {
      window.location.href = "/clos";
    }
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
      setCourses(courses);
    }
    getCourses();

    return;
  }, []);

  function optionsList() {
    return courses.map((course) => {
      return (
        <MenuItem value={course.code} key={course._id}>
          {course.name}
        </MenuItem>
      );
    });
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Add CLO
      </Typography>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          color="secondary"
        />
        <TextField
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          variant="outlined"
          label="Statement"
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
            {optionsList()}
          </Select>
        </FormControl>

        <Button onClick={createClo} variant="contained" color="secondary">
          Add
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
