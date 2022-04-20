import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePlo from "./pages/create/createPlo";
import EditPlo from "./pages/create/editPlo";
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/dashboard/instructor"
            element={<InstructorDashboard />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            exact
            path="/dashboard/admin/createPlo"
            element={<CreatePlo />}
          />
          <Route
            exact
            path="/dashboard/admin/editPlo/:name"
            element={<EditPlo />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
