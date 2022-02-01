import {useEffect, useState} from 'react'
import axios from 'axios'
import {Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

function NewMapPage({vendors}) {
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
            <Map
            google={window.google}
            // google={google}   //this loads the map onto the page with an inital center
            zoom={13}
            style={mapStyles}
            initialCenter={{ lat: 40.757975, lng: -73.985543}}
            gestureHandling= "cooperative"
            // onClick={this.handleCLick}
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
