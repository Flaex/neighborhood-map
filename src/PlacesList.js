import React, { Component } from 'react';


class PlacesList extends Component {

  render() {
    const { places } = this.props
    return (
      <div>
        <h3>Places to eat</h3>
        <ul className="places-list">
        {places.map((place) => (
          <li key={place.id}>
          <p>{place.title}</p>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default PlacesList;
