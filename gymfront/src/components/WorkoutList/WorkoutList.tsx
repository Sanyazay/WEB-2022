import React, { useState, useEffect } from 'react';

import { WorkoutListProps } from './WorkoutList.types';

import './WorkoutList.css';
import { WorkoutCard } from '../WorkoutCard';

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

export const WorkoutList: React.FC<WorkoutListProps> = () => {

    
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/workouts/')
            .then(response => response.json())
            
            .then(data => {
                setWorkouts(data);

            })
    }, [])
    return <div>
        MainPage
        <div>{workouts.map((workout,key) => <WorkoutCard workout={workout} key={key}></WorkoutCard>)}</div>
        </div>
};
