import React, { Component } from 'react';
import PlacesList from './PlacesList'

class MainPanel extends Component {

  reloadAllMarkers = (e) => {
    const { markers, map } = this.props
    markers.map(place => place.setMap(map))
  }

  render() {
    const { markers, map, maps, init, places, infowindows } = this.props
    return (
      <div className="main-panel">
        <h3>Places to eat</h3>
        <button className="reload" onClick={(e) => this.reloadAllMarkers(e)}></button>
        <PlacesList
          places={places}
          markers={markers}
          infowindows={infowindows}
          map={map}
          maps={maps}
          init={init} />
      </div>
    );
  }
}

export default MainPanel;
