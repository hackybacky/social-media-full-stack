import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function SearchUser() {
    let { username } = useParams();
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/?username=${username}`);
            setUser(res.data)

        }
        fetchUser();

    }, [username]);

  return (
      <div>
          
          
        
    </div>
  )
}
