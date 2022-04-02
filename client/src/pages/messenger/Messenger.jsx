import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chatonline/Chatonline";
import { AuthContext } from "../../context/AuthContext";
import { useContext,useRef } from "react";
import {io} from "socket.io-client"

import axios from "axios";
export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages,setMessages]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [newMessage,setNewMessage]=useState("");
  const socket=useRef()
  const scrollRef = useRef();

  useEffect(()=>{
    socket.current=io("ws://localhost:8900");
  },[])

  useEffect(()=>{
    socket.current.emit("addUser",user._id)
    socket.current.on("getUsers",(users)=>{
      console.log(users)
    })
    //console.log("ehk")
  },[user])
 
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(()=>{
    const getMessages=async ()=>{
      try{
        const res =await axios.get("/messages/"+currentChat?._id);
        setMessages(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getMessages();
  },[currentChat])
  // console.log(messages);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const message={
      sender:user._id,
      text:newMessage,
      conversationId:currentChat._id
    }

    try{
      const res = await axios.post("/messages",message);
      setMessages([...messages,res.data]);
      setNewMessage("");
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput"  />
            
            {conversations.map((c) => (
              <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat?
            <>
            
            <div className="chatBoxTop">
              {
                messages.map((m)=>(
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender===user._id} />
                  </div>
                ))
              }
              
            </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="write something"
                  className="chatMessageInput"
                  onChange={(e)=>setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={(handleSubmit)}>send</button>
              </div>
              </>:<span className="noConversationText">open a conversation</span>
              }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chatonline />
            <Chatonline />
            <Chatonline />
            <Chatonline />
            <Chatonline />
            <Chatonline />
          </div>
        </div>
      </div>
    </>
  );
}
