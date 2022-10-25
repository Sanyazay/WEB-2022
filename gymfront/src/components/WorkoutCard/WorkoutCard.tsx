import React from "react";

import { WorkoutCardProps } from "./WorkoutCard.types";

import "./WorkoutCard.css";
import { Link } from "react-router-dom";

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link to={`workout/${workout.pk.toString()}`}>
      <div>
        <ul style={{ margin: "50px" }}>
          <li>{workout.pk.toString()}</li>
          <li>{workout.name}</li>
          <li>{workout.duration}</li>
          <li>{workout.difficulty.toString()}</li>
          <li>{workout.description}</li>
        </ul>
      </div>
      
    </Link>
  );
};
