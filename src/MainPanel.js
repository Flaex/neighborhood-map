import React, { Component } from 'react';
import PlacesList from './PlacesList'

class MainPanel extends Component {
  render() {
    const { 
      places, 
      filteredPlace,
      dropDownSelection,
      renderInfowindow,
      removeInfowindow,
      reloadLocations 
    } = this.props

    return (
      <div className="main-panel" tabIndex="-1">
        <PlacesList 
          dropDownSelection={dropDownSelection} 
          renderInfowindow={renderInfowindow} 
          removeInfowindow={removeInfowindow} 
          reloadLocations={reloadLocations} 
          places={places} 
          filteredPlace={filteredPlace}
        />
      </div>
    );
  }
}

export default MainPanel;
