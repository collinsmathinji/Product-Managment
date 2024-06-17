import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesGraph from './components/mainpage';
import ItemEntry from './components/ItemEntry';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CompanyDetails from './components/CompanyDetails';
import EmployeeDetails from './components/EmployeeDetails';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/Login" element={<Login/>} />
        <Route path="/" element={<Dashboard ><SalesGraph/></Dashboard >} />
        <Route path="/sales" element={<Dashboard ><ItemEntry/></Dashboard >} />
        <Route  path="/company" element={<CompanyDetails/>} />
        <Route path="/employees" element={<EmployeeDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
