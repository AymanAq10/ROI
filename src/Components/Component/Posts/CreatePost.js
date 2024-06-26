import { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import Footer from "../Footer";
import WelcomePHeader from '../welcomePage/WelcomeP_header'
import '../welcomePage/WelcomeP.css'
import imageCompression from 'browser-image-compression'; // Import image compression library


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineCloudUpload } from "react-icons/ai";


const CreatePost = () => {
    
    const navigate = useNavigate()

    const [length, setLength] = useState(0)
    const imageHolder        = useRef()
    const spanImageHolder    = useRef()
    const [imageHolderChanged, setImageHolderChanged] = useState()
    

    function BioCharacterLenght(e) {
      setLength(e.target.value.length)
    }

    const submitfunc = async (e) => {
        e.preventDefault();
        const formData          = new FormData(e.target)
        const title             = formData.get('title')
        const body              = formData.get('body')
        const img               = imageHolderChanged
        const UserId            = parseInt(localStorage.getItem('userID')   )
        const usersWhoLikedIt   = []
        const commentSection    = []
        try{
            await axios.post('https://some-foods.onrender.com/Posts', {title, body, UserId, usersWhoLikedIt, commentSection, img})
            toast.success("Post was added successfully!", {
                autoClose: 500,
              });
              console.log(imageHolderChanged);
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



    const handleImageDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.size > 2e+7) {
            toast.warn("File size must be less than 20MB!", { autoClose: 2000 });
            e.target.value = '';
            return;
        }
    
        const extension = file.name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            toast.warn('Not an image or gif');
            e.target.value = '';
            console.log('ey');
            return;
        }
    
        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            });
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = async() => {
                const blob = await fetch(reader.result).then((res) => res.blob());
                const imageUrl = URL.createObjectURL(blob);
                setImageHolderChanged(imageUrl);
            };
        } catch (error) {
            console.error('Image compression error:', error);
        }
    };
    
      
      

    // Image Click Function START=================================================
    const handleImageClick = (e) => {
        imageHolder.current.click()
    }
    
    const ImageChanged =async (e) => {
        const file = e.target.files[0]
        if (file.size > 2e+7) {
            toast.warn("File size must be less than 20MB!", {
                autoClose: 2000,
              });
              e.target.value = ''
        }
        else{
            // Assuming 'file' is the input file from an <input type="file"> element
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                });
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = async() => {
                    const blob = await fetch(reader.result).then((res) => res.blob());
                    const imageUrl = URL.createObjectURL(blob);
                    console.log(imageUrl);
                    setImageHolderChanged(imageUrl);
                };
            } catch (error) {
                console.error('Image compression error:', error);
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
                        <input ref={imageHolder} type="file" accept='image/*, image/gif' name="img" onChange={ImageChanged} />
                    </div>

                    <div>
                        <label>Post title :</label>
                        <input type="text" required name="title" maxLength={30} />
                        <label>Tell everyone what's your post about :</label>
                        <textarea required rows={"10"} name="body" maxLength={500} onChange={BioCharacterLenght}></textarea>
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
export default CreatePost;