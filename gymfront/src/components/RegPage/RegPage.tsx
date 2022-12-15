import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';



import './RegPage.css';

export const RegPage = () => {


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useState(0)
    const HandleClick = () => {
          fetch('http://127.0.0.1:8000/api/account/create/',{method : "POST", body: JSON.stringify({username: login, password : password})})
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(JSON.parse(data)["status"] === "ok"){
                    setAuth(1)
                }
                
            });
        };
    if (auth === 0) {

    
    return  <div>
            <div className='RegWrapper'>
            <div className='RegCard'>
                    <div className="text1wrapper">
                        <div className="text1">
                            Sign up
                        </div>
                    </div>
                    <input onChange={(event) => setLogin(event.target.value)} placeholder='Login' type="text" className='InputField' />
                    <input onChange={(event) => setPassword(event.target.value)} placeholder='Password' type="password" className='InputField' />
                    <button className='buttonStyle'  onClick={HandleClick}>Sign up</button>
                    <div className="text2wrapper">
                        <div className="text21">
                            Already have an account?
                        </div>
                        <div className="text22">
                            <Link to={{pathname:"/auth"}} className="linkStyle">
                                Log in
                            </Link>
                            
                        </div>
                    </div>
            </div>
            </div>
            </div>
    } else {
        return <Navigate to = {"/auth"}></Navigate>
    }
};
        
