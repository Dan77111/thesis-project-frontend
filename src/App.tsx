import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Info from './components/Info';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { getCurrentIndicatorValues } from './features/indicators/indicatorsSlice';
import Visualizer from './components/Visualizer';
import Analysis from './components/Analysis';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentIndicatorValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/indicators' element={<Visualizer />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/info' element={<Info />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
