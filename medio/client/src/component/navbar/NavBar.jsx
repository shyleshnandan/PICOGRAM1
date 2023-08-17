import "./navbar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = () =>{

    const {darkMode, toggle} = useContext(DarkModeContext);
    
    const {currentUser} = useContext(AuthContext);
    
    return(
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                   <span>picogram.</span>

                </Link>
                <HomeOutlinedIcon />
                {darkMode?<WbSunnyOutlinedIcon  onClick={toggle}/>:<DarkModeOutlinedIcon onClick={toggle}/>}
                <GridViewOutlinedIcon />
                <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search"/>
            </div>
            </div>
            
            <div className="right">
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user">
                    <img src={currentUser.profilePic} alt=""/>
                    <span>{currentUser.name}</span>
                </div>
                
            </div>
        </div>
    )
}

export default NavBar;
