import React, { Component } from 'react';

export class CharacterCard extends Component {
  render() {
    return (
      <button className="character-card" onClick={ this.props.onClick }>
        <figure className="character-card__image">
          <img src={ this.props.character.thumbnail.path + '.' + this.props.character.thumbnail.extension } alt="" />
        </figure>
        <div className="character-card__info">
          <h2>{ this.props.character.name }</h2>
        </div>
      </button>
    );
  }
}
