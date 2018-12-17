import React, { Component } from 'react';
import PlacesList from './PlacesList'

class MainPanel extends Component {

  reloadMarkers = (e) => {
    const { markers, map, infowindows } = this.props
    markers.map(place => place.setMap(map))
    infowindows.map(infowindow => infowindow.close())
  }

  getImage = (index) => {
    if (this.props.onGetImage) {
      this.props.onGetImage(index)
    }
  }

  render() {
    const { markers, map, maps, init, places, infowindows } = this.props
    return (
      <div className="main-panel">
        <h3>Places to eat</h3>
        <button className="reload" onClick={(e) => this.reloadMarkers(e)}></button>
        <PlacesList
          onGetImage={(index) => {
            this.getImage(index)
          }}
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
