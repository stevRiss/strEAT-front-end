//list of all vendors, allow users to sort by type and temporarily delete if vendor is not there 
import ListCard from "./ListCard"
import {useRef,  useState} from "react";

function AllVendors({user, vendors, filterVendors, setFilterVendors, userRatings}) {
    const [search, setSearch] = useState('')
    const searchRef = useRef('')

    console.log(userRatings)
        
    

    const filteredVendors = (e) => {
        e.preventDefault();
        const val = e.target.value.toLowerCase();
        // console.log(searchRef.current.value)
        if(val !== '') {
            const results = vendors.filter(vendor => {
                return vendor.name.toLowerCase().includes(val) || vendor.food_type.toLowerCase().includes(val)
            })
            console.log(results)
            setFilterVendors(results)
        } else {
          return setFilterVendors(vendors)
        }
      }
   
      console.log(vendors)
    return (
        <div>
            <div id='forming' onChange={filteredVendors}>
                <input className='inputs' ref={searchRef} placeholder='Search by Name or Food type!'></input>
                <button className='mainbuttons' >Search Vendors</button>
            </div>
            <div className='vendor-li'>
                {filterVendors.map(vendor => {
                   return <ListCard key={vendor.id} vendor={vendor} />
                })}
                {/* {filterVendors} */}
            </div>
        </div>
    )
}

export default AllVendors