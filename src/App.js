import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesGraph from './components/mainpage';
import ItemEntry from './components/ItemEntry';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard ><SalesGraph/></Dashboard >} />
        <Route path="/Sales" element={<Dashboard ><ItemEntry/></Dashboard >} />
      </Routes>
    </Router>
  );
}

export default App;
