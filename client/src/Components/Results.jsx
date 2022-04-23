import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

export default function Results() {
  function createData(name, maxMarks, average, clo) {
    return { name, maxMarks, average, clo };
  }

  function addEntry(e) {
    const input = document.getElementById("newQuiz");
    console.log(input.classList.remove("hidden"));
  }

  function confirmEntry(e) {
    const input = document.getElementById("newQuiz");
    const name = document.getElementById("name").value;
    const maxMarks = document.getElementById("max").value;
    const average = document.getElementById("average").value;
    const clo = document.getElementById("clo").value;

    setQuizes([...quizes, createData(name, maxMarks, average, clo)]);
    console.log(input.classList.add("hidden"));
  }

  const [quizes, setQuizes] = useState([
    createData("Quiz 1", 10, 6.0, 1),
    createData("Quiz 2", 10, 6.9, 2),
  ]);

  return (
    <Container sx={{ mt: "50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell>Assessment</TableCell>
              <TableCell align="right">Max Marks</TableCell>
              <TableCell align="right">Average</TableCell>
              <TableCell align="right">CLO</TableCell>
              <TableCell align="right">Weightage</TableCell>
            </TableRow>
          </TableHead>
          <TableHead sx={{ backgroundColor: "#489BFC" }}>
            <TableRow>
              <TableCell>
                Quiz
                <IconButton sx={{ p: 0, ml: 1 }} onClick={addEntry}>
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right" colSpan={4}>
                5%
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizes.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.maxMarks}</TableCell>
                <TableCell align="right">{row.average}</TableCell>
                <TableCell align="right">{row.clo}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
            <TableRow className="hidden" id="newQuiz">
              <TableCell component="th" scope="row">
                <input
                  id="name"
                  style={{ width: "35%", fontFamily: "DM Sans" }}
                ></input>
              </TableCell>
              <TableCell align="right">
                <input
                  id="max"
                  style={{
                    width: "15%",
                    fontFamily: "DM Sans",
                    textAlign: "right",
                  }}
                ></input>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <input
                  id="average"
                  style={{
                    width: "15%",
                    fontFamily: "DM Sans",
                    textAlign: "right",
                  }}
                ></input>
              </TableCell>
              <TableCell align="right">
                <select id="clo" style={{ fontFamily: "DM Sans" }}>
                  <option value="1">CLO-1</option>
                  <option value="2">CLO-2</option>
                </select>
              </TableCell>
              <TableCell align="right">
                <IconButton sx={{ p: 0 }} onClick={confirmEntry}>
                  <DoneIcon></DoneIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead sx={{ backgroundColor: "#489BFC" }}>
            <TableRow>
              <TableCell>
                Assignment
                <IconButton sx={{ p: 0, ml: 1 }}>
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right" colSpan={4}>
                5%
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizes.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.maxMarks}</TableCell>
                <TableCell align="right">{row.average}</TableCell>
                <TableCell align="right">{row.clo}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
