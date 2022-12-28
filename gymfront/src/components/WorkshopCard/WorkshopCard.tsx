import React, { useEffect, useState } from 'react';

import { WorkshopCardProps } from './WorkshopCard.types';
import {ReactComponent as ClockIcon} from "../../assets/clock-icon.svg";
import './WorkshopCard.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const WorkshopCard: React.FC<WorkshopCardProps> = ({workout}) => {
    const classnames = "CardDifficulty CardDifficulty-" + workout.difficulty.toString()
    const [statusStyle,setStatusStyle] = useState("")
    const [statusLabel,setStatusLabel] = useState("")


    
    useEffect(() => {
        console.log(workout)
        console.log(workout.publication_state)
        if(workout.publication_state == 0){

            setStatusStyle("style-0")
            setStatusLabel("On verification")
        }
        if(workout.publication_state == 1) {

            setStatusStyle("style-1")
            setStatusLabel("Approved")
        }
        if(workout.publication_state == 2) {

            setStatusStyle("style-2")
            setStatusLabel("Posted")
        }
        if(workout.publication_state == -1) {

            setStatusStyle("style--1")
            setStatusLabel("Declined")
        }
      }, [])
    
  
  

  return (
    <Link className="CardWrapper" to={`/editworkout/${workout.pk.toString()}`}>
      <div className={classnames}>{workout.difficulty.toString()}</div>
      
        <div className={"status "+statusStyle}>{statusLabel}</div>
      
      <div className="CardContent">
        
        
        <div className="CardHeader">

          <div className="CardTitleWrap">
            {workout.name}
          </div>
          <div className="CardHeaderRightChild">

          <ClockIcon width="20px" fill="#949494"/>
          <div className="CardTimeWrap">
            {workout.duration}
          </div>
          </div>

        </div>
        <div className="CardDescriptionWrap">
          {workout.description}
        </div>
        
        <div>{workout.pk.toString()}</div>
        
      </div>
      
    </Link>
  );
};


