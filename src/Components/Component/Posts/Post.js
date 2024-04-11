import { Link } from "react-router-dom";
import { saveAs } from 'file-saver'
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = (props) => {

    const [imgg,          setImg]       = useState('')
    const [Username, setUsername]       = useState('')
    const [islike,       setLike]       = useState(false);
    const [usersLikes, setUsersLikes]   = useState()

    const logged = useSelector(state => state.logged)
    const userID = parseInt(localStorage.getItem('userID'))

    const likee = useRef()


    function downloadimg() {
        saveAs(props.img, `${props.title}.png`)
    }


    useEffect(()=>{

            axios.get(`https://some-foods.onrender.com/Customer/${parseInt(props.UserId)}`)
            .then(data=>{
                setImg(data.data.defaultPic);
                setUsername(data.data.UserName)
            })
            axios.get(`https://some-foods.onrender.com/Posts/${props.id}`)
            .then(data => {
                data.data.usersWhoLikedIt.filter(f => f === userID).length !== 0 ? setLike(true) : setLike(false)
                setUsersLikes(data.data.usersWhoLikedIt.length)
            })

    }, [userID, props.id, props.UserId])

    const WriteYourWayIntoThey_reHeart = async () => {

        if(logged){
            const data = await axios.get(`https://some-foods.onrender.com/Posts/${props.id}`)
            let usersWhoLikedIt = [...data.data.usersWhoLikedIt];

            if (data.data.usersWhoLikedIt.find(f => f === userID)) {
                usersWhoLikedIt = usersWhoLikedIt.filter(f => f !== userID)
                setUsersLikes(usersWhoLikedIt.length)
                setLike(false)
                axios.patch(`https://some-foods.onrender.com/Posts/${props.id}`, {usersWhoLikedIt})
            }
            else{
                usersWhoLikedIt.push(userID)
                setUsersLikes(usersWhoLikedIt.length)
                setLike(true)
                axios.patch(`https://some-foods.onrender.com/Posts/${props.id}`, {usersWhoLikedIt})
            }
        }
        else{

            toast.info('You must Log in first!')

        }

    }

    if (usersLikes >= 1_000 && usersLikes < 1_000_000) {
        const roundedLikes = Math.floor(usersLikes / 1000);
        const decimalLikes = Math.floor((usersLikes % 1000) / 100);
        setUsersLikes(`${roundedLikes}.${decimalLikes}K`);
    }
    else if (usersLikes >= 1_000_000 && usersLikes < 1_000_000_000){
        const roundedLikes = Math.floor(usersLikes / 1_000_000);
        const decimalLikes = Math.floor((usersLikes % 1_000_000) / 100); 
        setUsersLikes(`${roundedLikes}.${decimalLikes}M`);
    }
    else if (usersLikes >= 1_000_000_000) {
        const roundedLikes = Math.floor(usersLikes /  1_000_000_000);
        const decimalLikes = Math.floor((usersLikes %  1_000_000_000) / 100); 
        setUsersLikes(`${roundedLikes}.${decimalLikes}B`);
    }
    

    const deletePost = async (e) => {
        if (logged) {
            try{
                const data = await axios.delete(`https://some-foods.onrender.com/posts/${e}`)
                toast.success('Post was deleted successfully!')
                window.location.reload()
            }
            catch(err){
                console.log(err);
                toast.warn('Something wrong happend!')
            }

        }
    }

    return (
        <>
        <div className="post">
            <div className="div_profile" >
                <Link  style={{display:'flex',alignItems: 'center',gap:' 1rem',}} to={`/Post/Profile/${props.UserId}`}>
                    <img className="userProfilePic" src={imgg} alt="not found" />
                </Link>
                    <h4>{Username}</h4>
            </div>
            <Link to={`/Details/${props.id}`}>
                <img
                    className="imgg"
                    src={props.img}
                    alt=""
                />
            </Link>
                <div className="div_react" >
                    <div className="Like_Holder" onClick={WriteYourWayIntoThey_reHeart} ref={likee} >
                            { islike ? <AiFillHeart className={'heart'}/> : <AiOutlineHeart className={'heart'}/>}
                        <p>{usersLikes}</p>
                    </div>
                    <div onClick={downloadimg}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                    </div>
                </div>
            <div className="bottom_div"></div>
            <span className="parent_span">
                <span className={"child_1"}></span>
                <i className={"child_2"}></i>
                <p className={"p_2"}>View post details</p>
            </span>

            {props.userPost && <div className="postButtons">
                <button  onClick={() => deletePost(props.id)}>
                    Delete
                </button>
                <button >
                    <Link style={{ color: 'white' }} to={`/Post/ModifyPost/${props.id}`}>
                        Update
                    </Link>
                </button>
            </div>}
        </div>
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
export default Post;