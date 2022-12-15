import React, { useState, useEffect, useContext } from 'react';

import { WorkoutListProps } from './WorkoutList.types';

import './WorkoutList.css';
import { WorkoutCard } from '../WorkoutCard';
import { WorkoutContext } from '../../App';



export const WorkoutList: React.FC<WorkoutListProps> = () => {

    
    const workouts = useContext(WorkoutContext);
    
    console.log(workouts)
    
    return <div>
                <div className='navbar'>MainPage</div>
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout,key) => <WorkoutCard workout={workout} key={key}></WorkoutCard>)}
                    </div>
                </div>
            </div>
};