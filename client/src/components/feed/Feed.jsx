import './feed.css'
import React from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
export default function Feed({username}) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    
    useEffect(() => {
        
        const fetchPosts = async () => {
            localStorage.setItem("user", JSON.stringify(user))
            const res = username ? await axios.get("/posts/profile/"+username) : 
                await axios.get("posts/timeline/"+user._id)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
            
        }
        fetchPosts();
        
    }, [username, user._id]);
    
    return (

        <div className='feed'>
            <div className="feedWrapper">
                

                {username?user.username===username && <Share />:<Share/>}
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    )
}
