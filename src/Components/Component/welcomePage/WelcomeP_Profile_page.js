import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import WelcomePHeader from './WelcomeP_header'
import './WelcomeP.css'
import Post from '../Posts/Post'

import { BiPencil } from "react-icons/bi";

export default function WelcomeP_Profile_page() {
    const navigate  = useNavigate()
    const logged    = useSelector(state => state.logged)
    const userID    = localStorage.getItem('userID')

    const [userProfile,       setUserProfile] = useState()
    const [userName,             setUserName] = useState()
    const [userEmail,           setUserEmail] = useState()
    const [userDate,             setUserDate] = useState()
    const [userLocation,     setUserLocation] = useState()
    const [userBIO,     setUserBIO] = useState()

    const [posts,           setPosts] = useState()
    const [likedPosts, setLikedPosts] = useState()
    useEffect(() => {
        if (logged) {
             axios.get(`http://localhost:3002/Customer/${userID}`)
            .then(data => {
              setUserProfile(data.data.defaultPic)
              setUserName(data.data.UserName)
              setUserEmail(data.data.Email)
              setUserDate(data.data.now)
              setUserLocation(data.data.Location)
              setUserBIO(data.data.Bio)
             })
             
             axios.get('http://localhost:3002/Posts/')
             .then(data => {
                console.log(data)
                setPosts(data.data.reverse().filter(f => f.UserId == parseInt(localStorage.getItem('userID')) ))
                setLikedPosts(data.data.filter(f => f.usersWhoLikedIt.find(uf => uf === parseInt(localStorage.getItem('userID'))) ))
             })
           }
    }, [logged, userID])

    
    const navigateToSettings = () => {
        navigate('/Settings/Tab=Your_ROI_Information/')
    }

  return (
    <>
        <WelcomePHeader />
        <div className='ProfilePageDiv1'>
            <div>
                <div>
                    <a href={userProfile} target='_blank' rel='noreferrer'>
                        <img style={{ objectFit: 'cover' }} src={userProfile} alt={userName}/>
                    </a>
                    <BiPencil className='ProfilePen' onClick={navigateToSettings}/>
                </div>
            </div>
            <div>
                <h2>{userName}</h2>
                <div>
                    
                    <div>
                        <h3>Mail:</h3>
                        <h4>{userEmail}</h4>
                    </div>
                    <div>
                        <h3>location:</h3>
                        <h4>{userLocation ?  userLocation: 'Unkown'}</h4>
                    </div>
                    <div>
                        <h3>Member since</h3>
                        <h4>{userDate}</h4>
                    </div>
                </div>
                {userBIO && <p>{userBIO}</p>}
            </div>
        </div>

        <div className='ProfilePageDiv2'>
                <div>
                    <h2>Your posts</h2>
                    <div>
                        {posts && posts.length > 0 ? posts.map((e, i) => {
                            return( <Post id={e.id} title={e.title} key={i} img={e.img} UserId={e.UserId} userPost={true}/>)
                        }) : <p>Your post section is empty!</p>}
                    </div>
                </div>
                <div>
                    <h2>Liked posts</h2>
                    <div>
                        {likedPosts && likedPosts.length > 0 ? likedPosts.map((e, i) => {
                            return( <Post id={e.id} title={e.postTitle} key={i} img={e.img} UserId={e.UserId} />)
                        }) : <p>You didn't like any post!</p>}
                    </div>
                </div>
        </div>
    </>
  )
}
