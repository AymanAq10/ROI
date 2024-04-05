import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AiOutlineSend, AiOutlineDelete } from "react-icons/ai";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Comments({ id, post, userID }) {
  const logged = useSelector(state => state.logged)
  const [comments, setComments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState();
  const [matchingCustomers, setMatchingCustomers] = useState([]);

  useEffect(() => {
      async function fetchData() {
        const [commentsResponse, customersResponse] = await Promise.all([
          axios.get(`http://localhost:5000/Posts/${id}`),
          axios.get(`http://localhost:5000/Customer/`),
          
        ]);
        setComments(commentsResponse.data.commentSection);
        setCustomers(customersResponse.data);
      }
      fetchData();
    if (logged) {
      async function fetchUser() {
        try{
          const response = await axios.get(`http://localhost:5000/Customer/${userID}`)
          setUser(response.data)
        }
        catch(err){
          console.log(err);
        }
      }
      fetchUser()
    }
  }, [id, logged, userID]);

  useEffect(() => {

    if (comments.length > 0 && customers.length > 0) {
      const matching = comments.map((comment) => {
          const matchingCustomer = customers.find(f => f.id === comment.userId);
          return { ...comment, matchingCustomer };
        })
      setMatchingCustomers(matching.reverse());
    }
  }, [comments, customers]);

  const commentSubmitted = async (e) => {
    e.preventDefault();
    const formData  = new FormData(e.target);
    const commentId = comments.length + 1;
    const userId    = userID;
    let commentBody = formData.get('commentBody');
    commentBody     = commentBody.trim(); 
    if (!commentBody) {
      toast.warn('Comment can\'t be blank')
      return;
    }
    const newComment      = { commentId, userId, commentBody };
    const updatedComments = [...comments, newComment];
    const updatedPost     = { ...post, commentSection: updatedComments };
    if (logged) {
      await axios.patch(`http://localhost:5000/Posts/${id}`, updatedPost);
      setComments(updatedComments);
    }
  };
  

  const deleteComment = async (e) => {
    const updatedComments = [...comments.filter(f => f.commentId !== e)];
    const updatedPost     = {...post, commentSection: updatedComments };

    if(logged){
      await axios.patch(`http://localhost:5000/Posts/${id}`, updatedPost);
      setComments(updatedComments);
      if (updatedComments.length === 0) {
        window.location.reload()
      }
  }
  }
  
  return (
    <>
    <div className='commentPlace'>
        <h2>Comment Section:</h2>
        <p>{comments && comments.length} comments</p>

      <div >
          {logged && user && 
          <>
            <img src={user.defaultPic}  className="userProfilePic" alt={user.UserName}/>
            <form onSubmit={commentSubmitted}>
              <input type='text' placeholder='join the discussion' name='commentBody'/>
              <button type='submit'><AiOutlineSend /></button>
            </form>
          </>
          }
      </div>

      <div>
        {matchingCustomers.length > 0 ? matchingCustomers.map((comment) => (
          <div key={comment.id}>
            <div>
              <Link style={{ display: 'flex', alignItems: 'center', gap: ' 1rem' }} to={`/Post/Profile/${comment.userId}`}>
                <img className="userProfilePic" src={comment.matchingCustomer.defaultPic} alt="not found" />
              </Link>
              <h3>{comment.matchingCustomer.UserName.length > 12 ? comment.matchingCustomer.UserName.slice(0, 9) + '...' : comment.matchingCustomer.UserName}</h3>
            </div>
            <div>
              <p>{comment.commentBody}</p>
              
              {logged && userID === comment.userId && <button onClick={() => deleteComment(comment.commentId)} className='DeleteComment'><AiOutlineDelete /></button>}
            </div>
          </div>
        )) : logged ? <p style={{ textAlign: 'center' }}>Be the First to Comment!</p> : <p style={{ textAlign: 'center' }}>Login to comment!</p> }
      </div>
      
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
  );
}
