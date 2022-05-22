import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';

function App() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState('');

  const [clo, setClo] = useState('');
  const [clos, setClos] = useState([]);

  const [plo, setPlo] = useState('');
  const [plos, setPlos] = useState([]);

  useEffect(() => {
    async function getCourse() {
      const response = await fetch(
        `http://localhost:4000/api/get-course/${courseId}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const course = await response.json();
      setCourse(course);
    }
    getCourse();

    return;
  }, []);

  useEffect(() => {
    async function getClos() {
      const response = await fetch(
        `http://localhost:4000/api/clo-list-course/${course.code}`
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

  async function createMapping(event) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:4000/api/create-mapping/${courseId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clo,
          plo,
        }),
      }
    );

    if (response.ok) {
      window.location.href = `/mapping/${courseId}`;
    }
  }

  function cloList() {
    return clos.map((clo) => {
      return (
        <MenuItem value={clo.name} key={clo._id}>
          {clo.name}
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        {course.name}
      </Typography>
      <Typography variant="h5" sx={{ my: 3 }}>
        Create Mapping
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel color="secondary">Select a CLO</InputLabel>
          <Select
            label="Select a CLO"
            color="secondary"
            value={clo}
            onChange={(e) => setClo(e.target.value)}
          >
            {cloList()}
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

        <Button onClick={createMapping} variant="contained" color="secondary">
          Map
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
