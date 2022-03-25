import React from 'react'
import './message.css'
export default function Message({own}) {
  return (
    <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img src="https://static.onecms.io/wp-content/uploads/sites/6/2020/05/07/MSDVAGI_OR006.jpg" alt="" className="messageImg" />
            <p className="messageText">this is the message sdaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff afsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
        </div>
        <div className="messageBottom">1 HOUR AGO</div>
    </div>
  )
}
