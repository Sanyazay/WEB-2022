import React, { useEffect, useState } from "react";

import { WorkoutCardProps } from "./WorkoutCard.types";

import "./WorkoutCard.css";
import { Link } from "react-router-dom";
import {ReactComponent as ClockIcon} from "../../assets/clock-icon.svg"
import {ReactComponent as HeartIcon} from "../../assets/heart-svgrepo-com.svg"
import { useDispatch } from "react-redux";
import { setBoolyAction, setFavAction, useBooly, useFav } from "../../slices/dataSlice";
export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const classnames = "CardDifficulty CardDifficulty-" + workout.difficulty.toString()
  // const favclassname = "CardFav"
  const favourites = useFav()
  const [favstate,setFavstate] = useState("CardFav-no")
  const dispatch = useDispatch()
  
  useEffect(() => {
    func()
        
  }, [])

  const func = () => {
    if (favourites.length != 0) {
      favourites.map((x : any) => {
        if(x.pk === workout.pk) {
          setFavstate("CardFav")
        }
      })
    }
    
  }
  
  const HandleClick = (e : React.MouseEvent) => {
    // e.stopPropagation();
    e.preventDefault();
    if(favstate === "CardFav") {
      setFavstate("CardFav-no")
    }else {
      setFavstate("CardFav")
    }
    fetch('/api/add-favourites/',{method : "POST", body: JSON.stringify({"workout_id": workout.pk})})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        
        dispatch(setBoolyAction())
        
    });
  };

  return (
    <Link className="CardWrapper" to={`/workout/${workout.pk.toString()}`}>
      <div className={classnames}>{workout.difficulty.toString()}</div>
      <div className="heart">
        <HeartIcon className={favstate} onClick={HandleClick}></HeartIcon>
      </div>
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
        {/* <button onClick={HandleClick}></button> */}
        <div>{workout.pk.toString()}</div>
      </div>
      
    </Link>
  );
};
