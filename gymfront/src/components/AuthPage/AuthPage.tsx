import React, { useState } from 'react';

import { AuthPageProps } from './AuthPage.types';

import './AuthPage.css';
import { Link } from 'react-router-dom';

export const AuthPage: React.FC<AuthPageProps> = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const HandleClick = () => {
        fetch('/api/authorize/',{method : "POST", body: JSON.stringify({"login": "admin", "password": "admin"})})
          .then((res) => res.json())
          .then((data) => console.log(data));
      };
    // const HandleClick1 = () => {
    //     fetch('/api/test/')
    //       .then((res) => res.json())
    //       .then((data) => console.log(data));
    //   };
    return <div>
    
    <div className='RegWrapper'>

    <div className='RegCard'>
            <div className="text1wrapper">
                <div className="text1">
                    Log in
                </div>
            </div>
            <input onChange={(event) => setLogin(event.target.value)} placeholder='Login' type="text" className='InputField' />
            <input onChange={(event) => setPassword(event.target.value)} placeholder='Password' type="password" className='InputField' />
            <button className='buttonStyle'  onClick={HandleClick}>Log in</button>
            <div className="text2wrapper">
                <div className="text21">
                    Doesn't have an account?
                </div>
                <div className="text22">
                    <Link to={{pathname:"/registration"}} className="linkStyle">
                        Sign up
                    </Link>
                    
                </div>
            </div>
        
        
    </div>
    </div>
    </div>
};
