import './feed.css'
import React from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
export default function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts =async () => {
            const res = await axios.get("posts/timeline/61f3dd6c1ec28ff0acc6586c")
            setPosts(res.data)
        }
        fetchPosts();
        
    }, []);
    return (

        <div className='feed'>
            <div className="feedWrapper">
                <Share />
                {
                    // Posts.map((p) => (
                    //     <Post key={p.id} post={p} />
                    // ))
                }
            </div>
        </div>
    )
}
