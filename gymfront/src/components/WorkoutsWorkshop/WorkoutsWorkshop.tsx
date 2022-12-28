import React, { useEffect, useState } from 'react';

import { WorkoutsWorkshopProps } from './WorkoutsWorkshop.types';

import './WorkoutsWorkshop.css';
import { useDispatch } from 'react-redux';
import { setDataAction, useData } from '../../slices/dataSlice';
import { WorkoutCard } from '../WorkoutCard';
import { WorkshopCard } from '../WorkshopCard';
import { Link } from 'react-router-dom';

export const WorkoutsWorkshop: React.FC<WorkoutsWorkshopProps> = () => {
    
    const [workouts,setWorkouts] = useState([])
      
    useEffect(() => {
        console.log("1")
        fetch('/api/creator_workouts/')
        .then(response => response.json())
        .then(data => {
            setWorkouts(data)
            
        })
            
    },[])
    
    return <div>
                <div className='navbar'>MyWorkouts <Link to="/createworkout">ADD</Link></div>
                
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout : any,key : any) => <WorkshopCard workout={workout} key={key}></WorkshopCard>)}
                    </div>
                </div>
            </div>
};
