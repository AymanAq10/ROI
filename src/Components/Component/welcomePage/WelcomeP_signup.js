import React from 'react'

import { AiFillDownSquare, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiX } from "react-icons/bi";


export default function WelcomeP_signup(props) {
  return (
    <div ref={props.WelcomeP_dev_signup} >

    <form onSubmit={props.Signup_Form}>
        <div>
            <div>
                <AiFillDownSquare />
                <h4>Welcome to ROI</h4>
            </div>
            <i onClick={props.CreatePostCheck}> <BiX/> </i>
        </div>

        <label htmlFor={'UserName'} >User Name</label>
        <input type='text' name='UserName' maxLength={50} required/>
        <label htmlFor={'Email'}>Email</label>
        <input type='email' name='Email' maxLength={254} required/>
        <label htmlFor={'Password'}>Password</label>
        <div className='WelcomeP_dev_login_signUp_password_eye'>
            <input type={props.eyeStatus ? 'password' : 'text'} name='Password' required />
            <span onClick={props.eyeClicked}>{props.eyeStatus ? <AiOutlineEye/> : <AiOutlineEyeInvisible />}</span>
        </div>
        <label htmlFor={'chkPassword'}>Conform Password</label>
        <input type={props.eyeStatus ? 'password' : 'text'} name='chkPassword' required/>

        <button type='submit'>Sign up</button>
        <button onClick={props.Login_Signup_Switcher} type='button'>Already a memeber? <br/> Log in!</button>
    </form>
    
</div>
  )
}
