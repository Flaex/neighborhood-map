import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MainPanel from './MainPanel'
import * as PlacesAPI from './PlacesAPI'
import './styles.css';

class Map extends Component {

  constructor(props) {
    super(props)
    this.getImage = this.getImage.bind(this)
  }

  static defaultProps = {
    center: {
      lat: 10.4998329,
      lng: -66.8451149
    },
    zoom: 17
  }

  state = {
    places: [],
    filteredPlace: [],
    markersArr: [],
    mapObj: {},
    mapsObj: {},
    infowindowsArr: []
  }

  componentDidMount() {
    PlacesAPI.getAll().then((places) => {
      this.setState({places})
      this.setState({filteredPlace: places})
    })
  }

  //Initialization method
  init(map, maps) {
    const {places} = this.state
    let markers = []
    let infowindows = []
    for (let i = 0; i < places.length; i++) {
      let position = places[i].location
      let title = places[i].title
      //Custom icon based on https://material.io/tools/icons/?icon=restaurant&style=baseline
      const iconImage = {
        url: 'static/img/icons/restaurant.svg',
        size: new maps.Size(35, 35),
        origin: new maps.Point(0, 0),
        anchor: new maps.Point(0, 0),
        scaledSize: new maps.Size(35, 35)
      }
      //Assigning values to markers
      let marker = new maps.Marker({map: map, position: position, title: title, icon: iconImage, animation: maps.Animation.DROP})
      let infowindow = new maps.InfoWindow()
      infowindows.push(infowindow)
      markers.push(marker)
      //Assigning states to passing data to child components as props
      this.setState({markersArr: markers})
      this.setState({infowindowsArr: infowindows})
      this.setState({mapObj: map})
      this.setState({mapsObj: maps})

      //Avoid focus on child element to help tab navigation
      const mapMainContainer = document.querySelector('.gm-style').firstElementChild;
      mapMainContainer.setAttribute('aria-hidden', 'true');
      mapMainContainer.setAttribute('tabIndex', '-1');
    }
  }

  //Render infowindows and markers bouncing onMouseOver event in restaurant list elements
  renderInfowindow = (e, map, maps) => {
    const {markersArr, mapObj, mapsObj, infowindowsArr, filteredPlace} = this.state
    const markerIndex = markersArr.findIndex(x => x.title === e)
    const marker = markersArr[markerIndex]
    //Avoid remove marker bouncing if infowindow is populated
    if (filteredPlace.length === 1) {
      marker.setAnimation(mapsObj.Animation.BOUNCE)
    } else if (marker.map !== null) {
      infowindowsArr[markerIndex].marker = marker
      infowindowsArr[markerIndex].setContent(`<div><h5>${marker.title}</h5></div>`)
      infowindowsArr[markerIndex].open(mapObj, marker)
      marker.setAnimation(mapsObj.Animation.BOUNCE)
    } else if (marker.map === null) {
      marker.setMap(map)
      marker.setAnimation(mapsObj.Animation.BOUNCE)
      infowindowsArr[markerIndex].marker = marker
      infowindowsArr[markerIndex].setContent(`<div><h5>${marker.title}</h5></div>`)
      infowindowsArr[markerIndex].open(mapObj, marker)
    }
  }

  //Remove infowindows and markers animation onMouseLeave event in restaurant list elements
  removeInfowindow = (e) => {
    const {markersArr, infowindowsArr, filteredPlace} = this.state
    const markerIndex = markersArr.findIndex(x => x.title === e)
    const marker = markersArr[markerIndex]
    //Remove bouncing if infowindow is populated
    if (filteredPlace.length === 1) {
      marker.setAnimation(null)
    } else {
      infowindowsArr[markerIndex].close()
      marker.setAnimation(null)
    }
  }

  //Getting data from Foursquare API to populate infowindows
  dropDownSelection = (e) => {
    const {places} = this.state
    const lat = places[e].location.lat
    const lng = places[e].location.lng
    //Getting Foursquare venue ID's
    PlacesAPI.searchVenue(lat, lng).then((location) => {
      //Copying the state
      let placesTemp = places
      //Assigning values to a specific index object
      placesTemp[e].id = location.response.venues[0].id
      placesTemp[e].category = location.response.venues[0].categories[0].pluralName
      placesTemp[e].address = location.response.venues[0].location.address
      this.getImage(e, places)
    })
  }

  //Getting images from Foursquare API
  getImage = (e, places) => {
    const {markersArr, mapObj, infowindowsArr} = this.state
    const selectedMarker = markersArr[e]
    const id = places[e].id
    PlacesAPI.getImage(id).then((arr) => {
      // Copying the state
      let placesTemp = places
      //Assigning venue Photos to places
      placesTemp[e].imageURL = arr.response.photos.items[0].prefix + 130 + arr.response.photos.items[0].suffix
      //Rendering markers + infowindow with data from Foursquare API on dropdown selection
      const markerMatch = markersArr.filter((marker) => marker === selectedMarker)
      const markerNomatch = markersArr.filter((marker) => marker !== selectedMarker)
      if (e === 'choose') {
        //Avoid errors if "Choose a restaurant" option is selected on dropdown
      } else {
        //Set selected marker location on map
        markerNomatch.map(marker => marker.setMap(null))
        markerMatch.map(marker => marker.setMap(mapObj))
        infowindowsArr[e].marker = selectedMarker
        infowindowsArr[e].setContent(`<div class="infowindow"><div class="infowindow-image" style="background-image: url('${places[e].imageURL}')"></div><div class="place-info"><h5>${places[e].title}</h5><p>${places[e].category}</p><address>${places[e].address}</address></div></div>`)
        infowindowsArr[e].open(mapObj, selectedMarker)
        //Filter places list to match selection
        let selectedPlace = []
        selectedPlace.push(places[e])
        this.setState({filteredPlace: selectedPlace})
      }
    })
  }

  reloadLocations = (e) => {
    const {markersArr, mapObj, infowindowsArr, places} = this.state
    markersArr.map(place => place.setMap(mapObj))
    infowindowsArr.map(infowindow => infowindow.close())
    this.setState({filteredPlace: places})
  }

  openNav() {
    document.querySelector('.main-panel').style.width = '180px';
  }

  render() {
    return (<div tabIndex="-1">
      <header tabIndex="-1">
        <h1 tabIndex="0" className="main-title">My favorite places to eat in my Neighborhood</h1>
      </header>
      {/* Component defined on https://www.npmjs.com/package/google-map-react */}
      <div className="map" style={{
          height: '90vh',
          width: '100%'
        }}>
        <GoogleMapReact bootstrapURLKeys={{
            key: 'AIzaSyBB4845mdrbpL1Ub833ZI1JzneXenLBU_Q'
          }} defaultCenter={this.props.center} defaultZoom={this.props.zoom} onGoogleApiLoaded={({map, maps}) => this.init(map, maps)} yesIWantToUseGoogleMapApiInternals={true}></GoogleMapReact>
        <button tabIndex="-1" className="open-menu" onClick={(e) => this.openNav(e)}>&#9776;</button>
        <MainPanel dropDownSelection={(e) => {
            this.dropDownSelection(e)
          }} renderInfowindow={(e) => {
            this.renderInfowindow(e)
          }} removeInfowindow={(e) => {
            this.removeInfowindow(e)
          }} reloadLocations={(e) => {
            this.reloadLocations(e)
          }} places={this.state.places} filteredPlace={this.state.filteredPlace}/>
      </div>
    </div>);
  }
}

export default Map;
