import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chatonline/Chatonline";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        console.log("hello");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  });
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="write something"
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">send</button>
            </div>
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
