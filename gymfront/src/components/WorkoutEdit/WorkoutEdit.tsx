import React, { useEffect, useState } from 'react';

import { WorkoutEditProps } from './WorkoutEdit.types';
import { useLocation } from 'react-router-dom';
import './WorkoutEdit.css';

export const WorkoutEdit: React.FC<WorkoutEditProps> = () => {
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[difficulty,setDifficulty] = useState("");
    const[duration,setDuration] = useState("")
    const[workout,setWorkout] = useState()
    const location = useLocation().pathname;
    const id = location.substring(location.lastIndexOf('/') + 1);
    

    const HandleSubmit = () => {
        fetch("/api/edit_workout/",{method : "POST", body: JSON.stringify({"workout_id":id ,"workout_name": name, "workout_description": description, "workout_difficulty": difficulty,"workout_duration": duration})})
        .then((res) => res.json())
          .then((data) => {
            console.log(data)
            
        });
    };


    useEffect(() => {
        fetch('/api/get_workout/',{method : "POST", body : JSON.stringify({"workout_id":id})})
        .then(response => response.json())
        .then(data => {
            setWorkout(data)
            setName(data.name)
            setDescription(data.description)
            setDifficulty(data.difficulty)
            setDuration(data.duration)
            console.log(data)
            
        })
        



    },[])
            
      
    
    return <div>
        <input onChange={(e) => setName(e.target.value)} placeholder='Name' value={name}/>
        <input onChange={(e) => setDescription(e.target.value)} placeholder='Description' value={description}/>
        <input onChange={(e) => setDuration(e.target.value)} placeholder='Duration hh:mm:ss' value={duration}/>
        <select value={difficulty} onChange={(e)=> setDifficulty(e.target.value)} name="Difficulty">
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
        
        <button onClick={HandleSubmit}></button>



    </div>;
};


// fetch('/api/edit_workout/')
//         .then(response => response.json())
//         .then(data => {
//             setWorkout(data)
//             setName(data.name)
//             setDescription(data.description)
//             setDifficulty(data.difficulty)
//             setDuration(data.duration)