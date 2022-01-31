import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import VendorCard from "./VendorCard"
import RatingCard from "./RatingCard"
import './Main.css';

function NewRating({vendors, user, userRatings, setUserRatings} ) {
    const [newRating, setNewRating] = useState(false)
    const [news, setNews] = useState(false)

    const ratingRef = useRef('')
    const valueRef = useRef('')
    const useRate = []

    useEffect(() => {
        fetch("/ratings").then((response) => {
          if (response.ok) {
            response.json().then((ratings) => {
               
                setUserRatings(ratings)   
        
                                 
                ratings.map(rating => { if (rating.user_id == user.id) {
                    console.log(rating)
                    useRate.push(rating)
                }})

                console.log(useRate)
                // setUserRatings(ratings)

                // })
  
            });
          }
        });
      }, []);

    // console.log(useRate)

    const handleRate = () => {
        setNewRating(!newRating)
    }

    const handleValue = (e) => {
        e.preventDefault();
        const id = parseInt(valueRef.current.value)
        const input = {
            rating: ratingRef.current.value,
            user_id: user.id,
            vendor_id: parseInt(valueRef.current.value)
        }
            
            
       
            fetch("/ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
                })
                .then((r) => {
                    if(r.ok){
                        r.json().then(newRatings => {
                            setNewRating(false)
                            alert("new rating created")
                            window.location.reload(false) 
                        })
                    }else{
                        r.json().then(error => alert('Vendor already rated!'))
                    }
                })
                    
                // .then(newRatings => {
    
                //     console.log(input)
                //     if(error){
                //         alert('rating already exists for vendor')
                //     }else{
                //         setNewRating(false)
                //         alert("new rating created")
                //         window.location.reload(false)

                //     }
                //     }) 
                          
    }
     
    return (

    <div>
        <div className="vendor-list">
            <button onClick={handleRate} id='new-rate'>New Rating!</button>
            {newRating ? 
                
                <form className='form-style' onSubmit={e => handleValue(e)}>
            
                    <select className='inputs' ref={valueRef} name="selectList" id="selectList" placeholder="select restaurant">
                        {vendors.map(vendor =>  <option  value={vendor.id}>{vendor.name}</option>)}
                    </select>
                    <input className='inputs' placeholder='Enter a rating! ' ref={ratingRef} type='float'></input>
                    <button id='new-rate' type="submit">Submit Rating</button>
                </form> 
               
                    : 
                <div></div>}
        </div>
                <h1 id='rate-heading'>Your Ratings:</h1>
            <div className='vendor-li'>
                {userRatings.map(rating => {
                    {if (rating.user_id === user.id){
                        if(rating.vendor !== null){
                        return <RatingCard key={rating.id} userRatings={userRatings} rating={rating} />
                        }
                    }}
                })}
            </div>
       
    </div>
    )
}
{/* <RatingCard ratings={ratings}/>  */}
export default NewRating


