import React, {useRef, useState} from "react";
import { useNavigate } from "react-router";
import './Main.css';
import logo from './images/streatlogo.png'


function Main({setUser}){
    const navigate = useNavigate();

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    
    const handleLogIn = (e) => {
        e.preventDefault()
        const input = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          }).then((r) => {
              if (r.ok){
                  r.json().then(user => {
                      console.log(user)
                      setUser(user)
                      navigate('/map', { replace: true })
                  })
              }else{
                  r.json().then(errors => {
                      alert('Invalid Credentials')
                    //   console.log(errors)
                  })
              }
          })  
          

    }

    const handleSignUp = () => {
        navigate('/signup', {replace:true})
    }
    return (
        <div id="real">
            <div className="main">
                <div>
                    <h1>Welcome to strEAT!</h1>
                    <img id='logod' src={logo} />
                    <h2>Find Street food vendors in New York City!</h2>
                </div>
                <h2>Please Login!</h2>
                <form onSubmit={e=> handleLogIn(e)}>
                    <input className='maininput' ref={usernameRef} placeholder='Enter Username'></input>
                    <input className='maininput' ref={passwordRef} placeholder='Enter Password' type='password'></input>
                    <button className='mainsubmit' type="submit">Find Food!</button>
                </form>
                <div>
                    <h3>Dont have an account? Create a new one here!</h3>
                    <button className='mainbuttons' onClick={handleSignUp}>Create new Account</button>
                </div>

            </div>
        </div>
    );
}

export default Main