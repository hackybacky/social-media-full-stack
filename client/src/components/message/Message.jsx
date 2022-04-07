import React, { useEffect,useState } from 'react'
import './message.css'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Message({message,own,user}) {
 // console.log(message);
 const PF= process.env.REACT_APP_PUBLIC_FOLDER
 const [currentSender,setCurrentSender]=useState(null);
 useEffect(()=>{
    const getUser=async()=>{
      try{
        const res = await axios.get('/users?userId='+user);
        setCurrentSender(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getUser();
 },[user])
  return (
    <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img src={currentSender?.profilePicture?currentSender.profilePicture:"/assets/no_avatar.jpg"} alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
