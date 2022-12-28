import React, { useState, useEffect, useContext } from 'react';

import { WorkoutListProps } from './WorkoutList.types';

import './WorkoutList.css';
import { WorkoutCard } from '../WorkoutCard';
import { setDataAction, useData } from '../../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as SearchIcon} from "../../assets/icons8-search.svg"
import { ReactComponent as RefreshIcon} from "../../assets/refresh-svgrepo-com.svg"


export const WorkoutList: React.FC<WorkoutListProps> = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState(-1);
    const HandleClickSearch = () => {
        fetch('/api/workouts/?name='+search+"&duration="+duration+"&difficulty="+difficulty)
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
      };
      const HandleClickRefresh = () => {
        
        fetch('/api/workouts/')
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
        setSearch("")
      };
    const workouts = useData()
    
    return <div>
                <div className='navbar'>MainPage</div>
                <div className="searchWrap">

                    <input value={search} id="Form" className='searchBar' placeholder='Search' onChange={e => setSearch(e.target.value)}></input>
                    
                    <input value={duration}  className='durationBar' placeholder='Duration 00:00:00' onChange={e => setDuration(e.target.value)}></input>
                    <select onChange={(e)=> setDifficulty(parseInt(e.target.value))} name="Difficulty" className='difficultySelect'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <SearchIcon onClick={HandleClickSearch} className='SearchIconStyle'></SearchIcon>
                    <RefreshIcon onClick={HandleClickRefresh} className='RefreshIconStyle'></RefreshIcon>

                </div>
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout : any,key : any) => <WorkoutCard workout={workout} key={key}></WorkoutCard>)}
                    </div>
                </div>
            </div>
};