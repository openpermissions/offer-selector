const expect = require('expect.js');
const sinon = require('sinon');
require('sinon-as-promised');
const OfferSelector = require('../src/main');

describe('OfferSelector constructor', () => {
  it('should initialise with default options if none provided', () => {
    const selector = new OfferSelector();
    expect(selector.options).to.eql({
      query: 'https://query.copyrighthub.org/v1/query/search/offers',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom tag if provided', () => {
    const selector = new OfferSelector({tag: 'my-tag'});
    expect(selector.options).to.eql({
      query: 'https://query.copyrighthub.org/v1/query/search/offers',
      tag: 'my-tag'
    })
  });

  it('should initialise with custom query if provided', () => {
    const selector = new OfferSelector({query: 'https://my-query/'});
    expect(selector.options).to.eql({
      query: 'https://my-query/',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom options if provided', () => {
    const selector = new OfferSelector({query: 'https://my-query/', tag: 'my-tag'});
    expect(selector.options).to.eql({
      query: 'https://my-query/',
      tag: 'my-tag'
    })
  })
});

describe('Offer Selector parseOffers', () => {
  it('should return a flattened array of expanded offers if single asset response', done => {
    const selector = new OfferSelector();
    const response = {
      "status": 200,
      "data": [{
        "source_id": "140",
        "entity_id": "91ede339f3df4450aff99a868a40074a",
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      }]
    };

    selector.parseOffers(response)
      .then( result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(2);
      })
      .then(done, done)
  });

  it('should return a flattened array of expanded offers if multi asset response', done => {
    const selector = new OfferSelector();
    const response = {
      "status": 200,
      "data": [{
        "source_id": "140",
        "entity_id": "91ede339f3df4450aff99a868a40074a",
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      },
        {
          "source_id": "141",
          "entity_id": "91ede339f3df4450aff99a868a40074b",
          "offers": [{
            "@context": {},
            "@graph": []
          }, {
            "@context": {},
            "@graph": []
          }],
          "source_id_type": "examplecopictureid"
        }]
    };

    selector.parseOffers(response)
      .then( result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(4)
      })
      .then(done, done)
  });


  it('should return an empty array if no offers', done => {
    const selector = new OfferSelector();
    selector.parseOffers({status: 200, data:[]})
      .then( result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(0);
      })
      .then(done, done)
  });

  it('should return an empty array if no data key',  done => {
    const selector = new OfferSelector();
    selector.parseOffers({status: 200})
      .then( result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(0);
      })
      .then(done, done)
  });
});


describe('OfferSelector loadOffers', () => {
  const selector = new OfferSelector();

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    sinon.stub(selector, 'parseOffers');
    sinon.stub(selector, 'displayOffers');

    var res = new Response('{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}', {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.fetch.resolves(res);
  });

  afterEach(() => {
    window.fetch.restore();
    selector.parseOffers.restore();
    selector.displayOffers.restore();
  });

  it('should call fetch with correct values',  () => {
    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const init = { method: 'POST', headers: headers, body: JSON.stringify(sourceIds) };

    expect(window.fetch.called).to.be(true);
    expect(window.fetch.calledWithExactly('https://query.copyrighthub.org/v1/query/search/offers', init)).to.be(true);
  });

  it('should not call parseOffers if fetch errors',  done => {
    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};

    window.fetch.rejects(new TypeError('Network request failed'));

    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.parseOffers.called).to.be(false);
        done();
      }, 100);
  });

  it('should not call parseOffers on non-200 response',  done => {
    var res = new Response('', {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.fetch.resolves(res);

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.parseOffers.called).to.be(false);
        done();
      }, 100);
  });

  it('should call parseOffers on 200 response',  done => {
    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.parseOffers.called).to.be(true);
      expect(selector.parseOffers.calledWithExactly({
        "status": 200,
        "data": [{"offers": [{"@context": {}, "@graph": []}]}]
      })).to.be(true);
      done();
    }, 100);
  });

  it('should call displayOffers if parseOffers succeeds',  done => {
    selector.parseOffers.resolves([{'@id': 'id1'}]);

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.displayOffers.called).to.be(true);
      expect(selector.displayOffers.calledWithExactly([{'@id': 'id1'}])).to.be(true);
      done();
    }, 100);
  });

  it('should not call displayOffers if parseOffers fails',  done => {
    selector.parseOffers.rejects(new TypeError('Error'));

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.displayOffers.called).to.be(false);
      done();
    }, 100);
  });

});