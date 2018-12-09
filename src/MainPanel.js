import React, { Component } from 'react';
import PlacesList from './PlacesList'
import PlacesSearch from './PlacesSearch'



class MainPanel extends Component {

  render() {
    return (
      <div className="main-panel">
        <PlacesList places={this.props.places} />
        <PlacesSearch/>
      </div>
    );
  }
}

export default MainPanel;
