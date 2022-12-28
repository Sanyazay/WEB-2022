import React, { useState } from 'react';

import { HeadHatProps } from './HeadHat.types';
import { ReactComponent as StarIcon} from "../../assets/star.svg"
import './HeadHat.css';
import { Link } from 'react-router-dom';
import { UserBox } from '../UserBox';
export const HeadHat: React.FC<HeadHatProps> = () => {
    
    
    
    return <div className="HeadWrapper">
        <div className="iconsWrapper">
            <Link className='HomeButton' to="/"> Home </Link>
            <Link to="/favourites">

                <StarIcon viewBox='0 0 100 100' width="50px" height="50px" fill = "white" className='starStyle'></StarIcon>
            </Link>
            <Link to="/manager">Manager
            </Link>
            <UserBox></UserBox>
            
        </div>
       
    </div>;
};
