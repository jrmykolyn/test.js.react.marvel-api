import React, { Component } from 'react';
import './App.css';
import { ResultsList } from './components/ResultsList';
import { ResultDetails } from './components/ResultDetails';
import { SearchBar } from './components/SearchBar';
import { Error } from './components/Error';
import { Loading } from './components/Loading';
import { LoadMore } from './components/LoadMore';
import { MarvelService } from './services/MarvelService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchType: 'Characters',
      results: [],
      selectedResult: null,
    };

    this.fetchCharacters = this.fetchCharacters.bind(this);
    this.fetchMoreCharacters = this.fetchMoreCharacters.bind(this);
    this.fetchCharacter = this.fetchCharacter.bind(this);

    this.fetchComics = this.fetchComics.bind(this);
    this.fetchMoreComics = this.fetchMoreComics.bind(this);
    this.fetchComic = this.fetchComic.bind(this);

    this.marvelService = new MarvelService({
      apiKey: this.props.apiKey,
    });
  }

  render() {
    const detailsElem = this.state.selectedResult
      ? (
        <ResultDetails
          image={ this.state.selectedResult.thumbnail.path +  '.' + this.state.selectedResult.thumbnail.extension }
          title={ this.state.searchType === 'Characters' ? this.state.selectedResult.name : this.state.selectedResult.title }
          description={ this.state.selectedResult.description }
          stories={ this.state.selectedResult.stories }
          urls={ this.state.selectedResult.urls }
          onClose={ () => this.setState({ selectedResult: null } )}
        />
      )
      : '';

    const resultsElem = this.state.hasError
      ? <Error />
      : this.state.isLoading
        ? <Loading searchTerm={ this.state.searchTerm } />
        : (
          <ResultsList
            results={ this.state.results }
            searchTerm={ this.state.searchTerm }
            searchType={ this.state.searchType }
            onResultClick={ this.state.searchType === 'Characters' ? this.fetchCharacter : this.fetchComic  }
          />
        );

    const loadMoreElem = (
      this.state.canLoadMore
      && !this.state.error
      && !this.state.isLoading
      && !this.state.isLoadingMore
    )
      ? <LoadMore onClick={ this.state.searchType === 'Characters' ? this.fetchMoreCharacters : this.fetchMoreComics } />
      : '';

    return (
      <section className="app">
        <SearchBar
          searchTerm={ this.state.searchTerm }
          searchType={ this.state.searchType }
          onSubmit={ (searchTerm) => this.setState({ searchTerm }) }
          onSelect={ (searchType) => this.setState({ searchType }) }
        />
        { resultsElem }
        { loadMoreElem }
        { detailsElem }
      </section>
    );
  }

  componentDidUpdate(_, prevState) {
    const searchTerm = this.state.searchTerm;
    const searchType = this.state.searchType;
    const prevSearchTerm = prevState.searchTerm;
    const prevSearchType = prevState.searchType;

    if (
      searchTerm
      && (searchTerm !== prevSearchTerm || searchType !== prevSearchType)
    ) {
      return searchType  === 'Characters'
        ? this.fetchCharacters({ nameStartsWith: searchTerm })
        : this.fetchComics({ titleStartsWith: searchTerm });
    }
  }

  fetchCharacters(params = {}) {
    this.setState({ isLoading: true, hasError: false });

    return this.marvelService.getCharacters(params)
      .then((data) => this.setState({
        results: data.results,
        isLoading: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.error(err);
        this.setState({ isLoading: false, hasError: true });
      });
  }

  fetchMoreCharacters(config = {}) {
    this.setState({ isLoadingMore: true });

    return this.marvelService.getCharacters({
      nameStartsWith: this.state.searchTerm,
      offset: this.state.results.length
    })
      .then((data) => this.setState({
        results: [...this.state.results, ...data.results],
        isLoadingMore: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.error(err);
        this.setState({ isLoadingMore: false, hasError: true });
      });
  }

  fetchCharacter(id, config = {}) {
    return this.marvelService.getCharacter(id, config)
      .then((data) => this.setState({ selectedResult: data.results[0] }))
      .catch((err) => console.error(err));
  }

  fetchComics(params) {
    this.setState({ isLoading: true, hasError: false });

    this.marvelService.getComics(params)
      .then((data) => console.log(data) || this.setState({
        results: data.results,
        isLoading: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, hasError: true });
      });
  }

  fetchMoreComics(params) {
    this.setState({ isLoadingMore: true });

    return this.marvelService.getComics({
      titleStartsWith: this.state.searchTerm,
      offset: this.state.results.length,
    })
      .then((data) => this.setState({
        results: [...this.state.results, ...data.results],
        isLoadingMore: false,
        canLoadMore: data.total > (data.offset + data.count),
      }))
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, hasError: true });
      });
  }

  fetchComic(id, config = {}) {
    return this.marvelService.getComic(id, config)
      .then((data) => this.setState({ selectedResult: data.results[0] }))
      .catch((err) => console.error(err));
  }
}

export default App;
