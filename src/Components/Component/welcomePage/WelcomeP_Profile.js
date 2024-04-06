import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { themeSwitcher } from '../../redux_setting/actions';

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { AiFillSetting } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
export default function WelcomeP_Profile() {
    const logged = useSelector(state => state.logged)

    const userID = localStorage.getItem('userID')

    const [userProfile,setUserProfile] = useState()
    const [userName,setUserName] = useState()
    useEffect(() => {
        if (logged) {
            axios.get(`https://json-s-two.vercel.app/Customer/${userID}`)
            .then(data => {
              setUserProfile(data.data.defaultPic)
              setUserName(data.data.UserName)
             })
           }
    }, [logged, userID])

    //  STYLING START=====================================================================
    const userProfileDiv = useRef()
    const userProfileDivDiv = useRef()
    
    const imgClicked = () => {
        if (userProfileDiv.current.style.display === 'block') {
            userProfileDiv.current.style.display = 'none'
            // userProfileDiv.current.style.transform = 'translate(-24%, 65%) scale(0.9)'
        }
        else{
            userProfileDiv.current.style.display = 'block'
            setTimeout(() => {
                userProfileDiv.current.style.transform = 'translate(-24%, 65%) scale(1)'
            }, 1);
        }
    }
    
    const body = document.body
    const image = useRef()
    body.onclick = (e) => {


        if (image.current && e.target !== image.current) {
            document.getElementsByClassName('userProfileDiv')[0].style.display="none" 
        }
    }

    const navigate = useNavigate()
    const ProfilePageNavigator = () => {
        navigate('/Profile/Tab=Your_ROI_Information')
    }

    const globalStateTheme = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const ModeSwitcher = () => {
        if (localStorage.getItem('mode') === 'dark') {
            localStorage.setItem('mode', 'light')
        }
        else{
            localStorage.setItem('mode', 'dark')

        }
        dispatch(themeSwitcher())
    }

    //  STYLING END  =====================================================================
  return (
            <span>
                <img style={{ objectFit: 'cover' }} ref={image} className='userProfilePic' src={userProfile} alt={userName} onClick={imgClicked}/>
                <div className='userProfileDiv' ref={userProfileDiv}>
                    <div ref={userProfileDivDiv}>
                        <div onClick={ProfilePageNavigator}>
                            <img style={{ objectFit: 'cover' }} className='userProfilePic' src={userProfile} alt={userName}/>
                            <h3>{userName}</h3>
                        </div>
                        <Link className='LinkButton' to={`/Settings/Tab=Your_ROI_Information/`} ><div style={{display:' flex',alignItems:' center',justifyContent: 'space-between',fontSize: '12px'}}><>Settings</><AiFillSetting className='Setting-icon' /> </div></Link>
                        <button onClick={()=>{
                            localStorage.clear()
                            window.location.pathname='/'
                        }}><div style={{display:' flex',alignItems:' center',justifyContent: 'space-between',fontSize: '12px'}}><>Logout</><AiOutlineLogout className='Setting-icon'/></div></button>
                        <div onClick={ModeSwitcher}>
                            {globalStateTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
                        </div>
                    </div>
                </div>
                <button>
                    <Link style={{ color: 'white' }} to="/Create" >New Post</Link>
                </button>
            </span>
  )
}
