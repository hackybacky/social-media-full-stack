import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
          <div className="chatMenu">
              <div className="chatMenuWrapper">
                  <input placeholder="search for friends" className="chatMenuInput" />
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>  

              </div>
          </div>
          <div className="chatBox">
              <div className="chatBoxWrapper">
                  <div className="chatBoxTop">
                    <Message/>
                    {/* <Message own={true}/> */}
                    <Message/>
                   
                  </div>
                  <div className="chatBoxBottom">
                      <textarea name="" id="" cols="30" rows="10" placeholder="write something" className="chatMessageInput"></textarea>
                      <button className="chatSubmitbutton">send</button>
                  </div>
              </div>
          </div>
          <div className="chatOnline">
              <div className="chatOnlineWrapper">online chat </div>
          </div>
      </div>
    </>
  );
}
