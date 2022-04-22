import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, TextField, Typography } from "@mui/material";

function App() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [closCount, setClosCount] = useState(0);
  // const [mapping, setMapping] = useState([]);

  async function addCourse(event) {
    event.preventDefault();

    let clos = [];

    for (let i = 0; i < closCount; i++) {
      clos.push(`CLO${i + 1}`);
    }

    const response = await fetch("http://localhost:4000/api/create-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        name,
        instructor,
        clos,
      }),
    });

    if (response.ok) {
      window.location.href = "/dashboard/admin";
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Add Course
      </Typography>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setCode(e.target.value)}
          variant="outlined"
          label="Code"
          color="secondary"
        />
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          color="secondary"
        />
        <TextField
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          variant="outlined"
          label="Instructor"
          color="secondary"
        />
        <TextField
          onChange={(e) => setClosCount(parseInt(e.target.value))}
          variant="outlined"
          type="number"
          label="CLOs"
          color="secondary"
        />
        <Button onClick={addCourse} variant="contained" color="secondary">
          Add
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
