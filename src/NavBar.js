import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './NavBar.css';
import logo from './images/streatlogo.png'


function NavBar({setUser, user} ){
    const navigate = useNavigate();

    
    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
          }).then(() => onLogout());
        }
    const onLogout = () => {
        setUser(null)
        navigate('/', {replace: true})
        alert('user logged out')

    }

    const handleNew = () => {
        navigate('/new', {replace: true})
    }

    const handleRate = () => {
        navigate('/newrating', {replace: true})
    }
    const handleMap = () => {
        navigate('/map', {replace:true})
    }

    const handleList = () => {
        navigate('/list', {replace:true})
    }
    
    const handleDets = () => {
        navigate('/account', {replace:true})
    }
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return  (
        <div className='nav-bar'>
            <div id='nav-contain'>
                <div id='logo-container'>
                    <img onClick={handleMap} id='logos' src={logo}/> 
                </div>
                

                {/* <div id='account'>
                </div> */}
            
                
                <ul className='nav'>
                    {/* <li className='nav-link'onClick={handleAbout}>About us!</li> */}
                    <li className="nav-link" onClick={handleMap}>Map</li>
                    <li className="nav-link" onClick={handleNew}>Add new vendor!</li>
                    <li className="nav-link" onClick={handleRate}>Rate a Vendor!</li>
                    <li className="nav-link" onClick={handleList}>Vendor List!</li>
                </ul>
            </div>
            
            {/* <img src={logo}/> */}
            <div id='welcome-container'>
                <div id='welc'>Welcome: {user.username}!</div>
                <button className='edit-bttn' onClick={handleDets}>Account Details</button>
                <button className='edit-bttn' onClick={handleLogOut}>LOG OUT</button>
            </div>
      

        </div>
    );

}

export default NavBar