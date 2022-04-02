import './rightbar.css'
import React from 'react';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons'
export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const { user: currentUser,dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));
    const navigate=useNavigate();
    useEffect(() => {
        console.log(user?._id)
        
        setFollowed(currentUser.following.includes(user?._id));
    }, [currentUser, user?._id]);
    const handleClick = async () => {

        try {
            if (followed) {
                console.log("unfollwed")
                await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({type:"UNFOLLOW",payload:user._id})
            }
            else {
                console.log("unclicked")
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed)
    }
    const HomeRightbar = () => {
        return (
            <>

                <div className="birthdayContainer">

                    <img className='birthdayImg' src="assets/posts/mypost.jpg" />
                    <span className="birthdayText">
                        <b>kumar </b> <b>shukla </b> have birthday today
                    </span>
                </div>
                <img src="assets/posts/mypost.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle"> Online Friends </h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}

                </ul>
            </>
        )
    }
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFriends();

    }, [user])
    const logoutClick=()=>{
        localStorage.clear();
        window.location.reload();
        
        
    }
    const ProfileRightbar = () => {

        return (
            <>
                {
                    user.username !== currentUser.username && (
                        <button className='rightbarFollowingButton' onClick={handleClick}>
                            {followed ? "unfollow" : "follow"}
                            {followed ? <Remove /> : <Add />}
                        </button>
                    )
                    
                }
                {
                    user.username===currentUser.username && (
                        <button className='logoutButton' onClick={logoutClick} >
                            <h3>Logout</h3>
                        </button>
                    )
                }
                
                <h4 className="rightbarTitle">user information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">city</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">From</span>
                        <span className="rightbarInfoValue"> {user.from} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey"> Relationship </span>
                        <span className="rightbarInfoValue"> {user.relationship === 1 ? "single" : user.relationship === 2 ? "married" : "complicated"} </span>
                    </div>

                </div>
                <h4 className="rightbarTitle"> user friends </h4>
                <div className="rightbarFollowings">
                    {
                        friends.map((friend) => (
                            <Link to={'/profile/' + friend.username} style={{ textDecoration: "none" }}>

                                <div className="rightbarFollowing">
                                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/no_avatar.jpg"} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))
                    }


                </div>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
