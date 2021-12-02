import React from 'react';
import logo from './logo.svg';
import './App.css';
import Indicators from './features/indicators/Indicators';
import Navbar from './components/Navbar';
import Info from './components/Info';
import SavedQueries from './components/SavedQueries';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Indicators />} />
          <Route path='/info' element={<Info />} />
          <Route path='/saved-queries' element={<SavedQueries />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
