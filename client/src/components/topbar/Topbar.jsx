import React from 'react';
import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
//importing from material ui 
import {Link} from 'react-router-dom'
export default function Topbar() {
    const { user } = useContext(AuthContext)
    console.log(user._id);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className="topbarContainer">

            <div className="topbarLeft">
                <Link to='/' style={{textDecoration:"none"}}>
                    <span className='logo'>social web</span>
                </Link>
                

            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className='searchIcon'/>
                    <input type="text" className='searchInput' placeholder='search for friend or post' />
                </div>

            </div>
            <div className="topbarRight">


                <div className="topbarLinks">
                    <span className='topbarLink'> Home page </span>
                    <span className='topbarLink'>Timeline</span>
                   
                </div>

                <div className="topbarIcons">

                    <div className="topbarIconItem">
                        <Person />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className='topbarIconBadge'>1</span>
                    </div>

                    <div className="topbarIconItem">
                        <Notifications />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
               
                    <img src={
                        user.profilePicture?PF+ user.profilePicture:PF+"person/no_avatar.jpg"
                    }
                            alt="" className="topbarImg" />
                </Link>
            </div>

        </div>
  )
}
