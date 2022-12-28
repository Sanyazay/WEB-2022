import React, { useEffect, useState } from 'react';
import {ReactComponent as ClockIcon} from "../../assets/clock-icon.svg";
import { ManagerCardProps } from './ManagerCard.types';

import './ManagerCard.css';
import { Link } from 'react-router-dom';
import { useBooly } from '../../slices/dataSlice';

export const ManagerCard: React.FC<ManagerCardProps> = ({workout}) => {
    const classnames = "CardDifficulty CardDifficulty-" + workout.difficulty.toString();
    const [statusStyle,setStatusStyle] = useState("");
    const [statusLabel,setStatusLabel] = useState("");
    const [verifybutton,setVerifybutton] = useState("");
    const [hide,setHide] = useState("defbutstyle")
    const[change,setChange] = useState("")
    const[hideCard,setHideCard] = useState("")
    const HandleClick = (e : React.MouseEvent) => {
      e.preventDefault()
      fetch('api/change_workout_state/',{method : "POST", body: JSON.stringify({"workout_id": workout.pk})})
        .then((res) => res.json())
        .then((data) => {
          if(JSON.parse(data)["status"] === "Ok"){
              
              console.log("NICE")
              if(workout.publication_state == 0){

                setStatusStyle("style-1")
                setStatusLabel("Approved")
                setVerifybutton("Post")
                workout.publication_state = 1
              }else {

              // }
              // if(workout.publication_state == 1) {
      
                setStatusStyle("style-2")
                setStatusLabel("Posted")
                setHide("hide")
                workout.publication_state = 2
              }
              
              
          }
      });
    };
    const HandleClick1 = (e : React.MouseEvent) => {
      e.preventDefault()
      fetch('api/decline_workout/',{method : "POST", body: JSON.stringify({"workout_id": workout.pk})})
        .then((res) => res.json())
        .then((data) => {
          if(JSON.parse(data)["status"] === "Ok"){
              console.log("NICE")
              setStatusStyle("style--1")
              setStatusLabel("Declined")
              setVerifybutton("")
              setHide("hide")
          }
      });
    };
    const DeleteFunc = (e : React.MouseEvent) => {
      e.preventDefault()
      fetch('api/delete_workout/',{method : "POST", body: JSON.stringify({"workout_id": workout.pk})})
        .then((res) => res.json())
        .then((data) => {
          if(JSON.parse(data)["status"] === "Ok"){
              console.log("NICE")
              setHideCard("hide")
              
          }
      });
    };
    useEffect(() => {
        
        if(workout.publication_state == 0){

            setStatusStyle("style-0")
            setStatusLabel("On verification")
            setVerifybutton("Verify")
            setHide("")
        }
        if(workout.publication_state == 1) {

            setStatusStyle("style-1")
            setStatusLabel("Approved")
            setVerifybutton("Post")
            setHide("")
        }
        if(workout.publication_state == 2) {

            setStatusStyle("style-2")
            setStatusLabel("Posted")
            setVerifybutton("")
            setHide("")
        }
        if(workout.publication_state == -1) {

            setStatusStyle("style--1")
            setStatusLabel("Declined")
            setHide("hide")
        }
      }, [workout])
    
  
  

  return (
    <Link className={"CardWrapper "+hideCard} to={`/editworkout/${workout.pk.toString()}`}>
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

        <div>Created -   {workout.creation_date}</div>
        <div>Verificated - {workout.approve_date}</div>
        <div>Posted - {workout.publication_date}</div>
        <div>
          <button className={hide+" managerButtons"} onClick={HandleClick}>{verifybutton}</button>
          <button className={hide+" managerButtons"} onClick={HandleClick1}>Decline</button>
          <button className='managerButtons' onClick={DeleteFunc}>DELETE</button>
        </div>
      </div>
      
    </Link>
  );
};


