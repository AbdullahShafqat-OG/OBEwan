import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import PLOsPage from './Components/PLOsPage';
import PLOScores from './Components/PLOScores';
import CLOsPage from './Components/CLOsPage';
import Courses from './Components/Courses';
import Activities from './Components/Activities';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import CreatePLO from './Components/crud/CreatePLO';
import CreateCLO from './Components/crud/CreateCLO';
import CreateActivity from './Components/crud/CreateActivity';
import CreateMapping from './Components/crud/CreateMapping';
import AddCourse from './Components/crud/AddCourse';
import EditPLO from './Components/crud/EditPLO';
import AddMarks from './Components/crud/AddMarks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './style.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#489BFC',
    },
    text: { primary: '#000000' },
  },
  typography: {
    fontFamily: ['"DM Sans"', 'sans-serif'].join(','),
    button: {
      fontWeight: '700',
      fontSize: '16px',
      textTransform: 'none',
    },
    h4: {
      fontWeight: '700',
      fontSize: '32px',
    },
    h5: {
      fontWeight: '700',
      fontSize: '24px',
    },
    h6: {
      fontWeight: '500',
      fontSize: '16px',
    },
    logo: {
      fontWeight: '700',
      fontSize: '16px',
    },
    subtitle: {
      fontFamily: 'DM Sans',
      fontWeight: '500',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/clos" element={<CLOsPage />} />
          <Route path="/plos" element={<PLOsPage />} />
          <Route path="/reports" element={<PLOScores />} />
          <Route
            path="/dashboard/admin/createActivity/:code"
            element={<CreateActivity />}
          />
          <Route path="/dashboard/admin/createClo" element={<CreateCLO />} />
          <Route path="/dashboard/admin/createPlo" element={<CreatePLO />} />
          <Route path="/dashboard/admin/editPlo/:id" element={<EditPLO />} />
          <Route path="/dashboard/admin/addMarks/:id" element={<AddMarks />} />
          <Route path="/dashboard/admin/addCourse" element={<AddCourse />} />
          <Route path="/mapping/:id" element={<CreateMapping />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
