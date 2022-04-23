import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function App() {
  const params = useParams();
  const id = params.id;

  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [statement, setStatement] = useState("");
  const [degree, setDegree] = useState("");

  useEffect(() => {
    async function getPlo() {
      const response = await fetch(`http://localhost:4000/api/get-plo/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plo = await response.json();
      console.log(plo);

      setName(plo.name);
      setLabel(plo.label);
      setStatement(plo.statement);
      setDegree(plo.degree);
    }
    getPlo();

    return;
  }, []);

  async function editPlo(event) {
    event.preventDefault();

    const response = await fetch(`http://localhost:4000/api/update-plo/${id}`, {
      method: "PATCH",
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

    if (response.ok) {
      window.location.href = "/plos";
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Edit PLO
      </Typography>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          color="secondary"
          value={name}
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

        <Button onClick={editPlo} variant="contained" color="secondary">
          Save
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
