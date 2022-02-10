import './rightbar.css'
import React from 'react';
import { Users } from '../../dummyData';
import Online from '../online/Online';
export default function Rightbar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">user information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">city</span>
                        <span className="rightbarInfoValue">New york</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">From</span>
                        <span className="rightbarInfoValue"> Real Madrid </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey"> Relationship </span>
                        <span className="rightbarInfoValue"> Single </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfokey">city</span>
                        <span className="rightbarInfoValue">New york</span>
                    </div>
                </div>
                <h4 className="rightbarTitle"> user friends </h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src={`${PF}posts/kumar.jpg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John dada</span>
                    </div>
                    
                </div>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar />:<HomeRightbar/> }
            </div>
        </div>
    )
}
