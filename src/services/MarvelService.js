import axios from 'axios';

export class MarvelService {
  static get ENDPOINTS() {
    return {
      character: 'https://gateway.marvel.com:443/v1/public/characters',
      characters: 'https://gateway.marvel.com:443/v1/public/characters',
    };
  }

  constructor(config) {
    this.apiKey = config.apiKey;
  }

  getAuthConfig() {
    return { apikey: this.apiKey };
  }

  getCharacters(config = {}) {
    const params = { ...config, ...this.getAuthConfig() };
    const endpoint = MarvelService.ENDPOINTS.characters;

    return axios.get(endpoint, { params })
      .then((response) => response.data.data);
  }

  getCharacter(id, config = {}) {
    const params = { ...config, ...this.getAuthConfig() };
    const endpoint = `${MarvelService.ENDPOINTS.character}/${id}`;

    return axios.get(endpoint, { params })
      .then((response) => response.data.data);
  }
}
