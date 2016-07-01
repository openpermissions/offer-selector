import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import parser from '../src/licensor';

describe('parseLicensor', () => {
  let options;
  const sourceId = {source_id: '12345', source_id_type: 'testidtype'};
  const url = 'https://query.copyrighthub.org/v1/query/licensors?source_id=12345&source_id_type=testidtype'

  beforeEach(() => {
    const response = '{"status": 200, "data": [{"id": "orgid1", "name": "Organisation 1"}]}';
    fetchMock.mock(url, response);
    options = {
      licensors: 'https://query.copyrighthub.org/v1/query/licensors'
    };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should transform the licensors into a list of organisations with source id', () => {
    const expected = [{
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid1", "name": "Organisation 1"}
    }];
    
    return parser.parseLicensor(sourceId, options)
      .then(result => {
        expect(fetchMock.called(url)).to.be.true;
        expect(result).to.eql(expected);
      });
  });

  it('should return an empty list if response is a 404', () => {
    fetchMock.restore();
    fetchMock.mock(url, '{"status": 404, "error": "Not Found"}');

    const expected = [];

    return parser.parseLicensor(sourceId, options)
      .then(result => {
        expect(fetchMock.called(url)).to.be.true;
        expect(result).to.eql(expected);
      });
  });
  
  it('should throw an error if response is a non-404 error', () => {
    fetchMock.restore();
    fetchMock.mock(url, '{"status": 500, "error": "Internal Server Error"}');

    return parser.parseLicensor(sourceId, options)
      .catch(error => {
        expect(error).to.eql({ status: 500, error: 'Internal Server Error' });
      });
  });
});

describe('parseLicensors', () => {
  let options;
  const sourceId = {source_id: '12345', source_id_type: 'testidtype'};
  const otherSourceId = {source_id: '67890', source_id_type: 'otheridtype'};

  afterEach(() => {
    parser.parseLicensor.restore();
  });

  it('should get licensors for each source id', () => {
    sinon.stub(parser, 'parseLicensor', offer => Promise.resolve([]));
    return parser.parseLicensors([sourceId, otherSourceId])
      .then(result => {
        expect(parser.parseLicensor.calledTwice).to.be(true);
      });
  });

  it('should include options if licensor does not already has them', () => {
    sinon.stub(parser, 'parseLicensor', offer => Promise.resolve([{
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid1", "name": "Organisation 1", primary_color: "#eee", secondary_color: "#bbb"}
    }, {
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid2", "name": "Organisation 2"}
    }]));

    return parser.parseLicensors([sourceId], {defaults:{primary_color: '#fff', secondary_color: '#000'}})
      .then(result => {
        expect(result).to.eql([{
          "id": "orgid1",
          "name": "Organisation 1",
          "primary_color": '#eee',
          "secondary_color": "#bbb"
        },
        {
          "id": "orgid2",
          "name": "Organisation 2",
          "primary_color": '#fff',
          "secondary_color": "#000"
        }]);
      });
  });

  it('should include reference link if provided ', () => {
    sinon.stub(parser, 'parseLicensor', offer => Promise.resolve([{
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {
        "id": "orgid1",
        "name": "Organisation 1",
        "reference_links": {"links": {"testidtype": "https://example.com/{source_id_type}/{source_id}"}}
      }
    }, {
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {
        "id": "orgid2",
        "name": "Organisation 2",
        "reference_links": {"links": {"otheridtype": "https://example.com/{source_id_type}/{source_id}"}}
      }
    }]));

    return parser.parseLicensors([sourceId])
      .then(result => {
        expect(result).to.eql([{
          "id": "orgid1",
          "name": "Organisation 1",
          "reference_links": {"links": {"testidtype": "https://example.com/{source_id_type}/{source_id}"}},
          "url": "https://example.com/testidtype/12345"
        },
          {
            "id": "orgid2",
            "name": "Organisation 2",
            "reference_links": {"links": {"otheridtype": "https://example.com/{source_id_type}/{source_id}"}}
          }]);
      });
  });

  it('should fall back to use licensor website if provided ', () => {
    sinon.stub(parser, 'parseLicensor', offer => Promise.resolve([{
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid1", "name": "Organisation 1", "reference_links": {"links": {"testidtype": "https://example.com/{source_id_type}/{source_id}"}}}
    }, {
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid2", "name": "Organisation 2", "website": "https://example.com"}
    },
    {
      source_id: '12345',
      source_id_type: 'testidtype',
      licensor: {"id": "orgid3", "name": "Organisation 3"}
    }]));

    return parser.parseLicensors([sourceId])
      .then(result => {
        expect(result).to.eql([{
          "id": "orgid1",
          "name": "Organisation 1",
          "reference_links": {"links": {"testidtype": "https://example.com/{source_id_type}/{source_id}"}},
          "url": "https://example.com/testidtype/12345"
        },
        {
          "id": "orgid2",
          "name": "Organisation 2",
          "website": "https://example.com",
          "url": "https://example.com"
        },
        {
          "id": "orgid3",
          "name": "Organisation 3"
        }]);
      });
  });

  it('should return an empty array if no data', () => {
    sinon.stub(parser, 'parseLicensor');
    return parser.parseLicensors([]).then(result => expect(result).to.eql([]));
  });

  it('should return an empty array if no licensors', () => {
    sinon.stub(parser, 'parseLicensor', offer => Promise.resolve([]));

    return parser.parseLicensors([sourceId])
      .then(result => {
        expect(result).to.eql([]);
      });
  });
});
