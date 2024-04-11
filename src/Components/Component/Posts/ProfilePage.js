// import { useState } from "react";


import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Post from '../Posts/Post'

import { AiFillDownSquare } from 'react-icons/ai'

export default function Profile_Post() {
    
    const id = useParams()

    const [userProfile, setUserProfile] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userDate, setUserDate] = useState()
    const [userLocation, setUserLocation] = useState()
    const [userBIO, setUserBIO] = useState()

    const [posts, setPosts] = useState()
    useEffect(() => {
        axios.get(`https://json-server-cf7m1b42d-aakartits-projects.vercel.app/Customer/${parseInt(id.id)}`)
            .then(data => {
                setUserProfile(data.data.defaultPic)
                setUserName(data.data.UserName)
                setUserEmail(data.data.Email)
                setUserDate(data.data.now)
                setUserLocation(data.data.Location)
                setUserBIO(data.data.Bio)
            })

        axios.get('https://json-server-cf7m1b42d-aakartits-projects.vercel.app/Posts/')
            .then(data => setPosts(data.data.filter(f => f.UserId === parseInt(id.id))))

    }, [id])

    return (
        <>
            <div className='ProfilePageDiv1'>
                <div >
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        left: '5px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        
                        }}>
                        <AiFillDownSquare  style={{ color: 'darkcyan', fontSize: '2.5rem', filter: 'brightness(140%)'}}/>
                        <h1><Link to={'/'} style={{ color: 'darkcyan', fontSize: '2.5rem', filter: 'brightness(140%)'}} >ROI</Link></h1>
                    </div>
                    <div>
                        <a href={userProfile} target='_blank' rel='noreferrer'>
                            <img style={{ objectFit: 'cover' }} src={userProfile} alt={userName} />
                        </a>
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
                            <h4>{userLocation ? userLocation : 'Unkown'}</h4>
                        </div>
                        <div>
                            <h3>Member since</h3>
                            <h4>{userDate}</h4>
                        </div>
                    </div>
                    {userBIO && <p>{userBIO}</p>}
                </div>
            </div>

            <div className='ProfilePageDiv2 ProfilePage2' style={{ display: 'flex' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem 1rem',
                    justifyContent: 'center',
                    width: '50rem',
                }} 
                    className='ProfilePage2Div'>
                    <h2>{userName} posts</h2>
                    <div>
                        {posts &&  posts.length > 0 ? posts.map((e, i) => {
                            return (<Post id={e.id} title={e.postTitle} key={i} img={e.img} UserId={e.UserId} />)
                        }) : <p>Your post section is empty!</p>}
                    </div>
                </div>

            </div>
        </>
    )
}