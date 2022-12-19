import React, {useContext} from 'react';

import { WorkoutPageProps } from './WorkoutPage.types';

import './WorkoutPage.css';
import { Link, useLocation } from 'react-router-dom';

import { useData } from '../../slices/dataSlice';


export const WorkoutPage: React.FC<WorkoutPageProps> = () => {
    const workouts = useData()
    const location = useLocation().pathname;
    const id = location.substring(location.lastIndexOf('/') + 1);
    const workout = workouts.find( (item : any) => item.pk.toString() === id );
    
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
