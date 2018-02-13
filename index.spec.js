const axios = require('axios');
const sinon = require('sinon');
const { expect } = require('chai');

const Infura = require('./');

describe('Infura Rest Client', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    this.infura = new Infura();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should exist', () => {
    expect(this.infura).to.exist;
  });

  describe('constructUrl', () => {
    it('should override the versions api in url if provided in second parameter', () => {
      const url = this.infura.constructUrl('', { apiVersion: 'v100' });
      expect(url).to.equal(`${this.infura.baseUrl}/v100/`);
    });

    it('should return a url comprised of this.baseUrl, this.versions.api, and the path parameter', () => {
      const url = this.infura.constructUrl('a/path');
      expect(url).to.equal(`${this.infura.baseUrl}/${this.infura.versions.api}/a/path`);
    });
  });

  describe('genericGet', () => {
    it('should invoke the GET request method with url', async () => {
      const url = 'url';
      const axiosStub = sandbox.stub(axios, 'get');
      await this.infura.genericGet(url);
      expect(axiosStub.calledWith(url));
    });

    it('should resolve data if the GET request method resolves with data', async () => {
      const axiosSuccessStub = sandbox.stub(axios, 'get').resolves({ data: 'test' });
      const data = await this.infura.genericGet('url');
      expect(data).to.equal('test');
    });

    it('should throw error if the GET request method rejects with an error', async () => {
      const axiosErrorStub = sandbox.stub(axios, 'get').rejects(new Error('test'));
      try {
        await this.infura.genericGet('url');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('genericPost', () => {
    it('should invoke the POST request method with url', async () => {
      const url = 'url';
      const axiosStub = sandbox.stub(axios, 'post');
      await this.infura.genericPost(url);
      expect(axiosStub.calledWith(url));
    });

    it('should resolve data if the POST request method resolves with data', async () => {
      const axiosSuccessStub = sandbox.stub(axios, 'post').resolves({ data: 'test' });
      const data = await this.infura.genericPost('url');
      expect(data).to.equal('test');
    });

    it('should throw error if the GET request method reject with an error', async () => {
      const axiosErrorStub = sandbox.stub(axios, 'post').rejects(new Error('test'));
      try {
        await this.infura.genericPost('url');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('getClientMethods', () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getClientMethods();
      expect(constructUrlStub.calledWith('jsonrpc/mainnet/methods'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getClientMethods();
      expect(data).to.equal('test');
    });

    it('should throw error if genericGet method rejects with error', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').rejects(new Error('test'));
      try {
        await this.infura.getClientMethods();
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('getClientMethod', async () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getClientMethod('eth_mining');
      expect(constructUrlStub.calledWith('jsonrpc/mainnet/eth_mining'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getClientMethod();
      expect(data).to.equal('test');
    });

    it('should throw error if genericGet method rejects with error', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').rejects(new Error('test'));
      try {
        await this.infura.getClientMethod();
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('postClientMethod', async () => {
    it('should invoke constructUrl and genericPost', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericPostStub = sandbox.stub(this.infura, 'genericPost');
      await this.infura.postClientMethod('eth_mining');
      expect(constructUrlStub.calledWith('jsonrpc/mainnet'));
      expect(genericPostStub.calledWith({
        id: 1,
        jsonrpc: this.infura.versions.jsonrpc,
        method: 'eth_mining',
        params: []
      }));
    });

    it('should resolve data if genericPost method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericPost').resolves('test');
      const data = await this.infura.postClientMethod();
      expect(data).to.equal('test');
    });

    it('should throw error if genericPost method rejects with error', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericPost').rejects(new Error('test'));
      try {
        await this.infura.postClientMethod();
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('getTickerSymbols', async () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getTickerSymbols();
      expect(constructUrlStub.calledWith('/ticker/symbols'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getTickerSymbols();
      expect(data).to.equal('test');
    });
  });

  describe('getTickerSymbol', async () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getTickerSymbol('ethusd');
      expect(constructUrlStub.calledWith('/ticker/ethusd'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getTickerSymbol();
      expect(data).to.equal('test');
    });
  });

  describe('getTickerSymbolFull', async () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getTickerSymbolFull('ethusd');
      expect(constructUrlStub.calledWith('/ticker/ethusd/full'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getTickerSymbolFull();
      expect(data).to.equal('test');
    });
  });

  describe('getBlacklist', async () => {
    it('should invoke constructUrl and genericGet', async () => {
      const constructUrlStub = sandbox.stub(this.infura, 'constructUrl');
      const genericGetStub = sandbox.stub(this.infura, 'genericGet');
      await this.infura.getBlacklist('ethusd');
      expect(constructUrlStub.calledWith('/blacklist'));
      expect(genericGetStub.calledOnce);
    });

    it('should resolve data if genericGet method resolves with data', async () => {
      sandbox.stub(this.infura, 'constructUrl');
      sandbox.stub(this.infura, 'genericGet').resolves('test');
      const data = await this.infura.getBlacklist();
      expect(data).to.equal('test');
    });
  });
});
