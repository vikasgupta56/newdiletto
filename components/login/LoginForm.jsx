import { getCookieParser } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { signInWithEmailAndPassword, auth } from "../firebase";
import { getIdToken } from 'firebase/auth';


const LoginForm = ({ setLogin }) => {

  const router = useRouter()

  const [visible, setVisisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [load,setLoad] = useState(false)

  let validate = () => {
    setEmailError("");
    setPasswordError("");
    if (email == "") {
      setEmailError("Email is required");
    }
    if (password == "") {
      setPasswordError("Password is required");
    }
    if (email == "" || password == "") {
      setLoad(false)
      return false; 
    }
    return true;
  }
  let loginUser = async () => {
    setLoad(true);
    if (validate()) {
      try {
        let user = await signInWithEmailAndPassword(auth, email, password);
        setError("")

        // let token = await getIdToken(user);
        // console.log(user,"op token");
        // let token = user.user.accessToken;
        // console.log(token);
        // const res = await fetch(`/api/getCookieURL`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(token),
        // })
        // console.log(res);
        // let a = res.json();
        // const { error } = await res.json();
        // const response = await fetch('/api/getCookieURL',{
        //   headers: new Headers({
        //     'Authorization': 'Bearer ' + token
        //   })
        // })
        // let a = await response;
        // console.log(response);
        // console.log(user.user.accessToken);
        // localStorage.setItem("token", user.user.accessToken)
        router.push('/')
        // document.cookie = `token=${user.user.accessToken}; expires=Thu, 18 Dec 2040 12:00:00 UTC";`;

        // console.log("Login successfuls");
      }
      catch (err) {
        if (err.code == "auth/user-not-found") {
          setError("No such user found. Please signup and try again");
        }
        if (err.code == "auth/wrong-password") {
          setError("Incorrect Password.")
        }
        setLoad(false)

        console.log(err);
      }
      // .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   console.log("logged in successfully");
      //   console.log(user, "user uis");
      //   // ...
      // })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log(errorCode, errorMessage);
      // });
    }
   
  }
  return (
    <div className="left-two">
      <div className="login-inner">
        <div className="login-t">Login</div>
        <div className='inp-rel'>
          <input className="login-inp" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="pass-cont inp-rel">
          <div className="eye-cont flex-all" onClick={() => { setVisisible(!visible) }}>
            {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
          <input className="login-inp" type={visible ? "text" : "password"} value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="login-btn flex-all" onClick={loginUser}>
          {load?
          <div className="login-load"></div>
          :"Login"}
          </div>
        {error && <div className='login-error'>{error}</div>}
        <div className="not-up">Not a member yet? <span onClick={() => { setLogin(false) }}>Sign up</span></div>
      </div>
    </div>
  )
}

export default LoginForm