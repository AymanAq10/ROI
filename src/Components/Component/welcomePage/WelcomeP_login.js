import React from 'react'

import { AiFillDownSquare, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiX } from "react-icons/bi";

export default function WelcomeP_login(props) {
  return (
        <div ref={props.WelcomeP_dev_login} >
            <form onSubmit={props.Login_Form}>
                <div>
                    <div>
                        <AiFillDownSquare />
                        <h4>Welcome to ROI</h4>
                    </div>
                    <i onClick={props.CreatePostCheck}>
                        <BiX />
                    </i>
                </div>
                <label htmlFor={'Email'}>Email</label>
                <input type='email' name='Email' required maxLength={254}/>
                <label htmlFor={'Password'}>Password</label>
                <div className='WelcomeP_dev_login_signUp_password_eye'>
                    <input type={props.eyeStatus ? 'password' : 'text'} name='Password' required/>
                    <span onClick={props.eyeClicked}>{props.seyeStatus ? <AiOutlineEye/> : <AiOutlineEyeInvisible />}</span>
                </div>
                <button type='submit' >Log in</button>
                <button onClick={props.Login_Signup_Switcher} type='button'>Not a memeber? <br/> Sign up!</button>
            </form>
        </div>
  )
}
