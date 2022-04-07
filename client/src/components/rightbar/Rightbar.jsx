import "./rightbar.css";
import React from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Description, PermMedia } from "@material-ui/icons";
import { Add, Remove } from "@material-ui/icons";
import { Dropdown } from "react-bootstrap";
import { useRef } from "react";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [file, setFile] = useState(null);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  const desc=useRef();
  const city=useRef();

  const [hideDiv, setHideDiv] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    

    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user?._id]);
  const handleClick = async () => {
    try {
      if (followed) {
        console.log("unfollwed");
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        console.log("unclicked");
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          
          <img className="birthdayImg" src="assets/posts/mypost.jpg" />
          <span className="birthdayText">
            
          </span>
        </div>
        <img src="assets/posts/mypost.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle"> Online Friends </h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  const logoutClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  const updateProfile = () => {
    setHideDiv(!hideDiv);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    var d =desc.current.value;
    var c=city.current.value;
    if(desc.current.value==="")d=currentUser.desc;
    if(city.current.value==="")c=currentUser.from;
    const updatedUser = {
      userId: user._id,
      desc: d,
      from:c,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
   //   data.append("name", fileName);
      data.append("file", file);
      data.append("upload_preset","qs5o3dd6")
      
      
      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/hareeshcloud/image/upload", data);
        updatedUser.profilePicture=res.data.url;
        //console.log(res);
        } catch (err) { }
    }
      
      try {
       
        await axios.put("/users/"+currentUser._id, updatedUser);
        localStorage.clear();
        window.location.reload();
      } catch (err) {}
    
    
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowingButton" onClick={handleClick}>
            {followed ? "unfollow" : "follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username === currentUser.username && (
          <Dropdown>
            <Dropdown.Toggle
              variant="info"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logoutClick()}>
                Logout
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateProfile()}>
                Update Profile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <div className={hideDiv ? "hidden" : undefined}>
          <form onSubmit={submitHandler}>
            <label>
              desc
              <input type="text" ref={desc} className="shareInput" />
            </label>
            <hr />
            <label>
              city
              <input type="text" ref={city}  className="shareInput" />
            </label>
            <hr />
            <label>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              profile picture
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <button className="shareButton" type="submit">
              Update Profile
            </button>
          </form>
        </div>
        <h4 className="rightbarTitle">user information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">Name</span>
            <span className="rightbarInfoValue">{user?.name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">From</span>
            <span className="rightbarInfoValue"> {user.from} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey"> Relationship </span>
            <span className="rightbarInfoValue">
              {" "}
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "married"
                : "complicated"}{" "}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle"> user friends </h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ?  friend.profilePicture
                      :  "../person/no_avatar.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
