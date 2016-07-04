import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import 'sinon-as-promised';

const offerParserStub = {parseOffers: sinon.stub().resolves({id: 1})};
const licensorParserStub = {parseLicensors: sinon.stub().resolves({id: 2})};
const linkParserStub = {parseLinks: sinon.stub().resolves({id: 3})};
const OfferSelector = proxyquire('../src/main', {
  './offer': offerParserStub,
  './licensor': licensorParserStub,
  './link': linkParserStub
});

describe('OfferSelector constructor', () => {
  it('should be be possible to override options', () => {
    const org = 'http://test';
    const selector = new OfferSelector({query: org});

    expect(selector.options.query).to.not.eql(new OfferSelector().options.query);
  });

  it('should be be possible to override nested defaults', () => {
    const selector = new OfferSelector({defaults: {color: 'blue'}});

    expect(selector.options.defaults.color).to.not.eql(new OfferSelector().options.defaults.color);
    expect(selector.options.defaults.price).to.eql(new OfferSelector().options.defaults.price);
  });
});

describe('OfferSelector loadOffers', () => {
  const queryUrl = 'http://localhost:8008/v1/query';
  const selector = new OfferSelector({query: queryUrl});
  const response = '{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}';
  const sourceIds = {'source_id': '12345', 'source_id_type': 'testidtype'};

  beforeEach(() => {
    fetchMock.mock(`${queryUrl}/search/offers`, response);
    sinon.stub(selector, 'displayCards');
    sinon.stub(selector, 'displayError');
    sinon.stub(selector, 'displayFailure');
  });

  afterEach(() => {
    selector.displayCards.restore();
    selector.displayError.restore();
    selector.displayFailure.restore();
    fetchMock.restore();
    offerParserStub.parseOffers.reset();
    licensorParserStub.parseLicensors.reset();
  });

  it('should fetch offers',  () => {
    return selector.loadOffers(sourceIds).then(() => {
      expect(fetchMock.called(`${queryUrl}/search/offers`)).to.be(true);
    });
  });

  it('should call parseOffers with the API response',  () => {
    return selector.loadOffers(sourceIds).then(() => {
      const expected = [{'offers': [{'@context': {}, '@graph': []}]}];
      expect(offerParserStub.parseOffers.calledWith(expected)).to.be(true);
    });
  });

  it('should display the parsed offers if they exist',  () => {
    return selector.loadOffers(sourceIds).then(() => {
      expect(selector.displayCards.calledWith({id: 1})).to.be(true);
    });
  });

  it('should not try to parse offers if the API responds with an error', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {status: 404});

    return selector.loadOffers(sourceIds).catch(() => {
      expect(offerParserStub.parseOffers.calledOnce).to.be(false);
    });
  });

  it('should display the error if the API responds with an error', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {status: 404});

    return selector.loadOffers(sourceIds).catch(() => {
     expect(selector.displayError.called).to.be(true);
    });
  });

  it('should display the error if the parseOffers responds with an error', () => {
    offerParserStub.parseOffers.rejects(Error('TypeError'));

    return selector.loadOffers(sourceIds).catch(() => {
      expect(offerParserStub.parseOffers.calledOnce).to.be(true);
      expect(selector.displayError.called).to.be(true);
    });
  });


  it('should call parseLicensors if the API responds with a 200 but no offers', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {data: []});

    return selector.loadOffers(sourceIds).then(() => {
      expect(offerParserStub.parseOffers.calledOnce).to.be(false);
      expect(licensorParserStub.parseLicensors.calledWith(sourceIds)).to.be(true);
    });
  });

  it('should call display licensors if they are returned', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {data: []});

    return selector.loadOffers(sourceIds).then(() => {
      expect(selector.displayCards.calledWith({id: 2})).to.be(true);
    });
  });

  it('should call query links if   if no licensors are returned', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {data: []});
    licensorParserStub.parseLicensors.resolves([]);

    return selector.loadOffers(sourceIds).then(() => {
      expect(selector.displayCards.calledWith({id:3})).to.be(true);
    });
  });

  it('should call display failure message if no links are returned', () => {
    fetchMock.restore();
    fetchMock.mock(`${queryUrl}/search/offers`, {data: []});
    licensorParserStub.parseLicensors.resolves([]);
    linkParserStub.parseLinks.resolves([]);

    return selector.loadOffers(sourceIds).then(() => {
      expect(selector.displayFailure.calledOnce).to.be(true);
    });
  });
});
