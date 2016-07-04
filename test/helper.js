import expect from 'expect.js';
import helper from '../src/helper';

describe('parseResponse', () => {
  it('should return json if status code is ok', done => {
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

  it('should return a rejected promise an error if status code is not ok', done => {
    var response = new Response('{"status": 500, "error": "Internal Server Error"}', {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        'Content-type': 'application/json'
      }
    });

    helper.parseResponse(response)
      .catch(result => {
        expect(result).to.eql({"status": 500, "error": "Internal Server Error"})
    })
      .then(done, done)
  });
});

describe('formatMoney', () => {
    it('should return a string with the currency symbol', () => {
        expect(helper.formatMoney(100, 'GBP')).to.be('£100.00');
    });

    it('should use the currency code if unrecognised 😸 ', () => {
        expect(helper.formatMoney(100, '😸 ')).to.be('😸 100.00');
    });
});
