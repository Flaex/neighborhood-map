import React, { Component } from 'react';

class PlacesList extends Component {
  //Render marker for selected option in dropdown
  filterClick = (e) => {
    const { markers, map, infowindows } = this.props
    const selectedMarker = markers[e]
    const index = e
    const markerMatch =  markers.filter((marker) => marker === selectedMarker )
    const markerNomatch =  markers.filter((marker) => marker !== selectedMarker )
    if (e === 'choose') {
      //Avoid errors if "Choose a restaurant" option is selected on dropdown
    } else {
      markerNomatch.map(marker => marker.setMap(null))
      markerMatch.map(marker => marker.setMap(map))
      infowindows[e].marker = selectedMarker
      infowindows[e].setContent(`<div class="infowindow">${selectedMarker.title}</div>`)
      infowindows[e].open(map, selectedMarker)
    }
    if (this.props.onGetImage) {
      this.props.onGetImage(index)
    }
  }
   //Render infowindows onMouseOver event in restaurant list elements
  renderInfowindow = (e) => {
    const { markers, map, maps, infowindows } = this.props
    const marker = markers[e]
    if (marker.map !== null) {
      infowindows[e].marker = marker
      infowindows[e].setContent(`<div class="infowindow">${marker.title}</div>`)
      infowindows[e].open(map, marker)
      marker.setAnimation(maps.Animation.BOUNCE)
    } else if (marker.map === null) {
      marker.setMap(map)
      marker.setAnimation(maps.Animation.BOUNCE)
      infowindows[e].marker = marker
      infowindows[e].setContent(`<div class="infowindow">${marker.title}</div>`)
      infowindows[e].open(map, marker)
    }
  }
  //Remove infowindows onMouseLeave event in restaurant list elements
  removeInfowindow = (e) => {
    const { markers, infowindows } = this.props
    const marker = markers[e]
    infowindows[e].close()
    marker.setAnimation(null)
  }

  render() {
    const { places } = this.props
    return (
      <div className="places-container">
        <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
            <p id={places.indexOf(place)}
              onMouseOver={(e) => this.renderInfowindow(e.target.id)}
              onMouseLeave={(e) => this.removeInfowindow(e.target.id)}>
            {place.title}</p>
            <p className="category">{place.category}</p>
          </li>
        ))}
        </ul>
        <h4>Filter locations</h4>
        <select onChange={(e) => this.filterClick(e.target.value)}>
          <option value='choose' defaultValue>Choose a restaurant:</option>
          {places.map((place) => (
            <option key={place.id} value={places.indexOf(place)}>{place.title}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default PlacesList;
