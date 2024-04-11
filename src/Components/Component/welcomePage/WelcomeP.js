import React from 'react'
import defaultPic from '../../../Images/Default Profile Pic.jpg'
import { useState, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios'

import './WelcomeP.css'
import WelcomePHeader from './WelcomeP_header';
import { Login } from '../../redux_setting/actions';
import Posts from '../Posts/Posts';
import PostsPagination from './PostsPagination'
import WelcomePLogin from './WelcomeP_login';
import WelcomePSignup from './WelcomeP_signup';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WelcomeP() {
    // DESIGN START ======================================================================================
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

    // DESIGN END ========================================================================================


    const Login_Form = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const email = formData.get('Email')
        const password = formData.get('Password')
    
        try{
            const data = await axios.get('https://some-foods.onrender.com/Customer')
            
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
                const response = await axios.get("https://some-foods.onrender.com/Customer");
                const customer = response.data.find((f) => f.Email === Email);
                if (customer) {
                  toast.info("Someone already has this email address!", {
                    autoClose: 2000,
                  });
                }
            else {
                    const data = await axios.post("https://some-foods.onrender.com/Customer", {
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
      


    //   PAGINATION SECTION START

    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 6
    const [totalPosts,   setTotalPosts] = useState();

    const totalPostsChecker = async () => {
        const data = await axios.get('https://some-foods.onrender.com/Posts')
        setTotalPosts(data.data.length);
    }
    totalPostsChecker()
    //   PAGINATION SECTION END  
    

  return (
        <div className='WelcomeP_dev'>

            {/* ==================================================LOGIN=========================================================== */}
            {/* <div className='WelcomeP_dev_login_signUp' ref={WelcomeP_dev_login_signUp_btn} onClick={Login_Signup_visibility} > */}
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
            {/* ============================================================================================================= */}

        <WelcomePHeader title={'Share Your Visual Stories'} CreatePostCheck={CreatePostCheck}/>

        <section style={{padding:'15vh 3vh', }}>
            <Posts currentPage={currentPage} postPerPage={postPerPage} />
            <PostsPagination totalPosts={totalPosts} currentPage={currentPage} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} />
        </section>

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
    </div>
  )
}