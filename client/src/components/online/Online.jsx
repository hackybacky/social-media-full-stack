import React from 'react';
import './online.css'
export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (


        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={ user.profilePicture?user.profilePicture:"/assets/no_avatar.jpg"} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline">  </span>
            </div>

            <span className="rightbarUsername">{user.username}</span>
        </li>


    )
}
