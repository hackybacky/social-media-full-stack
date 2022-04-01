import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios';
export default function Conversation({conversation, currentUser}) {
  const [user,setUser]=useState(null);
  const PF= process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(()=>{
    const friendId =conversation.members.find((m)=>m!==currentUser._id);
    const getUser=async()=>{
      try{

        const res =await axios("/users?userId="+friendId);
        setUser(res.data);
        //console.log(user);
      }catch(err){
        console.log(err);
      }

    }
    getUser();
  },[currentUser,conversation]);
  return (
    <div className='conversation'>
        <img src={user===null || !user.profilePicture?PF+"person/no_avatar.jpg":PF+user.profilePicture}alt="" className="conversationImg" />
        <span className="conversationName">{user===null?"hello":user.username}</span>
    </div>
  )
}
