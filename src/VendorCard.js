import React, {useRef, useState} from "react";
import './Main.css';
import { useNavigate } from "react-router";

function VendorCard({vendor, userRatings}) {
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState({})
    const [rating, setRating] = useState(vendor.rating)
    const updateRef = useRef('')
    const navigate = useNavigate();



    const handleClick = () => {
        setEdit(!edit)
        setId(vendor)
    }
    const handleDelete = () => {
        fetch(`/vendors/${vendor.id}`, {
            method: "DELETE"
        })
        alert('Thanks for letting us know! Vendor will be removed from the map for now!')
        navigate('/map', {replace:true})
    }

    const handleUpdate = (e) => {
        // e.preventDefault();
        console.log("hello")
        setEdit(false)
        fetch(`/vendors/${vendor.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             rating: updateRef.current.value
            })
        }).then(r=> r.json()).then(newRating => setRating(newRating.rating))
        

        // navigate('/newrating', { replace: true })
    }
    // console.log(vendor)
    return (
        <div id='vendor-card'>
            <h1>{vendor.name}</h1>
            {edit ?
                <div>
                    <form onSubmit={e => handleUpdate(e)}>
                        <input ref={updateRef} placeholder={rating}></input>
                        <button type ="submit">Submit new rating</button>
                    </form>
                </div>
            :
            
                <h1>
                    {rating}
                    <button onClick={handleClick}>Edit Rating</button>
                </h1> 
            }
            <h2>{vendor.food_type}</h2>
            <h2>Address:{vendor.address}</h2>
            <img  src={vendor.picture_url} />
            <button onClick={handleDelete}>Vendor not there?</button>
        </div>
    )
}
    export default VendorCard