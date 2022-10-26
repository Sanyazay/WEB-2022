import React, {Component, useEffect, useState} from 'react';

import { WorkoutPageProps } from './WorkoutPage.types';

import './WorkoutPage.css';
import { Link, useLocation } from 'react-router-dom';
import { IWorkout } from '../WorkoutList/WorkoutList';


export const WorkoutPage: React.FC<WorkoutPageProps> = () => {
    const [workout, setWorkout] = useState<IWorkout | null>(null);
    const location = useLocation().pathname;
    const id = location.substring(location.lastIndexOf('/') + 1);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/workouts/'+id)
            .then(response => response.json())
            
            .then(data => {

                setWorkout(data);
                
            })
    }, [])
    return  workout ? 
    <div className="noLink">
        <div><Link to="/">MainPage</Link>/{workout.name}</div>
    <li>
        {workout.name}
        
    </li>
    <li>{workout.description}</li>
    </div>
    : null;
};
