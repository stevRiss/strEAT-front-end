import {useRef,  useState} from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
import Geocode from "react-geocode";
import './Main.css';



function NewCart ({user, vendors, setVendors}) {

    
    

    const navigate = useNavigate();

    
    const nameRef = useRef('')
    const addressRef = useRef('')
    const ratingRef = useRef('')
    const imageRef = useRef('')
    const ethnicRef = useRef('')
    // const [lt, setLat] = useState(0)
    const [lat, setLat] = useState(5)
    const [lng, setLng] = useState(5)

    
    const handleChange = (e) => {
        Geocode.setApiKey("AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50");
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.setRegion("us");

        Geocode.fromAddress(e.target.value).then(
            (response) => {
                console.log(response)
                const lt = response.results[0].geometry.location.lat;
                const lg = response.results[0].geometry.location.lng;
            setLat(lt)
            setLng(lg)
        })

    }

    console.log(lat, lng)

    function HandleNew(e){
        
        e.preventDefault();       

        console.log(lat, lng)
        const input = {
            name: nameRef.current.value,
            address: addressRef.current.value,
            lat: lat,
            lng: lng,
            rating: ratingRef.current.value,
            picture_url: imageRef.current.value,
            food_type: ethnicRef.current.value
        }

        console.log(input)

        fetch("/vendors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          })
          .then((r) => r.json())
          .then(newVendors => {

                console.log(input)


                console.log(newVendors)
                alert("new vendor added")
                window.location.reload(false)

                navigate('/map',  {replace: true})
                
                })               
          
    }

  
    
    console.log( "before return", lat)
    return (
        <div className="new-cart-container">
            <form className='form' onSubmit={e=> HandleNew(e)}>
                
                <h3 className='headings'>Vendor name:</h3>
                <input className='inputs' type='text' ref={nameRef}/>
               
                <h3 className='headings'>Vendor address:</h3>
                <input className='inputs' placeholder='333 Gee Place, New York NY' ref={addressRef} onChange={handleChange}></input>

                <h3 className='headings'>Vendor rating:</h3>
                <input className='inputs' ref={ratingRef} placeholder='ex: 7.8'></input>

                <h3 className='headings'>Upload a photo of vendor:</h3>
                <input className='inputs' ref={imageRef} placeholder='image url'></input>

                <h3 className='headings'>What kind of food does this vendor serve?</h3>
                <input className='inputs' ref={ethnicRef} placeholder='Greek, Mexican, Chinese etc.'></input>
                <div></div>
                <button id='new-rate' type='submit'>Create new Vendor</button>
            </form>
        </div>
    )
}


export default NewCart