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
import { setAuthOnAction, setDataAction, setFavAction, setUsernameAction, useAuth, useBooly, useFav, useUser } from './slices/dataSlice';
import { ManagerPage } from './components/ManagerPage';
import { CreateWorkoutPage } from './components/CreateWorkoutPage';
import { WorkoutsWorkshop } from './components/WorkoutsWorkshop';
import { WorkoutEdit } from './components/WorkoutEdit';
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
  exercises: IExercise[],
  publication_state:Number,
  approve_date:String,
  publication_date:String,
  creation_date:String
}


function App() {
  const dispatch = useDispatch()
  const fav = useFav()
  
  useEffect(() => {
    fetch('/api/workouts/' )
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            // console.log(data.length)
            
        })
        
}, [])


useEffect(() => {
  fetch('/api/isAuth/' )
      .then(response => response.json())
      
      .then(data => {
        // console.log(data)
        if(data["status"] != "Notok"){
          dispatch(setAuthOnAction())
          dispatch(setUsernameAction(data.username))
          
          // console.log(data.username)
      }
          
      })
      
}, [useAuth()])


useEffect(() => {
  fetch('/api/favourites/' )
      .then(response => response.json())
      
      .then(data => {
        
        if(data["status"] != "Notok"){
          dispatch(setFavAction(data))
            
          
          
      }
          
      })
      
}, [useBooly()])

  return (
    
    
    <Router>
    <div>
      
      <HeadHat />
      <Routes>
        <Route path="manager" element={<ManagerPage/>}></Route>
        <Route path="/" element={<WorkoutList/>} />
        <Route path="/workout/:id" element={<WorkoutPage/>} />
        <Route path="/editworkout/:id" element={<WorkoutEdit/>} />
        <Route path="favourites" element={<FavouritesPage/>}/>
        <Route path="registration" element={<RegPage/>}/>
        <Route path="auth" element={<AuthPage/>}/>
        <Route path="createworkout" element={<CreateWorkoutPage/>}/>
        <Route path="myworkshop" element={<WorkoutsWorkshop/>}/>
      </Routes>
    </div>
  </Router>
  
  
  );
}

export default App;

