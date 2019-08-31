import React, { Component } from 'react';

export class CharacterSummary extends Component {
  render() {
    return (
      <button className="character-summary" onClick={ this.props.onClick }>
        <figure className="character-summary__image">
          <img src={ this.props.character.thumbnail.path + '.' + this.props.character.thumbnail.extension } alt="" />
        </figure>
        <div className="character-summary__info">
          <h2>{ this.props.character.name }</h2>
        </div>
      </button>
    );
  }
}
