import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { format } from "timeago.js"
import {useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const {user:currentUser} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  },[post.likes,currentUser._id])
  const likeHandler = async () => {
    try {
      const { data }=await axios.put('/posts/' + post._id + '/like', { userId: currentUser._id })
      console.log( data );
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked)
    } catch (err) {
      console.log(err);
    }
    
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data)

    }
    fetchUser();

  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture?PF+user.profilePicture : PF + 'person/no_avatar.jpg'}
                alt=""
              />
            </Link>

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
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}person/download.png`} onClick={likeHandler} alt="" />
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