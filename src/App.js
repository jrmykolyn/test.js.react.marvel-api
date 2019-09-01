import React, { Component } from 'react';
import './App.css';
import { CharacterList } from './components/CharacterList';
import { CharacterDetails } from './components/CharacterDetails';
import { SearchBar } from './components/SearchBar';
import { Error } from './components/Error';
import { LoadMore } from './components/LoadMore';
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
    this.fetchMoreCharacters = this.fetchMoreCharacters.bind(this);
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

    const content = this.state.hasError
      ? <Error />
      : (
        <CharacterList
          characters={ this.state.characters }
          searchTerm={ this.state.searchTerm }
          isLoading={ this.state.isLoading }
          canLoadMore={ this.state.canLoadMore }
          onCharacterClick={ this.fetchCharacter }
          onLoadMoreClick={ this.fetchMoreCharacters }
        />
      );

    const loadMore = this.state.canLoadMore && !this.state.error
      ? <LoadMore onClick={ this.fetchMoreCharacters } />
      : '';

    return (
      <section>
        <SearchBar
          searchTerm={ this.state.searchTerm }
          onSubmit={ (searchTerm) => this.setState({ searchTerm })}
        />
        { content }
        { loadMore }
        { detailsElem }
      </section>
    );
  }

  componentDidUpdate(_, prevState) {
    if (
      (this.state.searchTerm)
      && (this.state.searchTerm !== prevState.searchTerm)
    ) {
      this.fetchCharacters();
    }
  }

  fetchCharacters() {
    this.setState({ isLoading: true, hasError: false });

    return this.marvelService.getCharacters({
      nameStartsWith: this.state.searchTerm,
    })
      .then((data) => this.setState({
        characters: data.results,
        isLoading: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.error(err);
        this.setState({ hasError: true });
      });
  }

  fetchMoreCharacters(config = {}) {
    return this.marvelService.getCharacters({
      nameStartsWith: this.state.searchTerm,
      offset: this.state.characters.length
    })
      .then((data) => this.setState({
        characters: [...this.state.characters, ...data.results],
        isLoading: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.error(err);
        this.setState({ hasError: true });
      });
  }

  fetchCharacter(id, config = {}) {
    return this.marvelService.getCharacter(id, config)
      .then((data) => this.setState({ selectedCharacter: data.results[0] }))
      .catch((err) => console.error(err));
  }
}

export default App;
