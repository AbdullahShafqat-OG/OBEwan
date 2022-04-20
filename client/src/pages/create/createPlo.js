import { useState } from "react";
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
import { Button, IconButton, TextField, Typography } from "@mui/material";

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
      window.location.href = "/dashboard/admin";
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Create PLO
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
          Create
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
