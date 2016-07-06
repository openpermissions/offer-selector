import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import 'sinon-as-promised';

const orgStub = {getOrganisation: sinon.stub().resolves({data: {}})};
const parser = proxyquire('../src/offer', {'./organisation': orgStub});

describe('parseOffer', () => {
  let options;
  const sourceId = 140;
  const sourceIdType = 'examplecopictureid';

  beforeEach(() => {
    options = {
      accounts: 'https://example.com/v1/accounts',
      defaults: {
        'primary_color': '#ffffff',
        'secondary_color': '#000000'
      }
    };
  });

  afterEach(() => {
    orgStub.getOrganisation.reset();
  });

  it('should call getOrganisation', () => {
    const data = require('./fixtures/offer.json');
    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(() => {
        const args = ['exampleco', options.accounts + '/organisations'];
        expect(orgStub.getOrganisation.calledWith(...args)).to.equal(true);
      });
  });

  it('should reduce the array into an object', () => {
    const data = require('./fixtures/offer.json');
    const styles = {
      'primary_color': 'white',
      'secondary_color': 'blue',
      'logo': 'test.svg'
    };
    const expected = Object.assign({
      id: 'e3138acd145f484e9c5601685d5166f8',
      name : 'Non-commercial Website',
      description: 'Use an image on a blog or website<br/><br/>Site does not carry advertising or sell products or services.<br/>Site receives no more than 50,000 views per month<br/>Maximum size of image 400 x 400px.',
      price: {
        value: '1',
        unit: 'GBP'
      }
    }, styles);

    orgStub.getOrganisation.resolves({data: styles});

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => expect(result).to.eql(expected));
  });

  it('should include the payment URL if provided', () => {
    const paymentUrl = 'http://example.com/pay';
    const data = require('./fixtures/offer.json');
    orgStub.getOrganisation.resolves({data: {payment: {url: paymentUrl}}});

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => expect(result.paymentUrl).to.eql(paymentUrl));
  });


  it("should get the price from the offer's duties", () => {
    const data = [
      {
        '@id': 'http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Offer'
        ],
        'http://www.w3.org/ns/odrl/2/duty': [
          {
            '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Duty'
        ],
        'http://www.w3.org/ns/odrl/2/action': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/compensate'
          }
        ],
        'http://www.w3.org/ns/odrl/2/constraint': [
          {
            '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '1'
          }
        ],
        'http://www.w3.org/ns/odrl/2/unit': [
          {
            '@id': 'http://cvx.iptc.org/iso4217a/GBP'
          }
        ]
      }, {
        // Fake pay constraint to make sure only the constraint related to the
        // compensate duty related to the offer is used.
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '76'
          }
        ],
        'http://www.w3.org/ns/odrl/2/unit': [
          {
            '@id': 'http://cvx.iptc.org/iso4217a/👻 '
          }
        ]
      }
    ];

    const expected = {
      value: '1',
      unit: 'GBP'
    };

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => { expect(result.price).to.eql(expected); });
  });

  it('should use the default unit if not specified in the offer', () => {
    const data = [
      {
        '@id': 'http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Offer'
        ],
        'http://www.w3.org/ns/odrl/2/duty': [
          {
            '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Duty'
        ],
        'http://www.w3.org/ns/odrl/2/action': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/compensate'
          }
        ],
        'http://www.w3.org/ns/odrl/2/constraint': [
          {
            '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '1'
          }
        ]
      }
    ];

    const expected = {
      value: '1',
      unit: '😱 '
    };

    const opt = {...options, defaults: {...options.defaults, price: {unit: '😱 '}}};
    return parser.parseOffer(data, sourceId, sourceIdType, opt)
      .then(result => { expect(result.price).to.eql(expected); });
  });

  it('should not include price if there are no duties', () => {
    const data = [
      {
        '@id': 'http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Offer'
        ]
      }
    ];

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => { expect(result).to.not.have.property('price'); });
  });
  it('should get the compensate duty if there are multiple duties', () => {
    const data = [
      {
        '@id': 'http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Offer'
        ],
        'http://www.w3.org/ns/odrl/2/duty': [
          {
            '@id': 'http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628'
          },
          {
            '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Duty'
        ],
        'http://www.w3.org/ns/odrl/2/action': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/compensate'
          }
        ],
        'http://www.w3.org/ns/odrl/2/constraint': [
          {
            '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '1'
          }
        ],
        'http://www.w3.org/ns/odrl/2/unit': [
          {
            '@id': 'http://cvx.iptc.org/iso4217a/GBP'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Rule',
          'http://www.w3.org/ns/odrl/2/Duty'
        ],
        'http://www.w3.org/ns/odrl/2/action': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/attribute'
          }
        ],
        'http://www.w3.org/ns/odrl/2/constraint': [
          {
            '@id': 'http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf'
          }
        ]
      }
    ];

    const expected = {
      value: '1',
      unit: 'GBP'
    };

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => { expect(result.price).to.eql(expected); });
  });

  it('should get the first compensate duty if there are multiple compensate duties', () => {
    const data = [
      {
        '@id': 'http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Offer'
        ],
        'http://www.w3.org/ns/odrl/2/duty': [
          {
            '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514'
          },
          {
            '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Duty'
        ],
        'http://www.w3.org/ns/odrl/2/action': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/compensate'
          }
        ],
        'http://www.w3.org/ns/odrl/2/constraint': [
          {
            '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '1'
          }
        ],
        'http://www.w3.org/ns/odrl/2/unit': [
          {
            '@id': 'http://cvx.iptc.org/iso4217a/GBP'
          }
        ]
      }, {
        '@id': 'http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c476',
        '@type': [
          'http://www.w3.org/ns/odrl/2/Constraint'
        ],
        'http://www.w3.org/ns/odrl/2/operator': [
          {
            '@id': 'http://www.w3.org/ns/odrl/2/eq'
          }
        ],
        'http://www.w3.org/ns/odrl/2/payAmount': [
          {
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
            '@value': '76'
          }
        ],
        'http://www.w3.org/ns/odrl/2/unit': [
          {
            '@id': 'http://cvx.iptc.org/iso4217a/👻 '
          }
        ]
      }
    ];

    const expected = {
      value: '1',
      unit: 'GBP'
    };

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(result => { expect(result.price).to.eql(expected); });
  });

  it('should not have side-effects on the options object', () => {
    const original = {...options, defaults: {...options.defaults}};
    const data = require('./fixtures/offer.json');

    return parser.parseOffer(data, sourceId, sourceIdType, options)
      .then(() => expect(options).to.eql(original));
  });

  it('should not have side-effects on the default price object', () => {
    const opt = {...options, defaults: {...options.defaults, price: {unit: 'GBP'}}};
    const original = {...options, defaults: {...options.defaults, price: {unit: 'GBP'}}};

    const data = require('./fixtures/offer.json');

    return parser.parseOffer(data, sourceId, sourceIdType, opt)
      .then(() => expect(opt).to.eql(original));
  });
});

describe('Offer Selector parseOffers', () => {
  const repoId = '7421a6d45d39616d17313a4248008608';
  const asset1 = {
    'source_id': 140,
    'entity_id': 'entity2',
    'source_id_type': 'examplecopictureid',
    repository: {
      'repository_id': repoId,
      'entity_id': '91ede339f3df4450aff99a868a40074a'
    },
    offers: [
      {
        '@context': {
          '@vocab': 'http://www.w3.org/ns/odrl/2/',
          'duty': {
            'type': '@id',
            '@container': '@set'
          },
          'id': 'http://openpermissions.org/ns/id/'
        },
        '@graph': [{
          '@id': 'id:offer1',
          'type': 'offer',
          'duty': [
            {
              '@id': 'id:duty1'
            }
          ]
        }]
      },
      {
        '@context': {
          '@vocab': 'http://www.w3.org/ns/odrl/2/',
          'duty': {
            'type': '@id',
            '@container': '@set'
          },
          'id': 'http://openpermissions.org/ns/id/'
        },
        '@graph': [{
          '@id': 'id:offer2',
          'type': 'offer',
          'duty': [
            {
              '@id': 'id:duty2'
            }
          ]
        }]
      }
    ]
  };
  const asset2 = {
    'source_id': 140,
    'entity_id': 'entity2',
    'source_id_type': 'examplecopictureid',
    repository: {
      'repository_id': repoId,
      'entity_id': '91ede339f3df4450aff99a868a40074a'
    },
    offers: [
      {
        '@context': {
          '@vocab': 'http://www.w3.org/ns/odrl/2/',
          'duty': {
            'type': '@id',
            '@container': '@set'
          },
          'id': 'http://openpermissions.org/ns/id/'
        },
        '@graph': [{
          '@id': 'id:offer3',
          'type': 'offer',
          'duty': [
            {
              '@id': 'id:duty3'
            }
          ]
        }]
      },
      {
        '@context': {
          '@vocab': 'http://www.w3.org/ns/odrl/2/',
          'duty': {
            'type': '@id',
            '@container': '@set'
          },
          'id': 'http://openpermissions.org/ns/id/'
        },
        '@graph': [{
          '@id': 'id:offer4',
          'type': 'offer',
          'duty': [
            {
              '@id': 'id:duty4'
            }
          ]
        }]
      }
    ]
  };

  beforeEach(() => {
    sinon.stub(parser, 'parseOffer', offer => Promise.resolve({id: offer[0]['@id']}));
  });

  afterEach(() => {
    parser.parseOffer.restore();
  });

  it('should expand JSON-LD and then parse each offer', () => {
    return parser.parseOffers([asset1])
      .then(result => {
        expect(parser.parseOffer.calledTwice).to.be(true);

        expect(result).to.eql([
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer1'},
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer2'}
        ]);
      });
  });

  it("should expand JSON-LD and then parse each asset's offers", () => {
    return parser.parseOffers([asset1, asset2])
      .then(result => {
        expect(parser.parseOffer.callCount).to.be(4);

        expect(result).to.eql([
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer1'},
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer2'},
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer3'},
          {repositoryId: repoId, id: 'http://openpermissions.org/ns/id/offer4'}
        ]);
      });
  });

  it('should return an empty array if no data', () => {
    return parser.parseOffers([]).then(result => expect(result).to.eql([]));
  });

  it('should return an empty array if no offers', () => {
    const data = [{repository: {repositoryId: 1}, offers: []}];
    return parser.parseOffers(data).then(result => expect(result).to.eql([]));
  });

  it('should return an empty array if missing offers', () => {
    const data = [{repository: {repositoryId: 1}}];
    return parser.parseOffers(data).then(result => expect(result).to.eql([]));
  });
});
