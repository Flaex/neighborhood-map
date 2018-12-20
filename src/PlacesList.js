import React, { Component } from 'react';

class PlacesList extends Component {
  //Capture value selected option in dropdown
  dropDownSelection = (e) => {
    if (this.props.dropDownSelection) {
      this.props.dropDownSelection(e)
    }
  }

  //Render infowindows onMouseOver event in restaurant list elements
  renderInfowindow = (e) => {
    if (this.props.renderInfowindow) {
      this.props.renderInfowindow(e)
    }
  }

  //Remove infowindows onMouseLeave event in restaurant list elements
  removeInfowindow = (e) => {
    if (this.props.removeInfowindow) {
      this.props.removeInfowindow(e)
    }
  }

  render() {
    const { places, filteredPlace } = this.props
    return (
      <div className="places-container">
        <ul className="places-list">
        {filteredPlace.map((place) => (
          <li key={place.id}>
            <p id={place.title}
              onMouseOver={(e) => this.renderInfowindow(e.target.id)}
              onMouseLeave={(e) => this.removeInfowindow(e.target.id)}
              >
            {place.title}</p>
            <p className="category">{place.description}</p>
          </li>
        ))}
        </ul>
        <h4>Place details</h4>
        <select onChange={(e) => this.dropDownSelection(e.target.value)}>
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
