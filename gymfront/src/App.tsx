import React, { useEffect, useState } from 'react';
import store from "./store";
import './App.css';
import { WorkoutList } from './components/WorkoutList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { HeadHat } from './components/HeadHat';
import { WorkoutPage } from './components/WorkoutPage';
import { FavouritesPage } from './components/FavouritesPage';
import { RegPage } from './components/RegPage';
import { AuthPage } from './components/AuthPage';
import { Provider, useDispatch } from 'react-redux';
import { setDataAction } from './slices/dataSlice';
interface IExercise {
  pk: Number,
  name: String,
  description: String,
  muscle_group: String,
  difficulty: Number,
  video_url: String
}
export interface IWorkout {
  pk: Number,
  name: String,
  description: String,
  difficulty: Number,
  duration: String,
  exercises: IExercise[]
}


function App() {
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/workouts/' )
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
        
}, [])
  
  return (
    
    
    <Router>
    <div>
      <HeadHat />
      <Routes>
        <Route path="/" element={<WorkoutList/>} />
        <Route path="/workout/:id" element={<WorkoutPage/>} />
        <Route path="favourites" element={<FavouritesPage/>}/>
        <Route path="registration" element={<RegPage/>}/>
        <Route path="auth" element={<AuthPage/>}/>
      </Routes>
    </div>
  </Router>
  
  
  );
}

export default App;

