import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MainPanel from './MainPanel'
import './styles.css';

const places = [
  {id: 'place1', title: 'La Casa Bistró', location: {lat: 10.5023891, lng: -66.8436308}},
  {id: 'place2', title: 'Prana Juice Bar', location: {lat: 10.501294, lng: -66.8435723}},
  {id: 'place3', title: 'Chef Woo', location: {lat: 10.4972978, lng: -66.8475386}},
  {id: 'place4', title: 'Franca Cupcakes', location: {lat: 10.4987404, lng: -66.8472482}},
  {id: 'place5', title: 'Pincho Pan', location: {lat: 10.5007164, lng: -66.8438593}},
]

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 10.4998329,
      lng: -66.8451149
    },
    zoom: 17
  }

  state = {
    markersArr : [],
    mapObj : {}
  }

  init(map, maps, id) {
    let markers = []

    let iws= new maps.InfoWindow()
    for (let i = 0; i < places.length; i++) {
      //
      let position = places[i].location
      let title = places[i].title
      //
      let marker = new maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: maps.Animation.DROP
      })

      //
      markers.push(marker);
      this.setState({markersArr: markers})
      this.setState({mapObj: map})

      marker.addListener('mouseover', () => {
        //
        if (iws.marker !== marker) {
          iws.marker = marker;
          iws.setContent('<div>' + marker.title + '</div>');
          iws.open(map, marker)
          //
          iws.addListener('closeclick',function(){
            iws.setMarker = null
          })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="main-title">My top 5 places to eat in my Neighborhood</h1>
        </header>
        {/* Component defined on https://www.npmjs.com/package/google-map-react */}
        <div className="map" style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBB4845mdrbpL1Ub833ZI1JzneXenLBU_Q' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onGoogleApiLoaded={({map, maps}) => this.init(map, maps)}
            yesIWantToUseGoogleMapApiInternals
          >
          </GoogleMapReact>
          <MainPanel
            map={this.state.mapObj}
            places={places}
            markers={this.state.markersArr}
            init={this.init} />
        </div>
      </div>
    );
  }
}

export default Map;
