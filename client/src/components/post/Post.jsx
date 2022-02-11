import "./post.css";
import { MoreVert } from "@material-ui/icons";

import { useEffect, useState } from 'react';
import axios from 'axios'
import {  format } from "timeago.js"
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked)
  }

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUser(res.data)

    }
    fetchUser();

  }, []);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture || PF+'person/no_avatar.jpg'}
              alt=""
            />
            <span className="postUsername">
                {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)} </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${ PF}person/download.png`} onClick={likeHandler }alt="" />
            <img className="likeIcon" src={`${PF}posts/like.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} likes this </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}