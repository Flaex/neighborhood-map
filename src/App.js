import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import MainPanel from './MainPanel'
import './styles.css';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 10.5065673,
      lng: -66.8424434
    },
    zoom: 17
  };

  render() {
    return (
      <div>
        <header>
          <h1 className="main-title">Los Palos Grandes cool places</h1>
        </header>
        {/* Component defined on https://www.npmjs.com/package/google-map-react */}
        <div className="map" style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBB4845mdrbpL1Ub833ZI1JzneXenLBU_Q' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
          </GoogleMapReact>
          <MainPanel />
        </div>
      </div>
    );
  }
}

export default Map;
