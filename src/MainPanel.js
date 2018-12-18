import React, { Component } from 'react';
import PlacesList from './PlacesList'

class MainPanel extends Component {

  reloadMarkers = (e) => {
    const { markers, map, infowindows } = this.props
    markers.map(place => place.setMap(map))
    infowindows.map(infowindow => infowindow.close())
  }

  getID = (e) => {
    if (this.props.onGetID) {
      this.props.onGetID(e)
    }
  }

  render() {
    const { markers, map, maps, init, places, infowindows, renderImages } = this.props
    return (
      <div className="main-panel">
        <h3>Places to eat</h3>
        <button className="reload" onClick={(e) => this.reloadMarkers(e)}></button>
        <PlacesList
          onGetID={(e) => {
            this.getID(e)
          }}
          renderImages={renderImages}
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
