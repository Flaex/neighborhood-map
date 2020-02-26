import React, { Component } from 'react';
import PropTypes from 'prop-types';

// To validate the props
const propTypes = {
  dropDownSelection: PropTypes.func.isRequired,
  renderInfowindow: PropTypes.func.isRequired,
  removeInfowindow: PropTypes.func.isRequired,
  reloadLocations: PropTypes.func.isRequired
}

class PlacesList extends Component {
  render() {
    const { places, filteredPlace } = this.props
    return (
      <div className="places-container" tabIndex="-1">
        <button className="close-menu" onClick={this.closeNav}>&times;</button>
        <h3 tabIndex="0">Places to eat</h3>
        <button className="reload" onClick={this.props.reloadLocations}>Reload list&#x21b7;</button>
        <ul className="places-list">
          {filteredPlace.map((place) => (
              <li key={place.id}>
                <p 
                  tabIndex="0" 
                  id={place.title} 
                  onMouseOver={(e) => this.props.renderInfowindow(e.target.id)} 
                  onMouseLeave={(e) => this.props.removeInfowindow(e.target.id)}
                >
                  {place.title}</p>
                <p tabIndex="0" className="category">{place.description}</p>
              </li>
            ))}
        </ul>
        <h4>Details</h4>
        <select className="places-dropdown" onChange={(e) => this.props.dropDownSelection(e.target.value)}>
          <option value='choose' defaultValue="defaultValue">Choose a place:</option>
          {places.map((place) => (<option key={place.id} value={places.indexOf(place)}>{place.title}</option>))}
        </select>
      </div>
    );
  }
}

PlacesList.propTypes = propTypes;

export default PlacesList;
