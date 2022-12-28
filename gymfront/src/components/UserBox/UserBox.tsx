import React from 'react';

import { UserBoxProps } from './UserBox.types';

import './UserBox.css';
import { setAuthOffAction, useAuth, useUser } from '../../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export const UserBox: React.FC<UserBoxProps> = () => {
    const dispatch = useDispatch()
    const username = useUser()
    const isAuth = useAuth()
    const HandleClick = () => {
        fetch('/api/logout/')
        .then(response => response.json())
        .then(data => {
            
            console.log(data.length)
            if(JSON.parse(data)["status"] === "successfully logged out"){
                dispatch(setAuthOffAction())
            }
            
        })
      };
    
    
    return isAuth ?
    <div className='usernameWrapper'>
        <div className="usernameStyle">{username}</div>
        <button className='logoutbuttonStyle' onClick={HandleClick}>LogOUT</button>
        <div><Link to="/myworkshop">Workshop</Link></div>
    {/* <div><Link to='workoutWorkshop'></Link></div> */}
    </div>
    :<div>NOT Authorised?

        <Link to="/auth"> Sign in</Link>
        
    </div>;
};
