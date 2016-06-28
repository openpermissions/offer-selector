const expect = require('expect.js');
const sinon = require('sinon');
require('sinon-as-promised');
const OfferSelector = require('../src/main');
const helper = require('../src/helper');
const jsonld = require('jsonld');
const ldPromises = jsonld.promises;
require('swiper/dist/css/swiper.css')


describe('Offer Selector retrieveOrganisations', () => {
  const selector = new OfferSelector({organisations: 'https://my-orgs'});

  beforeEach(() => {
    sinon.stub(window, 'fetch');

    window.fetch.withArgs('https://my-orgs/orgid1').resolves(
      new Response('{"status": 200, "data": {"id": "orgid1", "name": "Organisation 1"}}', {status: 200})
    );
    window.fetch.withArgs('https://my-orgs/orgid2').resolves(
      new Response('{"status": 200, "data": {"id": "orgid2", "name": "Organisation 2"}}', {status: 200})
    );

  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('should only make api calls for unique organisation ids', done => {
    let offers = [
      {offer: [{'@id': 'id1'}], organisation: 'orgid1'},
      {offer: [{'@id': 'id2'}], organisation: 'orgid2'},
      {offer: [{'@id': 'id3'}], organisation: 'orgid2'},
      {offer: [{'@id': 'id4'}], organisation: undefined}];
    selector.retrieveOrganisations(offers)
      .then( result => {
        expect(window.fetch.callCount).to.be(2);
        expect(window.fetch.calledWithExactly('https://my-orgs/orgid1')).to.be(true);
        expect(window.fetch.calledWithExactly('https://my-orgs/orgid2')).to.be(true);
      })
      .then(done, done)
  });

  it('should return an array of offers with their organisation objects', done => {
    let offers = [
      {offer: [{'@id': 'id1'}], organisation: 'orgid1'},
      {offer: [{'@id': 'id2'}], organisation: 'orgid2'}
    ];
    selector.retrieveOrganisations(offers)
      .then( result => {
        expect(result).to.eql([{
          offer: [{'@id': 'id1'}],
          organisation: {"id": "orgid1", "name": "Organisation 1"}
        },{
          offer: [{'@id': 'id2'}],
          organisation: {"id": "orgid2", "name": "Organisation 2"}
        }
        ]);
      })
      .then(done, done)
  });


  it('should return offers with an empty organisation if organisation query returns a non-200 status', done => {
    window.fetch.withArgs('https://my-orgs/orgid5').resolves(
      new Response('{"status": 500, "errormsg": Internal server error}}', {status: 500, statusText: "Internal server error"})
    );
    let offers = [
      {offer: [{'@id': 'id1'}], organisation: 'orgid1'},
      {offer: [{'@id': 'id5'}], organisation: 'orgid5'}
    ];
    selector.retrieveOrganisations(offers)
      .then( result => {
        expect(result).to.eql([{
          offer: [{'@id': 'id1'}],
          organisation: {"id": "orgid1", "name": "Organisation 1"}
        }, {
          offer: [{'@id': 'id5'}],
          organisation: {}
        }
        ]);
      })
      .then(done, done)
  });

  it('should return offers with an empty organisation if there is an error retrieving organisations', done => {
    window.fetch.withArgs('https://my-orgs/orgid6').rejects(new TypeError('Error Message'));

    let offers = [
      {offer: [{'@id': 'id1'}], organisation: 'orgid1'},
      {offer: [{'@id': 'id6'}], organisation: 'orgid6'}
    ];
    selector.retrieveOrganisations(offers)
      .then( result => {
        expect(result).to.eql([{
          offer: [{'@id': 'id1'}],
          organisation: {"id": "orgid1", "name": "Organisation 1"}
        }, {
          offer: [{'@id': 'id6'}],
          organisation: {}
        }
        ]);
      })
      .then(done, done)
  });
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
        done();
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
