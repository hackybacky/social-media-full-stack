import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react"
import axios from "axios";
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/?username=hareesh`);
            setUser(res.data)

        }
        fetchUser();

    }, [user.userId]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={` ${PF}posts/mypost.jpg`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={`${PF}posts/shukla.jpg`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc || "hello my profile"}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="hareesh"/>
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
}