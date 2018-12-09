import React, { Component } from 'react';


class PlacesSearch extends Component {

  render() {
    return (
      <div className="search-books-input-wrapper">
        <input
          type='text'
          placeholder='Search Places'
          // value={query}
          // onChange={(event) => this.updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default PlacesSearch;
