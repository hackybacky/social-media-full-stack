import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SearchUser from "./pages/search/searchUser";
import Messenger from "./pages/messenger/Messenger";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,

  Route,
  Routes,
  Link,
  useRouteMatch,
  useParams,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from 'react'

function App() {
  const { user} = useContext(AuthContext)


  

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Register />} />
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
        <Route path='/profile/:username' element={user?<Profile />:<Navigate to="/login"/>} />
        <Route path='/search/:username' element={<SearchUser />} />
        <Route path='/messenger' element={user ? <Messenger/> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
