import React, { Component } from 'react';
import './App.css';
import { CharacterList } from './components/CharacterList';
import { CharacterDetails } from './components/CharacterDetails';
import { SearchBar } from './components/SearchBar';
import { MarvelService } from './services/MarvelService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      characters: [],
      selectedCharacter: null,
    };

    this.fetchCharacters = this.fetchCharacters.bind(this);
    this.fetchCharacter = this.fetchCharacter.bind(this);

    this.marvelService = new MarvelService({
      apiKey: this.props.apiKey,
    });
  }

  render() {
    const detailsElem = this.state.selectedCharacter
      ? (
        <CharacterDetails
          character={ this.state.selectedCharacter }
          onClose={ () => this.setState({ selectedCharacter: null } )}
        />
      )
      : '';

    return (
      <section>
        <SearchBar
          searchTerm={ this.state.searchTerm }
          onSubmit={ (searchTerm) => this.setState({ searchTerm })}
        />
        <CharacterList
          characters={ this.state.characters }
          searchTerm={ this.state.searchTerm }
          isLoading={ this.state.isLoading }
          onCharacterClick={ this.fetchCharacter }
        />
        { detailsElem }
      </section>
    );
  }

  componentDidUpdate(_, prevState) {
    if (
      (this.state.searchTerm)
      && (this.state.searchTerm !== prevState.searchTerm)
    ) {
      this.fetchCharacters({ nameStartsWith: this.state.searchTerm });
      this.setState({ isLoading: true });
    }
  }

  fetchCharacters(config = {}) {
    return this.marvelService.getCharacters(config)
      .then((data) => this.setState({ characters: data.results, isLoading: false }))
      .catch((err) => console.error(err));
  }

  fetchCharacter(id, config = {}) {
    return this.marvelService.getCharacter(id, config)
      .then((data) => this.setState({ selectedCharacter: data.results[0] }))
      .catch((err) => console.error(err));
  }
}

export default App;
