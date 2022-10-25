import React from 'react';

import { HeadHatProps } from './HeadHat.types';

import './HeadHat.css';
import { Link } from 'react-router-dom';
export const HeadHat: React.FC<HeadHatProps> = () => {
    return <div>
        <Link to="/"> Home </Link>
    </div>;
};
