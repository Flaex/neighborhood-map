import React, { Component } from 'react';
import PlacesList from './PlacesList'
import PlacesSearch from './PlacesSearch'

class MainPanel extends Component {

  reloadAllMarkers = (e) => {
    const { markers, map } = this.props
    markers.map(place => place.setMap(map))
  }

  render() {
    const { markers, map, init } = this.props
    return (
      <div className="main-panel">
        <h3>Places to eat</h3>
        <button className="reload" onClick={(e) => this.reloadAllMarkers(e)}></button>
        <PlacesList
          places={this.props.places}
          markers={markers}
          map={map}
          init={init} />
        <PlacesSearch/>
      </div>
    );
  }
}

export default MainPanel;
