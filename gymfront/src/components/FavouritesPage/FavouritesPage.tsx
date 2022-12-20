import React, { useEffect, useState } from 'react';

import { FavouritesPageProps } from './FavouritesPage.types';

import './FavouritesPage.css';
import { useDispatch } from 'react-redux';
import { setDataAction, useData } from '../../slices/dataSlice';
import { WorkoutCard } from '../WorkoutCard';

export const FavouritesPage: React.FC<FavouritesPageProps> = () => {
    const dispatch = useDispatch()
    const [workouts, setWorkouts] = useState([]);
    useEffect(() => {
        fetch('/api/favourites/' )
            .then(response => response.json())
            
            .then(data => {
                setWorkouts(data);
                console.log(data.length)
                
            })
            
    }, [])
      
    
    
    return <div>
                
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout : any,key : any) => <WorkoutCard workout={workout} key={key}></WorkoutCard>)}
                    </div>
                </div>
            </div>
};
