import React, { Component } from 'react';

class PlacesList extends Component {

  captureClick = (e) => {
    const { markers, map } = this.props
    const titleMatch = markers.filter((place) => place.title === e)
    const titleNoMatch = markers.filter((place) => place.title !== e)
    if (titleMatch[0].title === e) {
    titleNoMatch.map(place => place.setMap(null))
    titleMatch.map(place => place.setMap(map))
    }
  }

  render() {
    const { places } = this.props
    return (
      <ul className="places-list">
      {places.map((place) => (
        <li key={place.id}>
          <button title={place.title}
            onClick={(e) => this.captureClick(e.target.title)}>
          {place.title}</button>
        </li>
      ))}
      </ul>
    );
  }
}

export default PlacesList;
