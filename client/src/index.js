import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import InstructorDashboard from "./Components/InstructorDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import Navbar from "./Components/Navbar";
import CreatePLO from "./Components/crud/CreatePLO";
import AddCourse from "./Components/crud/AddCourse";
import EditPLO from "./Components/crud/EditPLO";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#489BFC",
    },
    text: { primary: "#000000" },
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/dashboard/instructor"
            element={<InstructorDashboard />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            exact
            path="/dashboard/admin/createPlo"
            element={<CreatePLO />}
          />
          <Route
            exact
            path="/dashboard/admin/editPlo/:name"
            element={<EditPLO />}
          />
          <Route
            exact
            path="/dashboard/admin/addCourse"
            element={<AddCourse />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
