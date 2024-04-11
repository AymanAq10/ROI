import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import WelcomePHeader from './WelcomeP_header'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { } from "react-icons/ai";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function WelcomeP_Profile_settings() {

  const logged = useSelector(state => state.logged)

  const userID = localStorage.getItem('userID')
  
  const [eyeStatus,          setEyeStatus]  = useState(true)

  const [userProfile,      setUserProfile]  = useState()
  const [newUserProfile,setNewUserProfile]  = useState()
  const [userName,            setUserName]  = useState()
  const [userEmail,          setUserEmail]  = useState()
  const [userPassword,    setUserPassword]  = useState()
  const [userGender,        setUserGender]  = useState()
  const [userBIO,              setUserBIO]  = useState()
  const [userLocation,    setUserLocation]  = useState()

  const [loading1,            setLoading1]  = useState(false)
  const [loading2,            setLoading2]  = useState(false)
  
    useEffect(() => {
      if (logged) {
        axios.get(`https://some-foods.onrender.com/Customer/${userID}`)
        .then(data => {
          const {UserName,defaultPic,Email,Password,Gender,Bio,Location} = data.data
          setUserProfile(defaultPic)
          setUserName(UserName)
          setUserEmail(Email)
          setUserPassword(Password)
          setUserGender(Gender)
          setUserBIO(Bio)
          setUserLocation(Location)
         })
       }
    }, [logged, userID])


    const eyeClicked = () => {
      setEyeStatus(!eyeStatus)
  }


  const image = useRef()
  const ChooseImage = () => {
    image.current.click()
  }

  const ImageChanged = (e) => {
      const file = e.target.files[0]
      if (file.size > 200_000) {
        toast.warn("File size must be less than 200KB!", {
          autoClose: 2000,
        });
        e.target.value = ''
      }
      else{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setNewUserProfile(reader.result)
        }
      }
  }

  const [length, setLength] = useState(0)
  function BioCharacterLenght(e) {
    setLength(e.target.value.length)
  }


  function Radio_Div_clicked(e) {
    const ele = e.target.tagName.toLowerCase()
    if (ele === 'label' || ele === 'div' || ele === 'input') {
      const inputELE = e.currentTarget.querySelector('input[type=radio]')
          inputELE.click();
       }
  }



  const radioDivRef = useRef()
  useEffect(() => {
    if (radioDivRef.current) {
      const radioInputs = radioDivRef.current.querySelectorAll("input[type='radio']");
      for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].value === userGender) {
          radioInputs[i].click();
          break;
        }
      }
    }
  }, [userGender]);


  const Avatar_Form1_submit = async (e) => {
    e.preventDefault()

    const formData      = new FormData(e.target)

    const UserName      = formData.get('UserName')
    const Email         = formData.get('Email')
    const defaultPic    = newUserProfile ? newUserProfile : userProfile
    const Location      = formData.get('Location')
    const Bio           = formData.get('Bio')
    const Gender        = formData.get('Gender')

    try{
      await axios.patch(`https://some-foods.onrender.com/Customer/${userID}`, {UserName, Email, defaultPic, Location, Bio, Gender})
      toast.success(`Profile Info Updated Successfully!`,{autoClose:1000})
      setLoading1(true)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
    catch(error){
      console.error(error);
    }

  }
  
  const Avatar_Form2_submit = async (e) => {
    e.preventDefault()
    const formData    = new FormData(e.target)
    
    const OldPassword     = formData.get('OldPassword')
    const Password        = formData.get('NewPassword')
    const ConformPassword = formData.get('ConformPassword')

    try{
      if (OldPassword === userPassword && Password === ConformPassword && Password.length >= 8) {
        axios.patch(`https://some-foods.onrender.com/Customer/${userID}`, {Password})
        toast.success('Password Updated Successfully!',{autoClose:1000})
        setLoading2(true)
        setTimeout(() => {
          localStorage.clear()
          window.location.pathname = '/'
        }, 1000);
      }
      if(OldPassword !== userPassword) {
        toast.warn('Old Password was incorrect!',{autoClose:1000})
      }
      if(Password.length >= 8 && Password !== ConformPassword){
        toast.warn('New Password doesn\'t match the Confirm Password!',{autoClose:1000})
      }
      if (Password.length < 8) {
        toast.error("Password should contain 8 characters minimum!");
      }
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <>
        <WelcomePHeader />
        <form className='Avatar_Form' onSubmit={Avatar_Form1_submit}>

              <div className='Avatar_Form_div1'>

                <div>
                  <h3 >Profile Picture</h3>
                  <p>You can upload your avatar here </p>
                </div>

                <div>
                    <div>
                      <a href={newUserProfile ? newUserProfile : userProfile} target='_blank' rel="noreferrer" alt={userName}>
                        <img style={{ objectFit: 'cover' }} src={newUserProfile ? newUserProfile : userProfile} alt={userName} />
                      </a>
                    </div>
                    
                    <h5>Upload new avatar</h5>
                    <label htmlFor='picture' onClick={ChooseImage}>Choose file...</label>
                    <input 
                    ref={image} 
                    type='file' 
                    accept='image/*'
                    onChange={ImageChanged}
                    />
                    <p>The maximum file size allowed is 200KB.</p>
                </div>

              </div>
              
              <div className='Avatar_Form_div2'>

                    <div>
                      <h3 >Main Settings</h3>
                      <p>This information will appear on your profile. </p>
                    </div>

                    <div>
                      <label htmlFor='UserName'>User Name</label>
                      <input type='text' name='UserName' defaultValue={userName} maxLength={50} required/>
                      <label htmlFor='Email'>Email</label>
                      <input type='email' name='Email' defaultValue={userEmail} maxLength={254} required/>
                      <label htmlFor='Location'>Location</label>
                      <input type='text' name='Location' defaultValue={userLocation} placeholder='Country, City' maxLength={60}/>
                      <label htmlFor='Bio'>Bio</label>
                      <textarea name='Bio' defaultValue={userBIO} maxLength={500} onChange={BioCharacterLenght}>
                        
                      </textarea>
                      <p>{length}/500</p>
                      <label htmlFor='Gender'>Gender</label>
                      <div className='Avatar_Form_div2_radio_div' ref={radioDivRef} >
                        <div onClick={Radio_Div_clicked}>
                          <label>Prefer not to say</label>
                          <input type='radio' name='Gender' value={'nan'} />
                        </div>
                        <div onClick={Radio_Div_clicked}>
                          <label>Male</label>
                          <input type='radio' name='Gender' value={'Male'} />
                        </div>
                        <div onClick={Radio_Div_clicked}>
                          <label>Female</label>
                          <input type='radio' name='Gender' value={'Female'} />
                        </div>
                      </div>
                      <button type='submit' >{loading1 === true ? <i className='loadingIcon' ></i> : 'Save Changes'}</button>
                      




                    </div>

              </div>

        </form>

        <form  className='Avatar_Form' onSubmit={Avatar_Form2_submit}>
                  <div className='Avatar_Form_div3'>
                      <div>
                        <h3 >Password</h3>
                        <p>After a successful password update, you will be redirected to the login page where you can log in with your new password. </p>
                      </div>
                      <div>
                        <label htmlFor='OldPassword'>Old Password</label>
                        <div className='WelcomeP_dev_login_signUp_password_eye'>
                            <input type={eyeStatus ? 'password' : 'text'} name='OldPassword' required/>
                            <span onClick={eyeClicked}>{eyeStatus ? <AiOutlineEye/> : <AiOutlineEyeInvisible />}</span>
                        </div>
                        <label htmlFor='NewPassword'>New Password</label>
                        <input type='password' name='NewPassword' required/>
                        <label htmlFor='ConformPassword'>Conform Password</label>
                        <input type='password' name='ConformPassword' required/>
                        <button type='submit' >{loading2 === true ? <i className='loadingIcon' ></i> : 'Update Password'}</button>

                      </div>
                  </div>
        </form>













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
