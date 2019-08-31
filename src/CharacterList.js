import React, { Component } from 'react';
import { CharacterSummary } from './CharacterSummary';
import { NoCharacters } from './NoCharacters';
import { Loading } from './Loading';

export class CharacterList extends Component {
  render() {
    const characterElems = this.props.characters.length
      ? this.props.characters.map((character) => {
        return (
          <CharacterSummary
            character={ character }
            onClick={ () => this.props.onCharacterClick(character.id) }
          />
        );
      })
      : <NoCharacters searchTerm={ this.props.searchTerm } />;

    const content = this.props.isLoading
      ? <Loading searchTerm={ this.props.searchTerm } />
      : characterElems;

    return (
      <section className="character-list">
        { content }
      </section>
    );
  }
}
