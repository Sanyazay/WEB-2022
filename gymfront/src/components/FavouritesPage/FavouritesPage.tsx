import React, { useEffect, useState } from 'react';

import { FavouritesPageProps } from './FavouritesPage.types';

import './FavouritesPage.css';
import { useDispatch } from 'react-redux';
import { setDataAction, setFavAction, useBooly, useData, useFav } from '../../slices/dataSlice';
import { WorkoutCard } from '../WorkoutCard';

export const FavouritesPage: React.FC<FavouritesPageProps> = () => {
    const dispatch = useDispatch()
    const [workouts, setWorkouts] = useState([]);
    const fav = useFav()
    useEffect(() => {
        fetch('/api/favourites/' )
            .then(response => response.json())
            
            .then(data => {
                setWorkouts(data);
                console.log(fav)
                if(data["status"] != "Notok"){
                    dispatch(setFavAction(data));
                }
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
