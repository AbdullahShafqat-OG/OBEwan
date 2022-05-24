import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import * as XLSX from 'xlsx';

function App() {
  const params = useParams();
  const activityId = params.id;

  const [name, setName] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [course, setCourse] = useState('');
  const [clo, setClo] = useState('');
  const [weightage, setWeightage] = useState('');

  useEffect(() => {
    async function getActivity() {
      const response = await fetch(
        `http://localhost:4000/api/get-activity/${activityId}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const activity = await response.json();

      setName(activity.name);
      setMaxMarks(activity.maxMarks);
      setCourse(activity.course);
      setClo(activity.clo);
      setWeightage(activity.weightage);
    }
    getActivity();
  }, []);

  const onUpload = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;

      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      console.log(data);

      data.forEach(async (student) => {
        console.log(student);
        const regNo = student.regNo;
        const name = student.name;
        const marks = student.marks;

        const response = await fetch(
          'http://localhost:4000/api/create-student-record',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              regNo,
              name,
              marks,
              activityId,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 5 }}>
        {name}
      </Typography>

      <Stack direction="row" sx={{ mt: 2, justifyContent: 'space-between' }}>
        <Typography variant="h6">Course: {course}</Typography>
        <Typography variant="h6">{clo}</Typography>
      </Stack>
      <Stack direction="row" sx={{ mt: 1, justifyContent: 'space-between' }}>
        <Typography variant="h6">Max Marks: {maxMarks}</Typography>
        <Typography variant="h6">CLO Weightage: {weightage}%</Typography>
      </Stack>
      <Typography variant="h5" sx={{ mt: 5 }}>
        Add Marks
      </Typography>
      <Button
        startIcon={<AddIcon></AddIcon>}
        color="secondary"
        variant="contained"
        component="label"
        sx={{ width: '30%', mt: 2 }}
      >
        Upload Marks List
        <input type="file" onChange={onUpload} hidden />
      </Button>
    </Container>
  );
}

export default App;
