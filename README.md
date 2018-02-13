A Node.js client library for using the [Infura API](https://infura.docs.apiary.io).

# Install

```bash
npm install infura
```

# Usage

Instantiate new instance of API client with a specified, Ethereum network.

Options are `mainnet` (default), `kovan`, `rinkeby`, and `ropsten`.

```javascript
const Infura = require('infura');
const infura = new Infura('rinkeby');
```

## API

### getClientMethods

Get available GET and POST methods.

```javascript
infura.getClientMethods()
  .then(({ get, post }) => /* handle */)
  .catch(error => /* handle */);
```

### getClientMethod

Get available GET method.

```javascript
infura.getClientMethod('eth_blockNumber')
  .then(({ result }) => /* handle */)
  .catch(error => /* handle */);
```

### postClientMethod

Post available POST method.

### getTickerSymbols

Get ticker symbols.

```javascript
infura.getTickerSymbols()
  .then(({ symbols }) => /* handle */)
  .catch(error => /* handle */);
```

### getTickerSymbol

Get information about a ticker symbol.

```javascript
infura.getTickerSymbol('ethusd')
  .then(({
    ask,
    bid,
    exchange,
    num_exchanges,
    quote,
    timestamp
    total_volume,
    volume
  }) => /* handle */)
  .catch(error => /* handle */);
```

### getTickerSymbolFull

Get full information about a ticker symbol.

```javascript
infura.getFullTickerSymbol('ethusd')
  .then(({
    base,
    quote,
    tickers
  }) => /* handle */)
  .catch(error => /* handle */);
```

### getBlacklist

Get blackist information.

```javascript
infura.getFullTickerSymbol('ethusd')
  .then(({
    blacklist
    fuzzlist,
    tolerance,
    version,
    whitelist
  }) => /* handle */)
  .catch(error => /* handle */);
```

# Test

```bash
npm run test
```

# JSDoc

```bash
npm run jsdoc
```