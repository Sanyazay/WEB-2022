import React, { useEffect, useState } from 'react';

import { ManagerPageProps } from './ManagerPage.types';
import { ReactComponent as SearchIcon} from "../../assets/icons8-search.svg"
import { ReactComponent as RefreshIcon} from "../../assets/refresh-svgrepo-com.svg"
import './ManagerPage.css';
import { WorkoutCard } from '../WorkoutCard';
import { setBoolyAction, setDataAction, useData } from '../../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { ManagerCard } from '../ManagerCard';

export const ManagerPage: React.FC<ManagerPageProps> = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const [workouts,setWorkouts] =useState([]);
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
    const datesearch = () => {
        fetch('/api/managerworkouts_filtered/',{method : "POST", body: JSON.stringify({"filter_name": "date","date_to" : duration,"date_from": search,"state":difficulty})})
        .then(response => response.json())
        
        .then(data => {
            setWorkouts(data)
            console.log(data)
            
            
            
        })
      };
    
      const HandleClickRefresh = () => {
        
        fetch('/api/managerworkouts/')
        .then(response => response.json())
        
        .then(data => {
            dispatch(setDataAction(data));
            console.log(data.length)
            
        })
        setSearch("")
        setDifficulty(-1)
        setDuration("")
      };
    useEffect(() => {
        fetch('/api/managerworkouts/' )
            .then(response => response.json())
            .then(data => {
              setWorkouts(data)
            //   console.log(data)
            })
    },[]);
            
    


    
    return <div>
                <div className='navbar'>ManagerPage</div>
                <div className="searchWrap">

                    <input value={search} id="Form" className='durationBar' placeholder='From' onChange={e => setSearch(e.target.value)}></input>
                    
                    <input value={duration}  className='durationBar' placeholder='To' onChange={e => setDuration(e.target.value)}></input>
                    <select value={difficulty} onChange={(e)=> setDifficulty(parseInt(e.target.value))} name="Difficulty" className='difficultySelect'>
                        <option value="-1">Declined</option>
                        <option value="0">On verification</option>
                        <option value="1">Approved</option>
                        <option value="2">Posted</option>
                        
                    </select>
                    <SearchIcon onClick={datesearch} className='SearchIconStyle'></SearchIcon>
                    <RefreshIcon onClick={HandleClickRefresh} className='RefreshIconStyle'></RefreshIcon>
                    
                    

                </div>
                <div className='centerAllign'>
                    <div className='WorkoutListWrapper'>
                        {workouts.map((workout : any,key : any) => <ManagerCard workout={workout} key={key}></ManagerCard>)}
                    </div>
                </div>
            </div> 
    
    
    
    
    
    
    
    
    
    
    
    
    
};
