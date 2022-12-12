import React from 'react';

import { HeadHatProps } from './HeadHat.types';
import { ReactComponent as StarIcon} from "../../assets/star.svg"
import './HeadHat.css';
import { Link } from 'react-router-dom';
export const HeadHat: React.FC<HeadHatProps> = () => {
    return <div className="HeadWrapper">
        <div className="iconsWrapper">
            <Link to="/"> Home </Link>
            <Link to="/FavouritesPage">

                <StarIcon viewBox='0 0 100 100' width="50px" height="50px" fill = "white" className='starStyle'></StarIcon>
            </Link>
            
        </div>
       
    </div>;
};
