import React, { useState } from 'react';

import { HeadHatProps } from './HeadHat.types';
import { ReactComponent as StarIcon} from "../../assets/star.svg"
import './HeadHat.css';
import { Link } from 'react-router-dom';
export const HeadHat: React.FC<HeadHatProps> = () => {
    
    
    const HandleClick = () => {
        fetch('http://127.0.0.1:8000/api/logout/')
        .then(response => response.json())
        
        .then(data => {
            
            console.log(data.length)
            
        })
      };
    return <div className="HeadWrapper">
        <div className="iconsWrapper">
            <Link className='HomeButton' to="/"> Home </Link>
            <Link to="/FavouritesPage">

                <StarIcon viewBox='0 0 100 100' width="50px" height="50px" fill = "white" className='starStyle'></StarIcon>
            </Link>
            <button onClick={HandleClick}>LogOUT</button>
            
        </div>
       
    </div>;
};
