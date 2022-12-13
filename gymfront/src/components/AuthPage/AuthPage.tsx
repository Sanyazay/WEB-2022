import React from 'react';

import { AuthPageProps } from './AuthPage.types';

import './AuthPage.css';

export const AuthPage: React.FC<AuthPageProps> = () => {


    const HandleClick = () => {
        fetch('/api/authorize/',{method : "POST", body: JSON.stringify({"login": "admin", "password": "admin"})})
          .then((res) => res.json())
          .then((data) => console.log(data));
      };
    const HandleClick1 = () => {
        fetch('/api/test/')
          .then((res) => res.json())
          .then((data) => console.log(data));
      };
    return <div>
        <input type="text" />
        <input type="text" />
        <button className='buttonStyle' onClick={HandleClick} >Login</button>
        <button className='buttonStyle' onClick={HandleClick1} >Login</button>
        
    </div>;
};
