import React from "react";
import "./chatonline.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ChatOnline({onlineUsers, currentId,setCurrentChat}) {
  // console.log(onlineUsers)
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
     // console.log(res.data);
    };
    getFriends();
  }, [currentId]);
  
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [onlineUsers, friends]);
 // console.log(onlineFriends)
  const PF= process.env.REACT_APP_PUBLIC_FOLDER
  const handleClick=async(user)=>{
    try{
      const res=await axios.get(`/conversations/find/${currentId}/${user._id}`)
      console.log(res.data);
      setCurrentChat(res.data);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="chatOnline">
      {onlineFriends.map((f) => (
        
        <div className="chatOnlineFriend" onClick={()=>{handleClick(f)}}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={f.profilePicture?PF+f.profilePicture:PF+"person/no_avatar.jpg"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{f.username}</div>
        </div>
  ))}
    </div>
  );
}
