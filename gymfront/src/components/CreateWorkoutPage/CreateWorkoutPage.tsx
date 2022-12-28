import React, { useEffect, useState } from 'react';

import { CreateWorkoutPageProps } from './CreateWorkoutPage.types';

import './CreateWorkoutPage.css';

export const CreateWorkoutPage: React.FC<CreateWorkoutPageProps> = () => {
    
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[difficulty,setDifficulty] = useState("");
    const[exercises,setExercise] = useState<string[]>([]);
    const[allexercises,setAllexercises] = useState<string[]>([]);
    const[duration,setDuration] = useState("")
    
    const HandleCheckBox = (e : any) => {
            if(exercises.includes(e.target.value)) {
                setExercise(exercises.filter((x)=>x!=e.target.value))
            } else {
                setExercise([...exercises,e.target.value])
            }
            
      };
    const HandleClick = () => {
        console.log(exercises)
    };

    const HandleSubmit = () => {
        fetch("api/createworkout/",{method : "POST", body: JSON.stringify({"workout_name": name, "workout_description": description, "workout_difficulty": difficulty,"workout_duration": duration ,"workout_exercises": exercises})})
        .then((res) => res.json())
          .then((data) => {
            console.log(data)
            
        });
    };


    useEffect(() => {
        fetch('/api/exercises/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAllexercises(data);
        })
        



    },[])
            
      
    
    return <div>
        <input onChange={(e) => setName(e.target.value)} placeholder='Name'/>
        <input onChange={(e) => setDescription(e.target.value)} placeholder='Description'/>
        <input onChange={(e) => setDuration(e.target.value)} placeholder='Duration hh:mm:ss'/>
        <select onChange={(e)=> setDifficulty(e.target.value)} name="Difficulty">
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
        {allexercises.map((exercise : any,key : any) => <div><input
            type="checkbox"
            id={exercise.pk}
            
            value={exercise.pk}
            onChange={HandleCheckBox} />
        <label htmlFor={exercise.pk}>{exercise.name}</label>
        
        </div>)}
        <button onClick={HandleSubmit}>SUBMIT</button>



    </div>;
};
