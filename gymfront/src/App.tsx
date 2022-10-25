import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WorkoutList } from './components/WorkoutList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { HeadHat } from './components/HeadHat';
import { WorkoutPage } from './components/WorkoutPage';

function App() {
  return (
    
    
    
    
    <Router>
    <div>
      <HeadHat />
      <Routes>
        <Route path="/" element={<WorkoutList/>} />
        
        <Route path="/workout/:id" element={<WorkoutPage/>} />
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
