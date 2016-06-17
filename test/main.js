const expect = require('expect.js');
const sinon = require('sinon');
require('sinon-as-promised');
const OfferSelector = require('../src/main');
const helper = require('../src/helper');

describe('OfferSelector constructor', () => {
  it('should initialise with default options if none provided', () => {
    const selector = new OfferSelector();
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom tag if provided', () => {
    const selector = new OfferSelector({tag: 'my-tag'});
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'my-tag'
    })
  });

  it('should initialise with custom offers if provided', () => {
    const selector = new OfferSelector({offers: 'https://my-offers'});
    expect(selector.options).to.eql({
      offers: 'https://my-offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom organisations if provided', () => {
    const selector = new OfferSelector({organisations: 'https://my-organisations',});
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://my-organisations',
      tag: 'offer-selector'
    })
  });
  it('should initialise with custom options if provided', () => {
    const selector = new OfferSelector({offers: 'https://my-offers', organisations: 'https://my-organisations', tag: 'my-tag'});
    expect(selector.options).to.eql({
      offers: 'https://my-offers',
      organisations: 'https://my-organisations',
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


describe('OfferSelector retriveOrgansations', () => {
  //TODO
});

describe('OfferSelector loadOffers', () => {
  const selector = new OfferSelector();

  beforeEach(() => {
    sinon.stub(window, 'fetch');
    sinon.stub(helper, 'parseResponse');
    sinon.stub(selector, 'parseOffers');
    sinon.stub(selector, 'displayOffers');
    sinon.stub(selector, 'retrieveOrganisations');

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
    helper.parseResponse.restore();
    selector.parseOffers.restore();
    selector.displayOffers.restore();
    selector.retrieveOrganisations.restore();
  });

 it('should call fetch with correct values',  done => {
    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

          const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const init = { method: 'POST', headers: headers, body: JSON.stringify(sourceIds) };
    setTimeout(() => {
      expect(window.fetch.called).to.be(true);
      expect(window.fetch.calledWithExactly('https://query.copyrighthub.org/v1/query/search/offers', init)).to.be(true);
        done();npm
      }, 100);

  });

  it('should call parseResponse if fetch returns result',  done => {
    var res = new Response('{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });
      window.fetch.resolves(res);

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(helper.parseResponse.called).to.be(true);
      expect(helper.parseResponse.calledWithExactly(res)).to.be(true);
        done();
      }, 100);
  });

  it('should not call parseResponse if fetch errors',  done => {
    window.fetch.rejects(new TypeError('Network request failed'));

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(helper.parseResponse.called).to.be(false);
        done();
      }, 100);
  });


  it('should call parseOffers if parseResponse succeeds',  done => {
    helper.parseResponse.returns({"status": 200,"data": [{"offers": [{"@context": {}, "@graph": []}]}]})

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

  it('should not call parseOffers if parseResponse fails',  done => {
    helper.parseResponse.throws(new Error('Error Message'));

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.parseOffers.called).to.be(false);
        done();
      }, 100);
  });

  it('should call retrieveOrganisations if parseOffers succeeds', done => {
    selector.parseOffers.resolves([{'@id': 'id1'}]);

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.retrieveOrganisations.called).to.be(true);
      expect(selector.retrieveOrganisations.calledWithExactly([{'@id': 'id1'}])).to.be(true);
      done();
    }, 100);
  });

  it('should not call retrieveOrganisations if parseOffers fails', done => {
    selector.parseOffers.rejects(new TypeError('Error'));

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.retrieveOrganisations.called).to.be(false);
      done();
    }, 100);
  });

  it('should call displayOffers if retrieveOrganisations succeeds', done => {
    selector.retrieveOrganisations.resolves([{offer: {'@id': 'id1'}, organisation: {'id': 'id2'}}]);

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.displayOffers.called).to.be(true);
      done();
      expect(selector.displayOffers.calledWithExactly(
        [{offer: {'@id': 'id1'}, organisation: {'id': 'id2'}}])).to.be(true);
      done();
    }, 100);
  });

  it('should not call displayOffers if retrieveOrganisations fails', done => {
    selector.retrieveOrganisations.rejects(new TypeError('Error'));

    const sourceIds = {source_id: '12345', source_id_type: 'testidtype'};
    selector.loadOffers(sourceIds);

    setTimeout(() => {
      expect(selector.displayOffers.called).to.be(false);
      done();
    }, 100);
  });
});