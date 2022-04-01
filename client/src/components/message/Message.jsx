import React from 'react'
import './message.css'
import {format} from 'timeago.js'
export default function Message({message,own}) {
  console.log(message);
  return (
    <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img src="https://static.onecms.io/wp-content/uploads/sites/6/2020/05/07/MSDVAGI_OR006.jpg" alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
