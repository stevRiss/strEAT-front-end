import React, {useRef, useState} from "react";
import { useNavigate } from "react-router";
import logo from './images/streatlogo.png'


function SignUp({setUser}){
    const navigate = useNavigate();

    const usernameRef = useRef('');
    const emailRef = useRef('')
    const passwordRef = useRef('');

    const createNew = (e) => {
        e.preventDefault();
        const input = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        fetch("/users", {
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
                  r.json().then(error => alert(error))
              }
          })       

    }
    const handleClick = () => {
        navigate('/', { replace: true})
    }
    
    return (
        <div>
        
            <img id='logod' onClick={handleClick} src={logo} />
            <h2>Please fill out the following fields to create your account!</h2>

            <div id='forming'>
                <form onSubmit={e=> createNew(e)}>
                    <h3>Enter Username:</h3>
                    <input className='input' ref={usernameRef} placeholder='Please enter a username'></input>
                    <h3>Enter E-mail address:</h3>
                    <input className='input' ref={emailRef} placeholder='please enter an email address'></input>
                    <h3>Enter password (6 characters):</h3>
                    <input className='input' ref={passwordRef} placeholder='please enter a password' type='password'></input>
                    <button className='mainbuttons'type='submit'>Create Account</button>
                </form>
            </div>

        </div>

    );
        
}

export default SignUp