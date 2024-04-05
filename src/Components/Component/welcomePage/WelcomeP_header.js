import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import WelcomePProfile from './WelcomeP_Profile';
import './WelcomeP.css'

import { AiFillDownSquare} from "react-icons/ai";

export default function WelcomeP_header(props) {
  const logged = useSelector(state => state.logged)
  
  return (
    <header className='WelcomeP_Header'>
            <nav>
                <div>
                    <AiFillDownSquare />
                    
                      <h1><Link to={'/'}>ROI</Link></h1>
                      
                </div>
               {!logged && <button onClick={props.CreatePostCheck}>Create Post</button>}
               {logged && <WelcomePProfile  /> }
            </nav>
            {props.title && <div>
                              <h1>{props.title} </h1>
                            </div>}
    </header>
  )
}
