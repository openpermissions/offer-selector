import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import * as org from '../src/organisation';


describe('getOrganisation', () => {
  let response;
  const url = 'https://example.com/v1/accounts/organisations';
  const orgId = 'exampleco';
  const expectedUrl = `${url}/${orgId}`;

  beforeEach(() => {
    response = { status: 200, data: { id: orgId } };
    fetchMock.mock(expectedUrl, 'GET', () => {return {body: response};});
  });

  afterEach(() => {
    fetchMock.restore();
    org.getOrganisation.clearCache();
  });

  it('should get the organisation using the provided ID and URL', () => {
    return org.getOrganisation(orgId, url)
      .then(() => expect(fetchMock.called(expectedUrl)).to.equal(true));
  });

  it('should parse the JSON response', () => {
    return org.getOrganisation(orgId, url)
      .then(result => expect(result).to.eql(response));
  });

  it('should cache requests', () => {
    // fetch should only be called the first time
    return org.getOrganisation(orgId, url)
      .then(() => {
        expect(fetchMock.called(expectedUrl)).to.equal(true);
        fetchMock.reset();
        return org.getOrganisation(orgId, url);
      })
      .then(() => expect(fetchMock.called(expectedUrl)).to.equal(false));
  });

  it('should be possible to clear the cache', () => {
    return org.getOrganisation(orgId, url)
      .then(() => {
        expect(fetchMock.called(expectedUrl)).to.equal(true);
        fetchMock.reset();
        // fetch should be called the second time because we call clearCache
        org.getOrganisation.clearCache();
        return org.getOrganisation(orgId, url);
      })
      .then(() => expect(fetchMock.called(expectedUrl)).to.equal(true));
  });
});

describe('paymentUrl', () => {
  const sourceId = 140;
  const sourceIdType = 'examplecopictureid';
  const offerId = 'something';

  it('should replace the source ID if have a matching source ID type', () => {
    const organisation = {
      payment: {
        url: 'https://example.com/{offer_id}/{source_id}',
        'source_id_type': sourceIdType
      }
    };

    const result = org.paymentUrl(organisation, offerId, sourceId, sourceIdType);
    expect(result).to.equal(`https://example.com/${offerId}/${sourceId}`);
  });

  it('should replace just the offer ID if there is not a source ID type', () => {
    const organisation = {
      payment: {
        url: 'https://example.com/{offer_id}/{source_id}'
      }
    };

    const result = org.paymentUrl(organisation, offerId, sourceId, sourceIdType);
    expect(result).to.equal(`https://example.com/${offerId}/{source_id}`);
  });

  it('should not include payment url if source ID types do not match', () => {
    const organisation = {
      payment: {
        url: 'https://example.com/{offer_id}/{source_id}',
        'source_id_type': 'other'
      }
    };

    const result = org.paymentUrl(organisation, offerId, sourceId, sourceIdType);
    expect(result).to.be(undefined);
  });

  it('should replace all offer ID placeholders', () => {
    const organisation = {
      payment: {
        url: 'https://example.com/{offer_id}/{source_id}/{offer_id}',
        'source_id_type': sourceIdType
      }
    };

    const result = org.paymentUrl(organisation, offerId, sourceId, sourceIdType);
    expect(result).to.equal(`https://example.com/${offerId}/${sourceId}/${offerId}`);
  });

  it('should replace all source ID placeholders', () => {
    const organisation = {
      payment: {
        url: 'https://example.com/{source_id}/{source_id}',
        'source_id_type': sourceIdType
      }
    };

    const result = org.paymentUrl(organisation, offerId, sourceId, sourceIdType);
    expect(result).to.equal(`https://example.com/${sourceId}/${sourceId}`);
  });

  it('should return undefined if no payment', () => {
    const result = org.paymentUrl({}, offerId, sourceId, sourceIdType);
    expect(result).to.be(undefined);
  });
});
