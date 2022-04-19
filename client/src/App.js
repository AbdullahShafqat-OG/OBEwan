import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePlo from "./pages/create/createPlo";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard/instructor" element={<InstructorDashboard />} />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route exact path="/dashboard/admin/createPlo" element={<CreatePlo />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;