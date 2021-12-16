import React, {useRef, useState} from "react";
import { useNavigate } from "react-router";


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
                      alert('hello')
                      console.log(errors)
                  })
              }
          })        
    }

    return (
        <div className="main">
            <h1>Welcome to strEAT!</h1>
            <h2>Please Login!</h2>
            <form onSubmit={e=> handleLogIn(e)}>
                <input ref={usernameRef} placeholder='Enter Username'></input>
                <input ref={passwordRef} placeholder='Enter Password' type='password'></input>
                <button type="submit">submit</button>
            </form>

        </div>
    );
}

export default Main