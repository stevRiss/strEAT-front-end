import { useNavigate } from "react-router";
import {useRef,  useState} from "react";

function ListCard({vendor}) {
    const navigate = useNavigate();
    const [fav, setfav] = useState(false)

    const handleDelete = () => {
        fetch(`/vendors/${vendor.id}`, {
            method: "DELETE"
        })
        alert('Thanks for letting us know! Vendor will be removed from the map until address is confirmed!')
        // navigate('/map', {replace:true})
        window.location.reload(false)
    }

    const handleFav = () => {
        setfav(!fav)
        console.log(fav)
    }
    return(
        <div className={fav ? 'cardy' : 'card'}>
            <h1>{vendor.name}</h1>
            <h2>{vendor.address}</h2>
            <button className='edit-bttn' onClick={handleDelete}>Not there??</button>
            <h2>{vendor.food_type}</h2>
            <button onClick={handleFav} className='edit-bttn'>{fav ? "Unfavorite" : 'Favorite'}</button>
            

        </div>
    )
}

export default ListCard