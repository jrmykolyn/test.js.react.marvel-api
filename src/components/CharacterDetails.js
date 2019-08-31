import React, { Component } from 'react';

export class CharacterDetails extends Component {
  render() {
    console.log(this.props.character);

    return (
      <article className="character-details">
        <div className="character-details__backdrop"></div>
        <div className="character-details__info">
          <figure>
            <img src={ this.props.character.thumbnail.path + '.' + this.props.character.thumbnail.extension } alt="" />
          </figure>
          <h1>{ this.props.character.name }</h1>
          <p><strong>Appears In: { this.props.character.stories.available || 0 } stories</strong></p>
          <p>{ this.props.character.description }</p>
          <p><strong>Links:</strong></p>
          <ul>
            { this.props.character.urls.map(({ url, type }, i) => <li key={ i }><a href={ url } target="_blank" rel="noopener noreferrer">{ type }</a></li>) }
          </ul>
          <button onClick={ this.props.onClose }></button>
        </div>
      </article>
    );
  }
}
