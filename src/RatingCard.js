import {useEffect, useRef, useState} from "react";

function RatingCard({userRatings, rating}) {
    const avg = userRatings.filter(rates => rates.vendor_id === rating.vendor_id)
    const nums = avg.reduce((total,next) => total + next.rating, 0) / avg.length
    const updateRef = useRef('')
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch(`/vendors/${rating.vendor.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                 rating: nums
                })
            }).then(r=> r.json()).then(newRating => {
                console.log(newRating)
                // window.location.reload(false)
    
            })


    }, []);

    const handleEdit = () => {
        setEdit(!edit)

    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("hello")
        setEdit(false)
        fetch(`/ratings/${rating.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             rating: updateRef.current.value
            })
        }).then(r=> r.json()).then(newRating => {
            // console.log(newRating)
            window.location.reload(false)

        })
    }

    const handleUp = () => {
        // fetch(`/vendors/${rating.vendor.id}`, {
        //     method: "PATCH",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //      rating: nums
        //     })
        // }).then(r=> r.json()).then(newRating => {
        //     console.log(newRating)
        //     // window.location.reload(false)

        // })
    }

    const exit = () => {
        setEdit(false)
    }

    return (
        <div className='card'>
            <div>
                {/* {console.log(rating.vendor.name)} */}
                <h1 id='head-rate' onClick={exit}>{rating.vendor.name}: </h1>
                <h2 onClick={exit}>StrEAT Rating: {nums}</h2>
                {edit ?
                    <div>
                        <form onSubmit={e => handleUpdate(e)}>
                            <input ref={updateRef} placeholder={rating.rating}></input>
                            <button className='edit-bttn' type ="submit">Submit new rating</button>
                        </form>
                    </div>
                :
                    <h2>
                        Your Rating:{rating.rating} <button className='edit-bttn' onClick={handleEdit}>Edit Rating</button>
                    </h2> 
                }
                <div onClick={exit}>
                    <h1>Vendor info:</h1>
                    <h2>Address: {rating.vendor.address}</h2>
                    <h2>Type: {rating.vendor.food_type}</h2>
                    <img src={rating.vendor.picture_url} />
                </div>
            </div>
            
        </div>
    )
}
export default RatingCard