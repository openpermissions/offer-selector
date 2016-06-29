import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import 'sinon-as-promised';

const parserStub = {parseOffers: sinon.stub().resolves({id: 1})};
const OfferSelector = proxyquire('../src/main', {'./offer': parserStub});

describe('OfferSelector constructor', () => {
  it('should be be possible to override options', () => {
    const org = 'http://test'
    const selector = new OfferSelector({organisations: org});

    expect(selector.options.organisations).to.not.eql(new OfferSelector().options.organisations);
  });

  it('should be be possible to override nested defaults', () => {
    const selector = new OfferSelector({defaults: {color: 'blue'}});

    expect(selector.options.defaults.color).to.not.eql(new OfferSelector().options.defaults.color);
    expect(selector.options.defaults.price).to.eql(new OfferSelector().options.defaults.price);
  });
});

describe('OfferSelector loadOffers', () => {
  const searchUrl = 'http://localhost:8008/v1/query/search/offers';
  const selector = new OfferSelector({offers: searchUrl});
  const response = '{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}';
  const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};

  beforeEach(() => {
    fetchMock.mock(searchUrl, response);
    sinon.stub(selector, 'displayOffers');
  });

  afterEach(() => {
    selector.displayOffers.restore();
    fetchMock.restore();
    parserStub.parseOffers.reset();
  });

 it('should fetch offers',  () => {
   return selector.loadOffers(sourceIds).then(() => {
     expect(fetchMock.called(searchUrl)).to.be(true);
   });
  });

 it('should call parseOffers with the API response',  () => {
   return selector.loadOffers(sourceIds).then(() => {
     const expected = [{'offers': [{'@context': {}, '@graph': []}]}]
     expect(parserStub.parseOffers.calledWith(expected)).to.be(true);
    });
  });

 it('should display the parsed offers',  () => {
   return selector.loadOffers(sourceIds).then(() => {
       expect(selector.displayOffers.calledWith({id: 1})).to.be(true);
    });
  });

 it('should not try to parse offers if the API responds with an error', () => {
   fetchMock.restore();
   fetchMock.mock(searchUrl, {status: 404})

   return selector.loadOffers(sourceIds).catch(() => {
     expect(parserStub.parseOffers.calledOnce).to.be(false);
   });
 });

 it('should not error if the API responds with a 200 but no offers', () => {
   fetchMock.restore();
   fetchMock.mock(searchUrl, {data: []});

   return selector.loadOffers(sourceIds).then(() => {
     expect(parserStub.parseOffers.calledWith([])).to.be(true);
     expect(selector.displayOffers.calledOnce).to.be(true);
   });
 });
});
