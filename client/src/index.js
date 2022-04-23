import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import PLOsPage from "./Components/PLOsPage";
import CLOsPage from "./Components/CLOsPage";
import Courses from "./Components/Courses";
import Dashboard from "./Components/Dashboard";
import Results from "./Components/Results";
import Navbar from "./Components/Navbar";
import CreatePLO from "./Components/crud/CreatePLO";
import CreateCLO from "./Components/crud/CreateCLO";
import CreateMapping from "./Components/crud/CreateMapping";
import AddCourse from "./Components/crud/AddCourse";
import EditPLO from "./Components/crud/EditPLO";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./style.css";

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
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/results" element={<Results />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/clos" element={<CLOsPage />} />
          <Route
            exact
            path="/dashboard/admin/createClo"
            element={<CreateCLO />}
          />
          <Route exact path="/plos" element={<PLOsPage />} />
          <Route
            exact
            path="/dashboard/admin/createPlo"
            element={<CreatePLO />}
          />
          <Route
            exact
            path="/dashboard/admin/editPlo/:id"
            element={<EditPLO />}
          />
          <Route
            exact
            path="/dashboard/admin/addCourse"
            element={<AddCourse />}
          />
          <Route exact path="/mapping/:id" element={<CreateMapping />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
