import React, {Component} from 'react';

import { WorkoutPageProps } from './WorkoutPage.types';

import './WorkoutPage.css';
import { useLocation } from 'react-router-dom';


export const WorkoutPage: React.FC<WorkoutPageProps> = (props) => {
    const location = useLocation();
    console.log(location)
    return <div>
    </div>;
};
