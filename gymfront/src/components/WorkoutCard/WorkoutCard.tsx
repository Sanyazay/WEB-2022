import React from "react";

import { WorkoutCardProps } from "./WorkoutCard.types";

import "./WorkoutCard.css";
import { Link } from "react-router-dom";
import {ReactComponent as ClockIcon} from "../../assets/clock-icon.svg" 
export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const classnames = "CardDifficulty CardDifficulty-" + workout.difficulty.toString()
  return (
    <Link className="CardWrapper" to={`workout/${workout.pk.toString()}`}>
      <div className={classnames}>{workout.difficulty.toString()}</div>
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
        
      </div>
      
    </Link>
  );
};
