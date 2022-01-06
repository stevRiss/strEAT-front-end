import { useNavigate } from "react-router";

function ListCard({vendor}) {
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`/vendors/${vendor.id}`, {
            method: "DELETE"
        })
        alert('Thanks for letting us know! Vendor will be removed from the map until address is confirmed!')
        // navigate('/map', {replace:true})
        window.location.reload(false)
    }
    return(
        <div className='card'>
            <h1>{vendor.name}</h1>
            <h2>{vendor.address}</h2>
            <button className='edit-bttn' onClick={handleDelete}>Not there??</button>
            <h2>{vendor.food_type}</h2>
            <button className='edit-bttn'>Add to favorites!</button>
            

        </div>
    )
}

export default ListCard