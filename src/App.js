import React from 'react';
import {useEffect, useState} from 'react'
// import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Main from './Main';
import Map from './Map';
import SignUp from './SignUp';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>
    </div>
  );
}

export default App;
