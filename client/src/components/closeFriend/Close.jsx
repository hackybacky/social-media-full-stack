import React from 'react';
import './close.css'
export default function Closefr({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.profilePicture?user.profilePicture:"/assets/no_avatar.jpg"} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
  );
}
