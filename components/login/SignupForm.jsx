import React, { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { createUserWithEmailAndPassword, auth } from "../firebase";
import Image from 'next/image';

const Signup = ({ setLogin }) => {

    const [user, setUser] = useState({
        fname: "", lname: "", gender: "", phone: "", email: "", password: ""
    });
    const [error, setError] = useState({
        fname: "", lname: "", gender: "", phone: "", email: "", password: ""
    });
    const [visible, setVisisible] = useState(false);

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const signupvalidate = () => {
        // console.log(user,"us");
        let formErrors = {};
        let regex = user.email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        if (!user.fname) {
            formErrors.fname = "Field is Required"
        }

        if (!user.lname) {
            formErrors.lname = "Field is Required"
        }
        if (!user.phone) {
            formErrors.phone = "Field is Required"
        }
        if (!user.gender) {
            formErrors.gender = "Field is Required"
        }
        if (!user.email) {
            formErrors.email = "Email is Required"
        }
        else if (!regex) {
            formErrors.email = "This is not a valid email format"
        }
        if (!user.password) {
            formErrors.password = "Password is Required"
        }
        else if (!user.password.match(upperCaseLetters)) {
            formErrors.password = "Password must contain upper case letters"
        }
        else if (!user.password.match(numbers)) {
            formErrors.password = "Password must contain numbers"
        }
        if (Object.keys(formErrors).length === 0) {
            setError({})
            return true
        }
        setError(formErrors);
        return false;
    }
    let signup = async () => {
        // console.log(user, " => user");
        if (signupvalidate()) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    const newuser = userCredential.user;
                    // ...
                    console.log(newuser, "-> newuser");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }
    return (
        <div className="left-two">
            <div className="login-inner">
                <div className="login-t">Sign Up</div>


                <div className="name-cont">
                    <div className="inp-rel half-inp-cont">
                        <input className='half-inp' value={user.fname} name="fname" onChange={handleChange} placeholder='First Name' />
                        {error.fname && <div className='error-p'>{error.fname}</div>}
                    </div>
                    <div className="inp-rel half-inp-cont">
                        <input className='half-inp' value={user.lname} name="lname" onChange={handleChange} placeholder='Last Name' />
                        {error.lname && <div className='error-p'>{error.lname}</div>}
                    </div>

                </div>
                <div className="phone-div inp-rel">
                    {error.phone && <div className="error-p phone-error">{error.phone}</div>}
                    <label id="number-label" htmlFor="number">
                        Phone Number :
                    </label>
                    <PhoneInput
                        country={"us"}
                        className="phone-input"
                        value={user.phone}
                        onChange={(phone) => { setUser({ ...user, phone }) }}
                    />
                </div>

                <div className="gender-option inp-rel">
                    {error.gender && <div className="error-p gender-err">{error.gender}</div>}
                    <span className='gender-name'> Gender :</span>
                    <div className="gender-cont" onClick={() => { setUser({ ...user, gender: "male" }) }} style={user.gender == "male" ? { border: "2px solid var(--primary-color)" } : {}}>

                        <Image src="/male.png" fill />

                    </div>
                    <div className="gender-cont" onClick={() => { setUser({ ...user, gender: "female" }) }} style={user.gender == "female" ? { border: "2px solid var(--primary-color)" } : {}}>
                        {/* <div className="gender-inner-cont"> */}
                        <Image src="/female.png" fill />
                        {/* </div> */}
                    </div>
                    <div className='gender-t'>
                        {user.gender == "male" && "Male"}
                        {user.gender == "female" && "Female"}
                    </div>
                </div>

                <div className='inp-rel'>
                    <input className="login-inp" value={user.email} name="email" onChange={handleChange} placeholder='Email' />
                    {error.email && <div className="error-p">{error.email}</div>}
                </div>
                <div className="pass-cont inp-rel">
                    <div className="eye-cont flex-all" onClick={() => { setVisisible(!visible) }}>
                        {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                    <input className="login-inp" type={visible ? "text" : "password"} value={user.password} name="password" onChange={handleChange} placeholder='Password' />
                    {error.password && <div className="error-p">{error.password}</div>}
                </div>
                <div className="login-btn flex-all signup-btn" onClick={signup}>Sign Up</div>
                <div className="not-up">Already a member? <span onClick={() => { setLogin(true) }}>Login</span></div>

            </div>
        </div>
    )
}

export default Signup