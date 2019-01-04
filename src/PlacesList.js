import React, {Component} from 'react';

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

  reloadLocations = (e) => {
    if (this.props.reloadLocations) {
      this.props.reloadLocations(e)
    }
  }

  closeNav() {
    document.querySelector('.main-panel').style.width = '0px';
  }

  render() {
    const {places, filteredPlace} = this.props
    return (<div className="places-container" tabIndex="-1">
      <button className="close-menu" onClick={(e) => this.closeNav(e)}>&times;</button>
      <h3 tabIndex="0">Places to eat</h3>
      <button className="reload" onClick={(e) => this.reloadLocations(e)}>Reload list&#x21b7;</button>
      <ul className="places-list">
        {
          filteredPlace.map((place) => (<li key={place.id}>
            <p tabIndex="0" id={place.title} onMouseOver={(e) => this.renderInfowindow(e.target.id)} onMouseLeave={(e) => this.removeInfowindow(e.target.id)}>
              {place.title}</p>
            <p tabIndex="0" className="category">{place.description}</p>
          </li>))
        }
      </ul>
      <h4>Details</h4>
      <select className="places-dropdown" onChange={(e) => this.dropDownSelection(e.target.value)}>
        <option value='choose' defaultValue="defaultValue">Choose a place:</option>
        {places.map((place) => (<option key={place.id} value={places.indexOf(place)}>{place.title}</option>))}
      </select>
    </div>);
  }
}

export default PlacesList;
