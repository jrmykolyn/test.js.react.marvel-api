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

  encodeParams(params = {}) {
    return Object.keys(params)
      .map((key) => [key, params[key]])
      .map((tuple) => tuple.join('='))
      .join('&');
  }

  getCharacters(config = {}) {
    const params = this.encodeParams({ ...config, ...this.getAuthConfig() });
    const endpoint = MarvelService.ENDPOINTS.characters + '?' + params;

    return window.fetch(endpoint)
      .then((response) => response.json())
      .then((parsedResponse) => parsedResponse.data)
      .then((data) => {
        return data;
      });
  }

  getCharacter(id, config = {}) {
    const params = this.encodeParams({ ...config, ...this.getAuthConfig() });
    const endpoint = MarvelService.ENDPOINTS.character + '/'  + id + '?' + params;

    return window.fetch(endpoint)
      .then((response) => response.json())
      .then((parsedResponse) => parsedResponse.data)
      .then((data) => {
        return data;
      });
  }
}
