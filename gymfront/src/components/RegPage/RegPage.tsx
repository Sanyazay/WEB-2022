import React from 'react';



import './RegPage.css';

export const RegPage = () => {

    const HandleClick = () => {
          fetch('http://127.0.0.1:8000/account/create/',{method : "POST", body: JSON.stringify({login:"test", password : "123"})})
            .then((res) => res.json())
            .then((data) => console.log(data));
        };
    return <div>
        <button onClick={HandleClick}></button>
    </div>;
};
