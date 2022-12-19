import React, { useState, useEffect, useContext } from 'react';

import { WorkoutListProps } from './WorkoutList.types';

import './WorkoutList.css';
import { WorkoutCard } from '../WorkoutCard';
import { setDataAction, useData } from '../../slices/dataSlice';
import { useDispatch } from 'react-redux';




export const WorkoutList: React.FC<WorkoutListProps> = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const HandleClick = () => {
        fetch('http://127.0.0.1:8000/api/workouts/?name='+search)
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
      };
      const HandleClick1 = () => {
        fetch('http://127.0.0.1:8000/api/workouts/')
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
      };
    const workouts = useData()
    
    return <div>
                <div className='navbar'>MainPage</div>
                <input placeholder='Search' onChange={e => setSearch(e.target.value)}></input>
                <button onClick={HandleClick}></button>
                <button onClick={HandleClick1}></button>
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout : any,key : any) => <WorkoutCard workout={workout} key={key}></WorkoutCard>)}
                    </div>
                </div>
            </div>
};