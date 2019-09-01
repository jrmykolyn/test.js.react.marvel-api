import React, { Component } from 'react';

export class SearchTypeControls extends Component {
  render() {
    return (
      <div className="search-type-controls">
        <label for="selectCharacters">
          <input
            id="selectCharacters"
            name="searchType"
            type="radio"
            checked={ this.props.searchType === 'Characters' }
            onClick={ this.props.onCharactersClick }
          />
          <span>Characters</span>
        </label>
        <label for="selectComics">
          <input
            id="selectComics"
            name="searchType"
            type="radio"
            checked={ this.props.searchType === 'Comics' }
            onClick={ this.props.onComicsClick }
          />
          <span>Comics</span>
        </label>
      </div>
    );
  }
}
