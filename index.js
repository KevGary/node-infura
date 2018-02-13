const axios = require('axios');

/** A class for creating Infura rest clients */
class Infura {
  /**
   * Create an Inufra rest client
   * @param {string} [network=mainnet] Ethereum network
   */
  constructor(network = 'mainnet') {
    this.baseUrl = 'https://api.infura.io';
    this.network = network;
    this.networks = {
      kovan: 'kovan',
      mainnet: 'mainnet',
      rinkeby: 'rinkeby',
      ropsten: 'ropsten',
    };
    this.versions = {
      api: 'v1',
      jsonrpc: '2.0'
    };
  }

  /**
   * Constructs and returns url for interacting with Infura API
   * @param {string} path Suffix to url
   * @param {Object} [options] Override options for building url
   * @param {string} [options.apiVersion=v1] Override Infura API version to use in url
   * @returns {string} Constructed url
   */
  constructUrl(path, { apiVersion } = { apiVersion: this.versions.api }) {
    return `${this.baseUrl}/${apiVersion}/${path}`;
  }

  /**
   * Makes a GET request at url and handles response
   * @param {string} url Url to use in GET request
   * @returns {Promise} Promise representing the response of the GET reqeuest
   */
  async genericGet(url) {
    const response = await axios.get(url);
    return response.data;
  }

  /**
   * Makes a POST request at url with request body and handles response
   * @param {string} url Url to use in POST request
   * @param {Object} [requestBody] Request body to use in POST request
   * @returns {Promise} Promise representing the response of the POST request
   */
  async genericPost(url, requestBody) {
    const response = await axios.post(url, requestBody);
    return response.data;
  }

  /**
   * Gets client methods from Infura API
   * @param {string} [network=this.network] Override the default network used in GET request
   * @returns {Promise} Promise representing the response of this GET request
   */
  getClientMethods(network = this.network) {
    const url = this.constructUrl(`jsonrpc/${network}/methods`);
    return this.genericGet(url);
  }

  /**
   * Gets a client method from Infura API
   * @param {string} method The method to get
   * @param {string} [network=this.network] Override the default network used in GET request
   * @returns {Promise} Promise representing the response of this GET request
   */
  getClientMethod(method, network = this.network) {
    const url = this.constructUrl(`jsonrpc/${network}/${method}`);
    return this.genericGet(url);
  }

  /**
   * Posts a client method to Infura API
   * @param {string} method The method to post
   * @param {string[]} [params=[]] Parameters to be used in POST request
   * @param {string} [network=this.network] Override the default network used in POST request
   * @returns {Promise} Promise representing the response of this POST request
   */
  postClientMethod(method, params = [], network = this.network) {
    const url = this.constructUrl(`jsonrpc/${network}`);
    debugger;
    return this.genericPost(url, {
      id: 1,
      jsonrpc: this.versions.jsonrpc,
      method,
      params
    });
  }

  /**
   * Gets ticker symbols from Infura API
   * @returns {Promise} Promise representing the response of this GET request
   */
  getTickerSymbols() {
    const url = this.constructUrl(`ticker/symbols`);
    return this.genericGet(url);
  }

  /**
   * Gets information for a ticker symbol from Infura API
   * @param {string} symbol Valid symbol to get ticker information
   * @returns {Promise} Promise representing the response of this GET request
   */
  getTickerSymbol(symbol) {
    const url = this.constructUrl(`ticker/${symbol}`);
    return this.genericGet(url);
  }

  /**
   * Gets full information for a ticker symbol from Infura API
   * @param {string} symbol Valid symbol to get full ticker information
   * @returns {Promise} Promise representing the response of this GET request
   */
  getTickerSymbolFull(symbol) {
    const url = this.constructUrl(`ticker/${symbol}/full`);
    return this.genericGet(url);
  }

  /**
   * Gets blacklist from Infura API
   * @param {Object} [options] Override options for GET request
   * @param {string} [options.apiVersion=v2] Override Infura API version to use in GET request
   * @returns {Promise} Promise representing the response of this GET request
   */
  getBlacklist({ apiVersion } = { apiVersion: 'v2' }) {
    const url = this.constructUrl('blacklist', { apiVersion });
    return this.genericGet(url);
  }
}

module.exports = Infura;