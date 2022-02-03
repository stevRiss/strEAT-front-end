import {useEffect, useState} from 'react'
import axios from 'axios'
import {Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

function NewMapPage({vendors, props}) {
    const [destinations, setDestinations] = useState([])
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)
    const [activeMarker, setActiveMarker] = useState({})
    const [selectedPlace, setSelectedPlace] = useState({})
    const [location, setLocation] = useState({address: ''})

    const mapStyles = {
      width: '100%',
      height: '100%'
    };

    useEffect(() => {
        const vendorList = vendors.map(vendor => (
          {location: {lat: vendor.lat, lng: vendor.lng}, name: vendor.name, rating:vendor.rrating, picture_url:vendor.picture_url, address: vendor.address}
        ))
        
        setDestinations(vendorList)
    }, []);

    const renderDestinations = () => {
        if(destinations.length > 0) {
            return destinations.map(destination => {
                return (
                    < Marker
                    center={destination.location}
                    position={destination.location}
                    // onClick={this.onMarkerClick}
                    name={destination.name}
                    rating={destination.rating}
                    picture_url={destination.picture_url}
                    address={destination.address}
                    />
                    )
            })
             
        }
    }

    // onMarkerClick = (ven, marker, e) => {
    //     setSelectedPlace(ven)
    //     setActiveMarker(marker)
    //     setShowingInfoWindow(true)
    // }


    const getPosition = () => {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
      } else {
      alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
      }
      }
      

      const posError = () => {
        if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
        alert('Enable location permissions for this website in your browser settings.')
        }
        })
        } else {
        alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
        }
        }
        const showPosition = (position) => {
          let lat = position.coords.latitude // You have obtained latitude coordinate!
          let long = position.coords.longitude // You have obtained longitude coordinate!
          props.set_lat(lat) // Using dispatch to modify lat store state
          props.set_long(long) // Using dispatch to modify long store state
          convertToAddress(lat, long) // Will convert lat/long to City, State, & Zip code
          }


          const convertToAddress = (lat, long) => {
            fetch('http://localhost:3000/googlemaps')
            .then(res => res.json())
            .then(obj => getAddress(lat, long, obj.api_key))
            }
  
          const getAddress = (lat, long, googleKey) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
            .then(res => res.json())
            .then(address => setZip(address))
            }
  
            const setZip = (address) => {
              let city = address.results[5].address_components[2].short_name
              let state = address.results[5].address_components[4].short_name
              let postal = address.results[5].address_components[0].short_name
              console.log(city)
              props.set_city(city)
              props.set_state(state)
              props.set_postal_code(postal)
              }
        

        
            

    // getGeocode = async function(location) {
    //     let address = location.address.split(" ").join("+")
    //     let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50`
    //     console.log(url)
    //     const response = await axios.get(url)
    //     const data = response.data.results[0]
    //     const coords = {
    //       name: data.formatted_address,
    //       location: {
    //         lat: data.geometry.location.lat,
    //         lng: data.geometry.location.lng
    //       }
    //     }
    //     return coords
    //    }

    return(
        <div>
          <button onClick={getPosition}>ffff</button>
            <Map
            google={window.google}
            // google={google}   //this loads the map onto the page with an inital center
            zoom={13}
            style={mapStyles}
            initialCenter={{ lat: 40.757975, lng: -73.985543}}
            gestureHandling= "cooperative"
            // onClick={handleClick}
            >
            

            {renderDestinations()}

            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow} //this sets state for info window and creates a div for the info to live wihtin the info window
                // onClose={this.onClose} //when the window is closed stat is changed back to false
                // user={this.props.user}
              >
                <div className='info'>
                  <h2 id='window-style'>{selectedPlace.name}</h2>
                  <div id='stret'>{selectedPlace.address}</div>
                  <div id='stret'>strEAT Rating</div>
                  <div id='ven-rate'>
                    {selectedPlace.rating}
                  </div>
                  <img id='window-pic' src={selectedPlace.picture_url} />
                </div>
                
              </InfoWindow>
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50'
})(NewMapPage);
