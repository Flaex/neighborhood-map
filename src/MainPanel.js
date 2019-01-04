import React, {Component} from 'react';
import PlacesList from './PlacesList'

class MainPanel extends Component {

  dropDownSelection = (e) => {
    if (this.props.dropDownSelection) {
      this.props.dropDownSelection(e)
    }
  }

  reloadLocations = (e) => {
    if (this.props.reloadLocations) {
      this.props.reloadLocations(e)
    }
  }

  renderInfowindow = (e) => {
    if (this.props.renderInfowindow) {
      this.props.renderInfowindow(e)
    }
  }

  removeInfowindow = (e) => {
    if (this.props.removeInfowindow) {
      this.props.removeInfowindow(e)
    }
  }

  render() {
    const {places, filteredPlace} = this.props
    return (<div className="main-panel" tabIndex="-1">
      <PlacesList dropDownSelection={(e) => {
          this.dropDownSelection(e)
        }} renderInfowindow={(e) => {
          this.renderInfowindow(e)
        }} removeInfowindow={(e) => {
          this.removeInfowindow(e)
        }} reloadLocations={(e) => {
          this.reloadLocations(e)
        }} places={places} filteredPlace={filteredPlace}/>
    </div>);
  }
}

export default MainPanel;
