import React from 'react';
import {useEffect, useState} from 'react'
// import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Main from './Main';
import MapPage from './MapPage';
import SignUp from './SignUp';
import NewCart from './NewCart';
import AllVendors from './AllVendors';
import NewRating from './NewRating';
import Account from './Account';

function App() {
  const [user, setUser] = useState(null)
  const [vendors,setVendors] = useState([])
  const [filterVendors, setFilterVendors] = useState([])
  const [userRatings, setUserRatings] = useState([])
  const [averages, setAverages] = useState([])

  const use = []


  // useEffect(() => {
      
  //   }, []);


    useEffect(() => {
      fetch("/vendors").then((response) => {
        if (response.ok) {
          response.json().then((vendor) => {
            setVendors(vendor)
            setFilterVendors(vendor)
          });
        }
      });

      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });

      // fetch("/ratings").then((response) => {
      //   if (response.ok) {
      //     response.json().then((ratings) => {
      
      //         setUserRatings(ratings)   
      //     });
      //   }
      // });

      

    }, []);

    const avg = userRatings.filter(rates => rates.vendor_id)

    const nums = avg.reduce((total,next) => total + next.rating, 0) / avg.length

    console.log(nums)
    


    

  
  // console.log(averages)
  if (user) {
    return (
      <div className='logged-in'>
        <NavBar setUser={setUser} user={user} />
        <Routes>
          <Route path="/map" element={<MapPage userRatings={userRatings} vendors={vendors} user={user} />} />
          <Route path="/new" element={<NewCart vendors={vendors} setVendors={setVendors} user={user} />} />
          <Route path="/list" element={ <AllVendors user={user} setFilterVendors={setFilterVendors} filterVendors={filterVendors} vendors={vendors} userRatings={userRatings} /> } />
          <Route path='/newrating' element={ <NewRating vendors={vendors} user={user} userRatings={userRatings} setUserRatings={setUserRatings} />} />
          <Route path='/account' element={<Account user={user} />} /> 
        </Routes>
      </div>
    );
  } else {
    return (
      <div className='logged-out'>
          <Routes>
            <Route path="/" element={<Main setUser={setUser}/>} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path='*' element={<h1></h1>}/>
          </Routes>
      </div>

      
    );
  }


  
  // return (
  //   <div className="App">
  //     <NavBar />
  //     <Routes>
  //       <Route path="/" element={<Main setUser={setUser}/>} />
  //       <Route path="/map" element={<MapPage user={user} />} />
  //       <Route path="/signup" element={<SignUp />} />
        
  //     </Routes>
  //   </div>
  // );
}

export default App;
