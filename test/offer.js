import expect from 'expect.js'
import fetchMock from 'fetch-mock'

import * as offer from '../src/offer'

describe('parseOffer', () => {
  beforeEach(() => {
    let response = '{"status": 200, "data": {"id": "orgid1", "name": "Organisation 1"}}';
    fetchMock.mock(/organisations\/exampleco$/, response);
  });

  it('should reduce the array into an object', () => {
    let data = require('./fixtures/offer.json');
    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      type : 'Non-commercial Website',
      description: 'Use an image on a blog or website<br/><br/>Site does not carry advertising or sell products or services.<br/>Site receives no more than 50,000 views per month<br/>Maximum size of image 400 x 400px.',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39',
      organisation: {
        id: 'orgid1',
        name: 'Organisation 1'
      }
    };
    let options = {
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      defaults: {
        color: 'color1',
        title_color: '#379392',
        logo_color : '#353866',
        btn_text_color: 'white',
        primary_color: '#CE6D39',
      }
    }

    return offer.parseOffer(data, options)
      .then(result => {
        expect(fetchMock.called(options.organisations)).to.be.true;
        expect(result).to.eql(expected);
      });
    ;
  });
});
