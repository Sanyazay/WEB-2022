import React, { useEffect, useState } from 'react';

import './App.css';
import { WorkoutList } from './components/WorkoutList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { HeadHat } from './components/HeadHat';
import { WorkoutPage } from './components/WorkoutPage';
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
export const WorkoutContext = React.createContext<IWorkout[]> ([]);
function App() {
  const [workouts,setWorkouts] = useState<IWorkout[]>([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/workouts/')
        .then(response => response.json())
        
        .then(data => {
            setWorkouts(data);

        })
}, [])
  return (
    <WorkoutContext.Provider value = {workouts}>
    <Router>
    <div>
      <HeadHat />
      <Routes>
        <Route path="/" element={<WorkoutList/>} />
        <Route path="/workout/:id" element={<WorkoutPage/>} />
      </Routes>
    </div>
  </Router>
  </WorkoutContext.Provider>
  );
}

export default App;
