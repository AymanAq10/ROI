import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Post from "./Post";

const Posts = (props) => {


    const navigate = useNavigate()
    const [posts, setposts] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [errMsg, seterrMsg] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            setisloading(true);
            seterrMsg(null);
            const response = await fetch("https://some-foods.onrender.com/posts");
            if (!response.ok) {
              throw Error(response.statusText ? response.statusText : "error");
            }
            const data = await response.json();
            console.log(data)
            setisloading(false);
            setposts(data.reverse());
          } catch (error) {
            setisloading(false);
            seterrMsg(error.message);
          }
        };
      
        fetchPosts();
      }, []);
      

    const Delete = (id) => {
        // setposts([...posts.filter((e) => e.id !== id)])
        fetch(`https://some-foods.onrender.com/Posts/${parseInt(id)}`,{
            method:'DELETE',
        }).then(()=>{
            alert('post deleted')
            navigate('/')
        })
    }


    
    
    const lastPostIndex  = props.currentPage  * props.postPerPage;
    const firstPostIndex = lastPostIndex      - props.postPerPage;

    const currentPosts = posts ? posts.slice(firstPostIndex , lastPostIndex) : ''
    
    return (

        <div className="posts">
                {currentPosts && currentPosts.map((post) => (
  
                        <Post Delete={Delete} id={post.id} title={post.title} key={post.id} img={post.img} UserId={post.UserId} />
                    ))
                }
                {isloading &&<span className="loader"></span>}
                {!posts && !isloading  && !errMsg && <div className="not-found">No data</div>} 
                {errMsg && <div className="error">{errMsg}</div>}
        </div>
        
    )
}
export default Posts;
