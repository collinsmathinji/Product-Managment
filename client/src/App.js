import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesGraph from './components/mainpage';
import ItemEntry from './components/ItemEntry';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CompanyDetails from './components/CompanyDetails';
import EmployeeDetails from './components/EmployeeDetails';
import ItemTaken from './components/itemTaken';
import ItemReturned from './components/itemReturned';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard ><SalesGraph/></Dashboard >} />
        <Route path="/sales" element={<Dashboard ><ItemEntry/></Dashboard >} />
        <Route  path="/company" element={<CompanyDetails/>} />
        <Route path="/employees" element={<EmployeeDetails/>} />
        <Route  path="/Returned" element={<Dashboard ><ItemReturned/></Dashboard>} />
        <Route path="/Taken" element={<Dashboard ><ItemTaken/></Dashboard>} />
      </Routes>
    </Router>
  );
}

export default App;
