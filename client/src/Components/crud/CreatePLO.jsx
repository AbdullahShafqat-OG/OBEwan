import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, TextField, Typography } from "@mui/material";

function App() {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [statement, setStatement] = useState("");
  const [degree, setDegree] = useState("");

  async function createPlo(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/create-plo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        label,
        statement,
        degree,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      window.location.href = "/plos";
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Add PLO
      </Typography>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          color="secondary"
        />
        <TextField
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          variant="outlined"
          label="Label"
          color="secondary"
        />
        <TextField
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          variant="outlined"
          label="Statement"
          color="secondary"
        />
        <TextField
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          variant="outlined"
          label="Degree"
          color="secondary"
        />

        <Button onClick={createPlo} variant="contained" color="secondary">
          Add
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
