import React from 'react';



import './RegPage.css';

export const RegPage = () => {

    const HandleClick = () => {
          fetch('http://127.0.0.1:8000/account/create/',{method : "POST", body: JSON.stringify({login:"admin", password : "admin"})})
            .then((res) => res.json())
            .then((data) => console.log(data));
        };
    return <div>
        <input type="text" />
        <input type="text" />
        <button className='buttonStyle'  onClick={HandleClick}>REGISTER</button>
    </div>;
};
