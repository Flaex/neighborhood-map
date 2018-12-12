import React, { Component } from 'react';

class PlacesList extends Component {

  filterClick = (e) => {
    const { markers, map } = this.props
    const titleMatch = markers.filter((place) => place.title === e)
    const titleNoMatch = markers.filter((place) => place.title !== e)
    if (titleMatch[0].title === e) {
    titleNoMatch.map(place => place.setMap(null))
    titleMatch.map(place => place.setMap(map))
    }
  }

  listClick = (e) => {
    const { markers, map, infowindows } = this.props
    const indexMatch = infowindows[e]
    const markerMatch = markers[e]
    console.log(indexMatch, markerMatch)
    console.log(e)



  }

  render() {
    const { places } = this.props
    return (
      <div>
        <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
            <button id={places.indexOf(place)}
              onClick={(e) => this.listClick(e.target.id)}>
            {place.id}. {place.title}</button>
          </li>
        ))}
        </ul>
        <h4>Filter locations</h4>
        <select onChange={(e) => this.filterClick(e.target.value)}>
          {places.map((place) => (
            <option key={place.id} value={place.title}>{place.title}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default PlacesList;
