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
                    <Message/>
                    <Message/>
                    <Message/>
                  </div>
                  <div className="chatBoxBottom"></div>
              </div>
          </div>
          <div className="chatOnline">
              <div className="chatOnlineWrapper">online chat </div>
          </div>
      </div>
    </>
  );
}
