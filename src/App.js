import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MainPanel from './MainPanel'
import * as PlacesAPI from './PlacesAPI'
import './styles.css';

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 10.4998329,
      lng: -66.8451149
    },
    zoom: 17
  }

  state = {
    places : [],
    markersArr : [],
    infowindowsArr : [],
    mapObj : {}
  }

  componentDidMount() {
  PlacesAPI.getAll().then((places) => {
      this.setState({ places })
    })
  }

  init(map, maps, id) {
    const { places } = this.state
    let markers = []
    let infowindows = []
    for (let i = 0; i < places.length; i++) {
      //
      let position = places[i].location
      let title = places[i].title
      let label = places[i].id
      //
      let marker = new maps.Marker({
        map: map,
        position: position,
        label: label,
        title: title,
        animation: maps.Animation.DROP
      })
      let infowindow = new maps.InfoWindow({
        content: '<div>' + marker.title + '</div>'
      })
      markers.push(marker)
      infowindows.push(infowindow)
      this.setState({markersArr: markers})
      this.setState({infowindowsArr: infowindows})
      this.setState({mapObj: map})

        // marker.addListener('mouseover', () => {
        // //
        //   if (iws.marker !== marker) {
        //     iws.marker = marker;
        //     iws.setContent('<div>' + marker.title + '</div>');
        //     iws.open(map, marker)
        //     //
        //     iws.addListener('closeclick',function(){
        //       iws.setMarker = null
        //     })
        //   }
        // })
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
            places={this.state.places}
            markers={this.state.markersArr}
            infowindows={this.state.infowindowsArr}
            init={this.init} />
        </div>
      </div>
    );
  }
}

export default Map;
