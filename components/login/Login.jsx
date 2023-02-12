import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import "react-phone-input-2/lib/style.css";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth } from "../firebase";
import Signup from './SignupForm';
import LoginForm from './LoginForm';

const Login = () => {

    const [login, setLogin] = useState(true);

    return (
        <>
            <div className="login-cont">
                <div className="login-left-cont" style={{ transform: login ? 'translateY(0)' : 'translateY(-50%)' }}>
                    <div className="left-one">
                        <Image src="/Better-Together-Chocolate-Vanilla-Birthday-Cake-1-500x500.webp" fill />
                    </div>
                    <Signup setLogin={setLogin} />
                </div>
                <div className="login-right-cont" style={{ transform: login ? 'translateY(-50%)' : 'translateY(0%)' }}>

                    <div className="left-one">
                        <Image src="/melting-ice-cream-cake-3-544x680.webp" fill />
                    </div>
                    <LoginForm setLogin={setLogin} />
                </div>
            </div>
        </>

    )
}

export default Login