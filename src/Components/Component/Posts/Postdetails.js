import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useDispatch,useSelector } from 'react-redux';

import WelcomePHeader from '../welcomePage/WelcomeP_header'
import '../welcomePage/WelcomeP.css'
import Comments from "./Comments";
import '../welcomePage/WelcomeP.css'
import { Login } from "../../redux_setting/actions";
import WelcomePLogin from '../welcomePage/WelcomeP_login';
import WelcomePSignup from '../welcomePage/WelcomeP_signup';

import axios from "axios";
import { Link } from "react-router-dom";

import React from 'react'
import defaultPic from '../../../Images/Default Profile Pic.jpg'




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Postdetails = () => {


    const { id } = useParams()
    const userID = parseInt(localStorage.getItem('userID'))
    const [posts, setposts] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [errMsg, seterrMsg] = useState(null);
    const [UserName, setUsername] = useState(null)
    const [img, setImg] = useState(null)

    const post_IMG = useRef()
    const post_IMG_HIDDEN = useRef()
    const post_IMG_DEV_HIDDEN = useRef()


    useEffect(() => {
        setisloading(true);
        seterrMsg(null);
        fetch(`http://localhost:5000/Posts/${parseInt(id)}`)
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText ? res.statusText : "error");
                }
                return res.json();
            })
            .then((data) => {
                setisloading(false);
                setposts(data);
            })
            .catch((err) => {
                setisloading(false);
                seterrMsg(err.message);
            });

    }, [id]);

    useEffect(() => {
        if (posts) {
            axios.get(`http://localhost:5000/Customer/${parseInt(posts.UserId)}`)
                .then((d) => {
                    let { defaultPic, UserName } = d.data
                    setImg(defaultPic)
                    setUsername(UserName)
                })
        }
    }, [posts])

    const post_IMG_ENTER = () => {
        post_IMG.current.style.filter = 'blur(1px) brightness(75%)'
    }

    const post_IMG_LEAVE = () => {
        post_IMG.current.style.filter = 'none'

    }



    // const post_IMG_VISIBILITY_OFF_CLICKED = (e) => {

    //     if (post_IMG_HIDDEN.current !== e.target) {
    //         post_IMG_DEV_HIDDEN.current.style.display = 'none'
    //         post_IMG_HIDDEN.current.style.opacity = '0'
    //     }

    // }


// ADDED CODE FOR LOGIN FROM FAR AWAY START=======================================================================

const [eyeStatus, setEyeStatus] = useState(true)

const WelcomeP_dev_login_signUp_btn = useRef()
const WelcomeP_dev_login  = useRef()
const WelcomeP_dev_signup = useRef()

const dispatch = useDispatch()
const logged = useSelector(state=>state.logged)

const CreatePostCheck = (e) => {
    if (e.target.tagName === 'BUTTON') {

        WelcomeP_dev_signup.current.style = 'none'
        WelcomeP_dev_signup.current.style.transform          = 'translate(-50%, -50%) scale(0.8)'

        WelcomeP_dev_login_signUp_btn.current.style.display  = 'block'
        setTimeout(() => {
        WelcomeP_dev_login.current.style.transform           = 'translate(-50%, -50%) scale(1)'
        }, 1)
    }

    if (e.target.tagName === 'svg' || e.target.tagName === 'path' ) {
        WelcomeP_dev_login.current.style.transform  = 'translate(-50%, -50%) scale(0.8)'
        WelcomeP_dev_signup.current.style.transform = 'translate(-50%, -50%) scale(0.8)'
        setTimeout(() => {
        WelcomeP_dev_login_signUp_btn.current.style.display  = 'none'

        WelcomeP_dev_login.current.style  = 'none'
        WelcomeP_dev_signup.current.style = 'none'

        }, 100)
        
    }
    
}

const eyeClicked = () => {
    setEyeStatus(!eyeStatus)
}

const Login_Signup_Switcher = () => {
    console.log('switch');
    if (WelcomeP_dev_login.current.style.display === 'none') {

        WelcomeP_dev_login.current.style.display    = 'flex'
        WelcomeP_dev_login.current.style.transform  = 'translate(-50%, -50%) scale(1)'

        WelcomeP_dev_signup.current.style.display   = 'none'
        WelcomeP_dev_signup.current.style.transform = 'translate(-50%, -50%) scale(0.8)'

    }
    else{

        WelcomeP_dev_login.current.style.display    = 'none'
        WelcomeP_dev_login.current.style.transform  = 'translate(-50%, -50%) scale(0.8)'

        WelcomeP_dev_signup.current.style.display   = 'flex'
        WelcomeP_dev_signup.current.style.transform = 'translate(-50%, -50%) scale(1)'

    }
}



const Login_Form = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get('Email')
    const password = formData.get('Password')

    try{
        const data = await axios.get('http://localhost:5000/Customer')
        
                const customer          = data.data.find(f => f.Email === email && f.Password === password)
                const customer_email    = data.data.find(f => f.Email === email )
                const customer_password = data.data.find(f => f.Password === password)
                if (!customer) {
                    if (!customer_email) {
                        toast.warn("email not found")
                    }
                    else{
                        if (!customer_password) {
                            toast.error("password Incorrect")
                        }
                    }
                }
                else{
                    localStorage.setItem('state',logged)
                    localStorage.setItem('userID',customer.id)
                    dispatch(Login())
                }
    }
    catch(error){console.error(error)}
        
}


const Signup_Form = async (e) => {
    e.preventDefault();
  
    const formData2 = new FormData(e.target);
  
    const UserName      = formData2.get("UserName");
    const Email         = formData2.get("Email");
    const Password      = formData2.get("Password");
    const chkPassword   = formData2.get("chkPassword");
    const Gender        = 'nan'
    let now  = new Date()
    const dayOfWeek = (date) => date.toLocaleDateString('en-US', {
        dateStyle: 'long'
    })
    now = dayOfWeek(now)

    try {
        if (Password === chkPassword && Password.length >= 8) {
            const response = await axios.get("http://localhost:5000/Customer");
            const customer = response.data.find((f) => f.Email === Email);
            if (customer) {
              toast.info("Someone already has this email address!", {
                autoClose: 2000,
              });
            }
        else {
                const data = await axios.post("http://localhost:5000/Customer", {
                      UserName,
                      Email,
                      Password,
                      defaultPic,
                      Gender,
                      now
                    })
                    
                    toast.success("Welcome to ROI!", {autoClose: 2000});
                    localStorage.setItem('state',logged)
                    localStorage.setItem('userID',data.data.id)
                    localStorage.setItem('mode', 'dark')
                    dispatch(Login())
                
            }
        }
        if (Password.length <= 7) {
          toast.error("Password should contain 8 characters minimum!");
        }
        if (Password.length > 7 && Password !== chkPassword){
          toast.error("Password does not match!");
        }
    } catch (error) {console.error(error);}
  };
// ADDED CODE FOR LOGIN FROM FAR AWAY END  =======================================================================


    return (<>
            {!logged && <div className='WelcomeP_dev_login_signUp' ref={WelcomeP_dev_login_signUp_btn} >
                <WelcomePLogin 
                    WelcomeP_dev_login={WelcomeP_dev_login} 
                    Login_Form={Login_Form} 
                    CreatePostCheck={CreatePostCheck}
                    eyeStatus={eyeStatus}
                    eyeClicked={eyeClicked}
                    Login_Signup_Switcher={Login_Signup_Switcher}
                />
            {/* =====================================================SIGNUP======================================================== */}
               <WelcomePSignup 
                    WelcomeP_dev_signup={WelcomeP_dev_signup}
                    Signup_Form={Signup_Form}
                    CreatePostCheck={CreatePostCheck}
                    eyeStatus={eyeStatus}
                    eyeClicked={eyeClicked}
                    Login_Signup_Switcher={Login_Signup_Switcher}
               />
            </div>
            }
        <WelcomePHeader  CreatePostCheck={CreatePostCheck}/>
        {posts &&
            <article style={{ height: '100vh' }} className="container post-details">
                <div className="post-details-title">
                    <div className="div_profile" >
                        <Link style={{ display: 'flex', alignItems: 'center', gap: ' 1rem', }} to={`/Post/Profile/${posts.UserId}`}>
                            <img className="userProfilePic" src={img} alt="not found" />
                        </Link>
                        <h3>{UserName}</h3>
                    </div>
                </div>
                <div style={{ marginBottom: '-4px' }} className="post-details-dev-img" onMouseEnter={post_IMG_ENTER} onMouseLeave={post_IMG_LEAVE} ></div>

                <div className="post-details-dev-img" onMouseEnter={post_IMG_ENTER} onMouseLeave={post_IMG_LEAVE} >
                    <a href={posts.img} target="_blank" rel='noreferrer'>
                        {/* {console.log(posts.img)} */}
                        <img
                            src={posts.img}
                            alt=""
                            className="post-details-img"
                            ref={post_IMG}
                  
                            style={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', margin: '-6px 0pc' }}
                        />
                    </a>
                </div>
                {/* <div className="post-details-dev-img-hidden" ref={post_IMG_DEV_HIDDEN} onClick={post_IMG_VISIBILITY_OFF_CLICKED}>
                    <div>
                        <button onClick={post_IMG_VISIBILITY_OFF_CLICKED}><AiFillCaretDown /></button>
                        <img
                            src={posts.img}
                            alt=""
                            className="post-details-img-hidden"
                            ref={post_IMG_HIDDEN}
                        />
                    </div>
                </div> */}
                <div style={{overflowY:'auto'}} className="post_text">

                    <h3 style={{ color: '#000' }}>
                        {posts.title}
                    </h3>
                    <p style={{ color: '#000', wordBreak: 'break-all' }} className="post-details-body">
                        {posts.body}
                    </p>
                </div>
                <Comments id={parseInt(id)} img={img} post={posts} userID={userID}/>
            </article>
        }
        {isloading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading ...</div>}
        {!posts && !isloading && !errMsg && <div>No data</div>}
        {errMsg && !isloading && <div>{errMsg}</div>}

        <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            limit={2}
        />
    </>
    )
}
export default Postdetails;
