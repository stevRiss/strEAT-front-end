import React, { Component } from 'react';
import {useEffect, useRef} from 'react';
import axios from 'axios'
import './Main.css';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useNavigate } from "react-router";


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {


    
  componentDidMount = ( ) => {
    const vendorList = this.props.vendors.map(vendor => (
      {location: {lat: vendor.lat, lng: vendor.lng}, name: vendor.name, rating: vendor.rating, picture_url: vendor.picture_url, address: vendor.address}))

    this.setState({
      destinations: vendorList
    })
  }
  //useeffect
    
  
  state = {
    destinations: [
      // {location: { lat: 30.150839490122195, lng: -92.09357565868899},
      //  name: "Address 1"},
      // {location: { lat: 30.10956547664899, lng: -92.05924338426283},
      //  name: "Address 2"}
     ],
    showingInfoWindow: false, //will hide or show info window
    activeMarker: {}, //shows show an active marker on click
    selectedPlace: {}, //shows the information window for the marked place
    location: {
      address: ''
    }
  }
//state
  

  renderDestinations = () => {
    if (this.state.destinations.length > 0) {
     return this.state.destinations.map(destination => {
      return <Marker
        center={destination.location}
        position={destination.location}
        onClick={this.onMarkerClick}
        name={destination.name}
        rating={destination.rating}
        picture_url={destination.picture_url}
        address={destination.address}
        
      />
      
     })
    }
   }
   
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,     //used to show the info window when someone clicks on a marker
      showingInfoWindow: true
    });
    //onClick

    onClose = props => {
      if (this.state.showingInfoWindow) { //used to close the info window resets state
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };
    //onClick

     inputChange = event => {
      this.setState({
       location: {
        ...this.state.location,
        [event.target.name]: event.target.value
       }
      })
     }
     //onChange

     handleSubmit = event => {
      event.preventDefault();
      // const navigate = useNavigate();

      this.getGeocode(this.state.location).then(coords => {
        // console.log(coords.location.lat)
        
        this.setState({
          ...this.state,destinations: [...this.state.destinations, coords]
       })}
      )
    }
    //onSubmit

    handleFavorite = () => {
       const navigate = useNavigate();
       navigate('/newrating', {replace: true})
    }
    //handler

    // handleClick = ()  => {
    //   axios.delete(`http://localhost:3000/vendors/1`)
      
    // }


     getGeocode = async function(location) {
      let address = location.address.split(" ").join("+")
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50`
      console.log(url)
      const response = await axios.get(url)
      const data = response.data.results[0]
      const coords = {
        name: data.formatted_address,
        location: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng
        }
      }
      return coords
     }
//geocoding function
  
  render() {
    

    console.log(this.props.ratings)

    return (
      <div>
        <h2 id='welc'>The quickest way to find and keep track of street food vendors in New York City!</h2>
        <div id='note'>Note: strEAT Ratings are an average of all user ratings!</div>
        <div id='forming'>
          <form onSubmit={this.handleSubmit}>
            <input className='inputs' type="text" name="address" onChange={this.inputChange} />
            <input className='mainbuttons' type="submit" value="Check Location" />
          </form>
        </div>

        <Map
            google={this.props.google}   //this loads the map onto the page with an inital center
            zoom={13}
            style={mapStyles}
            initialCenter={{ lat: 40.757975, lng: -73.985543}}
            gestureHandling= "cooperative"
            onClick={this.handleCLick}
          >
              {/* <Marker
                onClick={this.onMarkerClick} ///this sets marker and sets the name of the marker
                name={'helo'}
              /> */}

              {this.renderDestinations()}
              
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow} //this sets state for info window and creates a div for the info to live wihtin the info window
                onClose={this.onClose} //when the window is closed stat is changed back to false
                user={this.props.user}
              >
                <div className='info'>
                  <h2 id='window-style'>{this.state.selectedPlace.name}</h2>
                  <div id='stret'>{this.state.selectedPlace.address}</div>
                  <div id='stret'>strEAT Rating</div>
                  <div id='ven-rate'>
                    {this.state.selectedPlace.rating}
                  </div>
                  <img id='window-pic' src={this.state.selectedPlace.picture_url} />
                </div>
                
              </InfoWindow>
          </Map>  
        </div>    
        
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAOM_osGewNehPiY35iiyWR8pkMW0qrE50'
})(MapContainer);


//I need to load my database of vendors onto this page and create a marker and infowindow with name and rating for each vendor, look into geocode when i come back