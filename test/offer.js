import expect from 'expect.js'
import fetchMock from 'fetch-mock'
import defaultsDeep from 'lodash.defaultsdeep'

import * as offer from '../src/offer'

describe('parseOffer', () => {
  let options;

  beforeEach(() => {
    let response = '{"status": 200, "data": {"id": "orgid1", "name": "Organisation 1"}}';
    fetchMock.mock(/organisations\/exampleco$/, response);

    options = {
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      defaults: {
        color: 'color1',
        title_color: '#379392',
        logo_color : '#353866',
        btn_text_color: 'white',
        primary_color: '#CE6D39'
      }
    }
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
      },
      price: {
        value: '1',
        unit: 'GBP'
      }
    };

    return offer.parseOffer(data, options)
      .then(result => {
        expect(fetchMock.called(options.organisations)).to.be.true;
        expect(result).to.eql(expected);
      });
  });

  it("should get the price from the offer's duties", () => {
    let data = [
      {
        "@id": "http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8",
        "@type": [
          "http://www.w3.org/ns/odrl/2/Offer",
        ],
        "http://www.w3.org/ns/odrl/2/duty": [
          {
            "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"
          }
        ],
      }, {
          "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Duty",
          ],
          "http://www.w3.org/ns/odrl/2/action": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/compensate"
            }
          ],
          "http://www.w3.org/ns/odrl/2/constraint": [
            {
              "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "1"
            }
          ],
          "http://www.w3.org/ns/odrl/2/unit": [
            {
              "@id": "http://cvx.iptc.org/iso4217a/GBP"
            }
          ]
        }, {
          // Fake pay constraint to make sure only the constraint related to the
          // compensate duty related to the offer is used.
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "76"
            }
          ],
          "http://www.w3.org/ns/odrl/2/unit": [
            {
              "@id": "http://cvx.iptc.org/iso4217a/👻 "
            }
          ]
        }
    ];

    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39',
      price: {
        value: '1',
        unit: 'GBP'
      }
    };

    return offer.parseOffer(data, options)
      .then(result => { expect(result).to.eql(expected); });
  });

  it("should use the default unit if not specified in the offer", () => {
    let data = [
      {
        "@id": "http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8",
        "@type": [
          "http://www.w3.org/ns/odrl/2/Offer",
        ],
        "http://www.w3.org/ns/odrl/2/duty": [
          {
            "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"
          }
        ],
      }, {
          "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Duty",
          ],
          "http://www.w3.org/ns/odrl/2/action": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/compensate"
            }
          ],
          "http://www.w3.org/ns/odrl/2/constraint": [
            {
              "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "1"
            }
          ]
        }
    ];

    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39',
      price: {
        value: '1',
        unit: '😱 '
      }
    };

    return offer.parseOffer(data, defaultsDeep(options, {defaults: {price: {unit: '😱 '}}}))
      .then(result => { expect(result).to.eql(expected); });
  });

  it('should not include price if there are no duties', () => {
    let data = [
      {
        "@id": "http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8",
        "@type": [
          "http://www.w3.org/ns/odrl/2/Offer"
        ]
      }
    ];

    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39'
    };

    return offer.parseOffer(data, options)
      .then(result => { expect(result).to.eql(expected); });
  });
  it('should get the compensate duty if there are multiple duties', () => {
    let data = [
      {
        "@id": "http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8",
        "@type": [
          "http://www.w3.org/ns/odrl/2/Offer"
        ],
        "http://www.w3.org/ns/odrl/2/duty": [
          {
            "@id": "http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628"
          },
          {
            "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"
          }
        ]
      }, {
          "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Duty",
          ],
          "http://www.w3.org/ns/odrl/2/action": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/compensate"
            }
          ],
          "http://www.w3.org/ns/odrl/2/constraint": [
            {
              "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "1"
            }
          ],
          "http://www.w3.org/ns/odrl/2/unit": [
            {
              "@id": "http://cvx.iptc.org/iso4217a/GBP"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Rule",
            "http://www.w3.org/ns/odrl/2/Duty"
          ],
          "http://www.w3.org/ns/odrl/2/action": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/attribute"
            }
          ],
          "http://www.w3.org/ns/odrl/2/constraint": [
            {
              "@id": "http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf"
            }
          ]
        }
    ];

    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39',
      price: {
        value: '1',
        unit: 'GBP'
      }
    };

    return offer.parseOffer(data, options)
      .then(result => { expect(result).to.eql(expected); });
  });

  it('should get the first compensate duty if there are multiple compensate duties', () => {
    let data = [
      {
        "@id": "http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8",
        "@type": [
          "http://www.w3.org/ns/odrl/2/Offer",
        ],
        "http://www.w3.org/ns/odrl/2/duty": [
          {
            "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"
          },
          {
            "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476"
          }
        ]
      }, {
          "@id": "http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Duty",
          ],
          "http://www.w3.org/ns/odrl/2/action": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/compensate"
            }
          ],
          "http://www.w3.org/ns/odrl/2/constraint": [
            {
              "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "1"
            }
          ],
          "http://www.w3.org/ns/odrl/2/unit": [
            {
              "@id": "http://cvx.iptc.org/iso4217a/GBP"
            }
          ]
        }, {
          "@id": "http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476",
          "@type": [
            "http://www.w3.org/ns/odrl/2/Constraint"
          ],
          "http://www.w3.org/ns/odrl/2/operator": [
            {
              "@id": "http://www.w3.org/ns/odrl/2/eq"
            }
          ],
          "http://www.w3.org/ns/odrl/2/payAmount": [
            {
              "@type": "http://www.w3.org/2001/XMLSchema#decimal",
              "@value": "76"
            }
          ],
          "http://www.w3.org/ns/odrl/2/unit": [
            {
              "@id": "http://cvx.iptc.org/iso4217a/👻 "
            }
          ]
        }
    ];

    let expected = {
      id: 'e3138acd145f484e9c5601685d5166f8',
      offer_id: 'e3138acd145f484e9c5601685d5166f8',
      color: 'color1',
      title_color: '#379392',
      logo_color: '#353866',
      btn_text_color: 'white',
      primary_color: '#CE6D39',
      price: {
        value: '1',
        unit: 'GBP'
      }
    };

    return offer.parseOffer(data, options)
      .then(result => { expect(result).to.eql(expected); });
  });
});
