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
    mapObj : {},
    mapsObj : {},
    infowindowsArr: [],
    fourSquareIDs : []
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
      // let label = places[i].id
      var iconImage = {
        url: 'icons/restaurant.svg',
        size: new maps.Size(25,25),
        origin: new maps.Point(0, 0),
        anchor: new maps.Point(0, 0),
        scaledSize: new maps.Size(25, 25)
      }
      //
      let marker = new maps.Marker({
        map: map,
        position: position,
        // label: label,
        title: title,
        icon: iconImage,
        animation: maps.Animation.DROP
      })
      let infowindow = new maps.InfoWindow()
      infowindows.push(infowindow)
      markers.push(marker)

      this.setState({markersArr: markers})
      this.setState({infowindowsArr: infowindows})
      this.setState({mapObj: map})
      this.setState({mapsObj: maps})

      marker.addListener('click', () => {
      //
        if (infowindow.marker !== marker) {
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
        }
      })
    }
  }

  getImage = (index) => {
    const { places } = this.state
    const lat = places[index].location.lat
    const lng = places[index].location.lng
    PlacesAPI.searchVenue(lat, lng).then((location) => {
      const id = location.response.venues[0].id
      console.log(id)
      PlacesAPI.getImage(id).then((arr) => {
        console.log(arr.response.photos.items[0].prefix+ 100 + arr.response.photos.items[0].suffix)
      })
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="main-title">My favorite places to eat in my Neighborhood</h1>
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
            onGetImage={(index) => {
              this.getImage(index)
            }}
            infowindows={this.state.infowindowsArr}
            map={this.state.mapObj}
            maps={this.state.mapsObj}
            places={this.state.places}
            markers={this.state.markersArr}
            init={this.init} />
        </div>
      </div>
    );
  }
}

export default Map;
