import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import parser from '../src/licensor';

describe('parseLicensor', () => {
  let options;
  let response;
  const sourceId = '12345';
  const sourceIdType = 'testidtype';
  const url = 'https://localhost:8008/v1/query/licensors?source_id=12345&source_id_type=testidtype';

  beforeEach(() => {
    options = {
      query: 'https://localhost:8008/v1/query'
    };

    response = {
      'status': 200,
      'data': [{
        'id': 'orgid1',
        'name': 'Organisation 1'
      }]
    };
    fetchMock.mock(url, {body: response});
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should transform the licensors into a list of organisations with source id', () => {
    const expected = [{'id': 'orgid1', 'name': 'Organisation 1'}];

    return parser.getLicensors(sourceId, sourceIdType, options)
      .then(result => {
        expect(fetchMock.called(url)).to.be.true;
        expect(result).to.eql(expected);
      });
  });

  it('should return an empty list if response is a 404', () => {
    fetchMock.reMock(url, {status: 404, body:'{"status": 404, "error": "Not Found"}'});

    const expected = [];

    return parser.getLicensors(sourceId, sourceIdType, options)
      .then(result => {
        expect(fetchMock.called(url)).to.be.true;
        expect(result).to.eql(expected);
      });
  });

  it('should throw an error if response is a non-404 error', () => {
    fetchMock.reMock(url, {status: 500, body:'{"status": 500, "error": "Internal Server Error"}'});

    return parser.getLicensors(sourceId, sourceIdType, options)
      .catch(error => {
        expect(error).to.eql({ status: 500, error: 'Internal Server Error' });
      });
  });

  it('should include options if licensor does not already have them', () => {
    response = {data: [{
      id: 'orgid1',
      name: 'Organisation 1',
      'primary_color': '#eee',
      'secondary_color': '#bbb'
    }, {
      id: 'orgid2',
      name: 'Organisation 2'
    }]};
    fetchMock.reMock(url, {body: response});

    options.defaults = {'primary_color': '#fff', 'secondary_color': '#000'};

    return parser.getLicensors(sourceId, sourceIdType, options)
      .then(result => {
        expect(result).to.eql([{
          id: 'orgid1',
          name: 'Organisation 1',
          'primary_color': '#eee',
          'secondary_color': '#bbb'
        }, {
          id: 'orgid2',
          name: 'Organisation 2',
          'primary_color': '#fff',
          'secondary_color': '#000'
        }]);
      });
  });

  it('should include reference link if provided ', () => {
    response = {data: [{
      id: 'orgid1',
      name: 'Organisation 1',
      'primary_color': '#eee',
      'secondary_color': '#bbb',
      'reference_links': {links: {[sourceIdType]: 'https://example.com/{source_id_type}/{source_id}'}}
    }]};
    fetchMock.reMock(url, {body: response});

    return parser.getLicensors(sourceId, sourceIdType, options)
      .then(result => {
        expect(result).to.eql([{
          id: 'orgid1',
          name: 'Organisation 1',
          link: `https://example.com/${sourceIdType}/${sourceId}`,
          'primary_color': '#eee',
          'secondary_color': '#bbb',
          'reference_links': {links: {[sourceIdType]: 'https://example.com/{source_id_type}/{source_id}'}}
        }]);
      });
  });

  it('should fall back to use licensor website if provided ', () => {
    response = {data: [{
      id: 'orgid1',
      name: 'Organisation 1',
      website: 'http://example.com',
      'reference_links': {links: {}}
    }]};
    fetchMock.reMock(url, {body: response});

    return parser.getLicensors(sourceId, sourceIdType, options)
      .then(result => {
        expect(result).to.eql([{
          id: 'orgid1',
          name: 'Organisation 1',
          link: 'http://example.com',
          website: 'http://example.com',
          'reference_links': {links: {}}
        }]);
      });
  });
});

describe('parseLicensors', () => {
  const sourceId = {source_id: '12345', source_id_type: 'testidtype'};
  const otherSourceId = {source_id: '67890', source_id_type: 'otheridtype'};

  afterEach(() => {
    parser.getLicensors.restore();
  });

  it('should get licensors for each source id', () => {
    sinon.stub(parser, 'getLicensors', () => Promise.resolve([]));
    return parser.parseLicensors([sourceId, otherSourceId])
      .then(() => {
        expect(parser.getLicensors.calledTwice).to.be(true);
      });
  });

  it('should return an empty array if no data', () => {
    sinon.stub(parser, 'getLicensors');
    return parser.parseLicensors([]).then(result => expect(result).to.eql([]));
  });

  it('should return an empty array if no licensors', () => {
    sinon.stub(parser, 'getLicensors', () => Promise.resolve([]));

    return parser.parseLicensors([sourceId])
      .then(result => {
        expect(result).to.eql([]);
      });
  });
});
