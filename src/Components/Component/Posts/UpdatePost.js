import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// import Footer from "../Footer";
import WelcomePHeader from '../welcomePage/WelcomeP_header'
import '../welcomePage/WelcomeP.css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineCloudUpload } from "react-icons/ai";


const UpdatePost = () => {
    const id = useParams()
    const [title, setTitle] = useState()
    const [Bio, setBio] = useState()
    // Axios for Update START

    useEffect(() => {
        const FetchPost = async () => {
            try{
                const data = await axios.get(`http://localhost:5000/Posts/${id.id}`)
                console.log(data.data);
                setImageHolderChanged(data.data.img)
                setTitle(data.data.title)
                setBio(data.data.body)
                setLength(data.data.body.length)
                imageHolder.current.value = data.data.img
            }
            catch(err){
                console.log(err);
            }
        }
        FetchPost()
    },[id.id])

    // Axios for Update END  



    const navigate = useNavigate()

    const [length, setLength] = useState(0)
    const imageHolder        = useRef()
    const spanImageHolder    = useRef()
    

    function BioCharacterLenght(e) {
      setLength(e.target.value.length)
    }

    const submitfunc = async (e) => {
        e.preventDefault();
        const formData          = new FormData(e.target)
        const title             = formData.get('title')
        const body              = formData.get('body')
        const img               = imageHolderChanged
        try{
            await axios.patch(`http://localhost:5000/Posts/${id.id}`, {title, body, img})
            toast.success("Post was modified successfully!", {
                autoClose: 500,
              });
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }
        catch(err){
            console.log(err);
        }
    }


    // for styling drop img START
    const handleImageDragged = (e) => {
        e.preventDefault()
    }

    const ImagedEnteredTheDragZone = (e) => {
        e.preventDefault()
        if (   e.target === spanImageHolder.current 
            || e.target === spanImageHolder.current.children[0] 
            || e.target === spanImageHolder.current.children[0].children[0]
            || e.target === spanImageHolder.current.children[0].children[1]
            || e.target === spanImageHolder.current.children[0].children[2]
            ) {
            spanImageHolder.current.style.border = "3px solid #008b8b"
        }
        else{
            spanImageHolder.current.style.border = "3px dotted #222528"
            
        }
    }
    // for styling drop img END


    const [imageHolderChanged, setImageHolderChanged] = useState()

    const handleImageDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file.size > 2e+7 ) {
            toast.warn("File size must be less than 20MB!", {
                autoClose: 2000,
              });
              e.target.value = ''
        }
        if(!file.type.includes("image")) {
            toast.warn('Not an image')
            e.target.value = ''
        }
        if (file.size <= 2e+7 && file.type.includes("image")) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImageHolderChanged(reader.result)
            }
        }
    }

    // Image Click Function START=================================================
    const handleImageClick = () => {
        imageHolder.current.click()
    }
    
    const ImageChanged = (e) => {
        const file = e.target.files[0]
        if (file.size > 2e+7) {
            toast.warn("File size must be less than 20MB!", {
                autoClose: 2000,
              });
              e.target.value = ''
        }
        else{
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImageHolderChanged(reader.result)
            }
        }
    }
    // Image Click Function END  =================================================

    return (
        <>
        <WelcomePHeader />

            <section className="create-post">
                <form onSubmit={submitfunc}>

                    <div onDragEnter={ImagedEnteredTheDragZone} onDragOver={handleImageDragged} onDrop={handleImageDrop} onClick={handleImageClick}>
                        <span ref={spanImageHolder}>
                            {imageHolderChanged ? <img  src={imageHolderChanged} alt={imageHolderChanged}/> :
                            <div >
                                <AiOutlineCloudUpload className='uploadIcon' />  
                                <p>Upload Photo here</p>
                                <p>The maximum file size allowed is 20MB.</p>
                            </div> }
                        </span>
                        <input ref={imageHolder} type="file" accept='image/*' name="img" onChange={ImageChanged} />
                    </div>

                    <div>
                        <label>Post title :</label>
                        <input type="text" required name="title" defaultValue={title}/>
                        <label>Tell everyone what's your post about :</label>
                        <textarea required rows={"10"} name="body" maxLength={500} onChange={BioCharacterLenght} defaultValue={Bio}></textarea>
                        <p>{length}/500</p>
                    </div>

                    <button className="btn" type="submit">Save</button>
                </form>
            </section>
            {/* <Footer/> */}

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
export default UpdatePost;