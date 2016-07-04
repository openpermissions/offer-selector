import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import parser from '../src/link';

describe('parseLink', () => {
  let options;
  const sourceId = {source_id: '12345', source_id_type: 'testidtype'};

  beforeEach(() => {
    fetchMock.mock('https://localhost:8006/v1/accounts/organisations/orgid1',
      '{"status": 200, "data": {"id": "orgid1", "name": "Organisation 1"}}');
    fetchMock.mock('https://localhost:8006/v1/accounts/links',
      '{"status": 200, "data": [{"link": "https://example.com", "organisation_id": "orgid1"}]}');
    options = {
      accounts: 'https://localhost:8006/v1/accounts',
      defaults: {
        'primary_color': '#ffffff',
        'secondary_color': '#000000'
      }
    };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should return an array of organisations and links', () => {
    const expected = [
      {"link": "https://example.com",
        "id": "orgid1",
        "name": "Organisation 1",
        'organisation_id': 'orgid1',
        'primary_color': '#ffffff',
        'secondary_color': '#000000'
      }];
    return parser.parseLink(sourceId, options)
      .then(result => {
        expect(fetchMock.called(`${options.accounts}/links`)).to.be.true;
        expect(result).to.eql(expected)
      });
  });

  it('should not have side-effects on the options object', () => {
    const original = {...options, defaults: {...options.defaults}};

    return parser.parseLink(sourceId, options)
      .then(() => expect(options).to.eql(original));
  });
});

describe('parseLinks', () => {
  const sourceId = {source_id: '12345', source_id_type: 'testidtype'};
  const otherSourceId = {source_id: '67890', source_id_type: 'otheridtype'};

  beforeEach(() => {
  });

  afterEach(() => {
    parser.parseLink.restore();
  });

  it('should parse links for each source id provided', () => {
    sinon.stub(parser, 'parseLink', link => Promise.resolve([]));

    return parser.parseLinks([sourceId, otherSourceId])
      .then(result => {
        expect(parser.parseLink.calledTwice).to.be(true);
      });
  });

  it('should return a flattened array', () => {
    sinon.stub(parser, 'parseLink', link => Promise.resolve([{"id": "orgid1", "link": 'https://example.com'}]));

    return parser.parseLinks([sourceId, otherSourceId])
      .then(result => {
        expect(result).to.eql([{
          "id": "orgid1",
          "link": 'https://example.com'
        }, {
          "id": "orgid1",
          "link": 'https://example.com'
        }]);
      });
  });

  it('should return an empty array if no data', () => {
    sinon.stub(parser, 'parseLink', link => Promise.resolve([]));
    return parser.parseLinks([]).then(result => expect(result).to.eql([]));
  });

  it('should return an empty array if no links', () => {
    sinon.stub(parser, 'parseLink', link => Promise.resolve([]));
    return parser.parseLinks([sourceId]).then(result => expect(result).to.eql([]));
  });

});
