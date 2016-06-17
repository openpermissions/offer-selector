const expect = require('expect.js');
const sinon = require('sinon');
require('sinon-as-promised');
const helper = require('../src/helper');
require('whatwg-fetch');

describe('getAssigner', () => {
  it('should return provider id if exists', () => {
    let offer = [{
      '@type': ["http://www.w3.org/ns/odrl/2/Offer"],
      '@id': 'offerid',
      'http://www.w3.org/ns/odrl/2/assigner': [{'@id': 'partyid'}]
    },{
      '@id': 'partyid',
      'http://openpermissions.org/ns/op/1.1/provider': [{'@value': 'providerid'}]
    }];
    let result = helper.getAssigner(offer);
    expect(result).to.be('providerid');
  });

  it('should return undefined if no offer element', () => {
    let offer = [];
    let result = helper.getAssigner(offer);
    expect(result).to.be(undefined);
  });
  
  it('should return undefined if offer has no assigner id', () => {
    let offer = [{
      '@type': ["http://www.w3.org/ns/odrl/2/Offer"],
      '@id': 'offerid'
    }];
    let result = helper.getAssigner(offer);
    expect(result).to.be(undefined);
  });
  
  it('should return undefined if offer has no assigner element', () => {
    let offer = [{
      '@type': ["http://www.w3.org/ns/odrl/2/Offer"],
      '@id': 'offerid',
      'http://www.w3.org/ns/odrl/2/assigner': 'partyid'
    }];
    let result = helper.getAssigner(offer);
    expect(result).to.be(undefined);
  });
});

describe('parseResponse', () => {
  it('should return json if status code is 200', done => {
    var response = new Response('{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}', {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    });
    helper.parseResponse(response)
      .then(result => {
        expect(result).to.be.an('object');
        expect(result).to.eql({"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]});
      })
      .then(done, done)
  });

  it('should throw an error if status code is not 200', () => {
    var response = new Response('{"status": 200, "data": [{"offers": [{"@context": {}, "@graph": []}]}]}', {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        'Content-type': 'application/json'
      }
    });

    expect(()=> {
      helper.parseResponse(response)
    }).to.throwException(e => {
      expect(e.message).to.be('Internal Server Error');
    });
  })
});