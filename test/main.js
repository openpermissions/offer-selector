const expect = require('expect.js');
const sinon = require('sinon');
require('sinon-as-promised');
const OfferSelector = require('../src/main');
const helper = require('../src/helper');
const jsonld = require('jsonld');
const ldPromises = jsonld.promises;


describe ('parseOffer', () => {
    it('should return empty array if empty array provided', () => {
      const selector = new OfferSelector();
      var array = [];
      var response=selector.parseOffer(array)
      expect(response).to.be.an('array');
      expect(response.length).to.equal(0);
  });
  it('should return empty array if nothing is provided', () => {
    const selector = new OfferSelector();
    var response=selector.parseOffer();
    expect(response).to.be.an('array');
    expect(response.length).to.equal(0);
  });
  it('should return a 2 item array if 2 objects are passed', () => {
    const selector = new OfferSelector();
    var offerObj = [{"offer":[{"@id":"http://openpermissions.org/ns/id/3fd3d56d52724d978281e455ab183f2c","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/height":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/attributeText":[{"@language":"en","@value":"This photograph (c) Test Demo PseudoLtd Ltd, all rights reserved."}]},{"@id":"http://openpermissions.org/ns/id/295c0a5a5efc44f8aec9508603a7f9d5","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Permission"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/present"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/66a15b9d0c91473da18e7ccf85187334"},{"@id":"http://openpermissions.org/ns/id/c25a0129e6ba4f3fb24931bc7a289095"},{"@id":"http://openpermissions.org/ns/id/3fd3d56d52724d978281e455ab183f2c"},{"@id":"http://openpermissions.org/ns/id/5eed56b7bb8b4d7e9137719c83c82492"},{"@id":"http://openpermissions.org/ns/id/074536c6e69249e7a1986acdcfc11ffa"},{"@id":"http://openpermissions.org/ns/id/d8fbc52c598b4daeb40a1db95fe45812"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628"}]},{"@id":"http://openpermissions.org/ns/id/7dfe87062e1941839005cf314ec33710","@type":["http://openpermissions.org/ns/op/1.1/Party"],"http://openpermissions.org/ns/op/1.1/provider":[{"@value":"exampleco"}],"http://openpermissions.org/ns/op/1.1/reference":[{"@value":""}]},{"@id":"http://openpermissions.org/ns/id/d8fbc52c598b4daeb40a1db95fe45812","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/width":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/f628280a61f64799baa34dba6d2b6cb3","@type":["http://openpermissions.org/ns/op/1.1/Asset","http://openpermissions.org/ns/op/1.1/AssetSelector","http://www.w3.org/ns/odrl/2/Asset"],"http://openpermissions.org/ns/op/1.1/count":[{"@value":1}],"http://openpermissions.org/ns/op/1.1/fromSet":[{"@id":"http://openpermissions.org/ns/id/d562ded9942449fca62c6b9653129080"}],"http://openpermissions.org/ns/op/1.1/selectRequired":[{"@value":false}]},{"@id":"http://openpermissions.org/ns/id/5eed56b7bb8b4d7e9137719c83c82492","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/isPartOf"}],"http://www.w3.org/ns/odrl/2/spatial":[{"@id":"http://sws.geonames.org/6295630/"}]},{"@id":"http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8","@type":["http://www.w3.org/ns/odrl/2/Offer","http://www.w3.org/ns/odrl/2/Asset","http://openpermissions.org/ns/op/1.1/Policy","http://www.w3.org/ns/odrl/2/Policy"],"http://www.w3.org/ns/odrl/2/assigner":[{"@id":"http://openpermissions.org/ns/id/7dfe87062e1941839005cf314ec33710"}],"http://www.w3.org/ns/odrl/2/conflict":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}],"http://purl.org/dc/terms/created":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"}],"http://purl.org/dc/terms/modified":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"},{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-05-20T16:11:06.294000+00:00"}],"http://purl.org/dc/terms/title":[{"@language":"en","@value":"Non-commercial Website"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"}],"http://www.w3.org/ns/odrl/2/inheritAllowed":[{"@value":false}],"http://openpermissions.org/ns/op/1.1/policyDescription":[{"@language":"en","@value":"Use an image on a blog or website<br/><br/>Site does not carry advertising or sell products or services.<br/>Site receives no more than 50,000 views per month<br/>Maximum size of image 400 x 400px."}],"http://www.w3.org/ns/odrl/2/permission":[{"@id":"http://openpermissions.org/ns/id/295c0a5a5efc44f8aec9508603a7f9d5"}],"http://www.w3.org/ns/odrl/2/profile":[{"@language":"en","@value":"http://openpermissions.org/ns/opex/1.0/"}],"http://www.w3.org/ns/odrl/2/target":[{"@id":"http://openpermissions.org/ns/id/081a42ecc19d4b20b7078740c474620e"},{"@id":"http://openpermissions.org/ns/id/7d8cc2b7e7284e67bf0ade9007c887bc"},{"@id":"http://openpermissions.org/ns/id/1133475ce672484caea82bec9c3b4147"},{"@id":"http://openpermissions.org/ns/id/8164b70deaa74e83928353e933bef4dd"},{"@id":"http://openpermissions.org/ns/id/165d8b43aed84530aed685b7ac063f98"},{"@id":"http://openpermissions.org/ns/id/d401964b086c49a8bda78c469b904a14"},{"@id":"http://openpermissions.org/ns/id/d86128c3dfdf459bb2a5ec8037fe2dcf"},{"@id":"http://openpermissions.org/ns/id/1c279eb0dd024b50bbe063147645afca"},{"@id":"http://openpermissions.org/ns/id/c49f94c7c0d54d27923f2c9aa0908770"},{"@id":"http://openpermissions.org/ns/id/f628280a61f64799baa34dba6d2b6cb3"},{"@id":"http://openpermissions.org/ns/id/475ce2d3be2c411a89ec3f70338df3c9"},{"@id":"http://openpermissions.org/ns/id/2049ae4cbc104cce9d095bd7c0cc85c5"},{"@id":"http://openpermissions.org/ns/id/67c81b79ce2f4797995ffdde3c6bd7bf"},{"@id":"http://openpermissions.org/ns/id/c634f25a03be439db5bcafa7648713cc"},{"@id":"http://openpermissions.org/ns/id/d305fe9b6d194a6ea4bb35772872e265"},{"@id":"http://openpermissions.org/ns/id/f003d3736d2a4fc2b3b45b5b22781c40"},{"@id":"http://openpermissions.org/ns/id/a5a177ba246f454bbc1ea315e07db873"},{"@id":"http://openpermissions.org/ns/id/7faf9bf9930b41aaa3011da425d352a0"},{"@id":"http://openpermissions.org/ns/id/df681b2d50ad4adfbab6a516a36ee937"},{"@id":"http://openpermissions.org/ns/id/9bcf4ff0ca1b4c4b980b6c5f0660e95b"},{"@id":"http://openpermissions.org/ns/id/3402ce51fcfc425cbc0e514b18425699"},{"@id":"http://openpermissions.org/ns/id/7238040c2f8e467c9a5b8aa755a7fff7"},{"@id":"http://openpermissions.org/ns/id/91ede339f3df4450aff99a868a40074a"},{"@id":"http://openpermissions.org/ns/id/a7b945cfe0784fa49925f84453998e02"},{"@id":"http://openpermissions.org/ns/id/ff815ae9cd81404597d9f59f7754474d"},{"@id":"http://openpermissions.org/ns/id/c1ff26c81cf84674be0fc5de74801ae2"},{"@id":"http://openpermissions.org/ns/id/97f67fc73dfe44049ad408ca506894ef"},{"@id":"http://openpermissions.org/ns/id/0c92ef9243fd46c6b711d50f4b3a2e96"},{"@id":"http://openpermissions.org/ns/id/ea878e15b098433f9be31815a8a9130c"},{"@id":"http://openpermissions.org/ns/id/853754bf1b144e5da6071b901a4f791c"},{"@id":"http://openpermissions.org/ns/id/b43db62dd7e24694ac09d09318290fd1"},{"@id":"http://openpermissions.org/ns/id/8d71ae9f1d2d418a8a0367d37d30ebad"},{"@id":"http://openpermissions.org/ns/id/02fe46df70d949a787312d218eac279c"},{"@id":"http://openpermissions.org/ns/id/fa72751888ed4b35b05c889aa9f453ff"},{"@id":"http://openpermissions.org/ns/id/ac9d1c16a3f5474d93baf79089d26688"},{"@id":"http://openpermissions.org/ns/id/6335fededf744520b26a2d4a427bc2ca"},{"@id":"http://openpermissions.org/ns/id/f105fd470a8f403faacde7e69f91a161"},{"@id":"http://openpermissions.org/ns/id/24ef52bec697412f9f4a61200ffc29df"},{"@id":"http://openpermissions.org/ns/id/887979ab70e44c65b39719c4ea08c565"},{"@id":"http://openpermissions.org/ns/id/28bca0d758a34f789fdf35c17369b51f"},{"@id":"http://openpermissions.org/ns/id/76009f788b834647bc62c2f606742107"},{"@id":"http://openpermissions.org/ns/id/c7f389e1262e4de1b506033d6573e0e6"},{"@id":"http://openpermissions.org/ns/id/b62f78d96e184449aa26032571c4e554"},{"@id":"http://openpermissions.org/ns/id/aa9881ca32b7410fb3f4adc13c4119e2"},{"@id":"http://openpermissions.org/ns/id/94b48b7ce8ac48b6bbf3caf1655b5601"},{"@id":"http://openpermissions.org/ns/id/2664c3b7f9624ec7be8b6aeb12f499da"},{"@id":"http://openpermissions.org/ns/id/8a8a077148bd4c448a647c369739d1d3"},{"@id":"http://openpermissions.org/ns/id/b6550ff196d64a6cafd06926e9cea74f"},{"@id":"http://openpermissions.org/ns/id/4f498ecfd82d4dcba1d038a55857198d"},{"@id":"http://openpermissions.org/ns/id/23cd89d47d8c4b809f9bedf20ad395a1"},{"@id":"http://openpermissions.org/ns/id/27a3bbc00f7048c5812d35339c6677c6"},{"@id":"http://openpermissions.org/ns/id/11202b8e10854cdbb279160204f933e4"},{"@id":"http://openpermissions.org/ns/id/9aa76c6853f446d8a2bb30d0e880febd"}],"http://www.w3.org/ns/odrl/2/type":[{"@language":"en","@value":"offer"}],"http://www.w3.org/ns/odrl/2/uid":[{"@language":"en","@value":"a88b857c4ad2430584b03fd8184dc88b"}],"http://www.w3.org/ns/odrl/2/undefined":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}]},{"@id":"http://openpermissions.org/ns/id/c25a0129e6ba4f3fb24931bc7a289095","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/views":[{"@value":50000}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/visitorsPerMonth"}]},{"@id":"http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514","@type":["http://www.w3.org/ns/odrl/2/Duty","http://www.w3.org/ns/odrl/2/Rule"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/compensate"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"}]},{"@id":"http://openpermissions.org/ns/id/074536c6e69249e7a1986acdcfc11ffa","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/count":[{"@value":1}],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}]},{"@id":"http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391","@type":["http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://www.w3.org/ns/odrl/2/payAmount":[{"@type":"http://www.w3.org/2001/XMLSchema#decimal","@value":"1"}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://cvx.iptc.org/iso4217a/GBP"}]},{"@id":"http://openpermissions.org/ns/id/66a15b9d0c91473da18e7ccf85187334","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/host":[{"@id":"http://openpermissions.org/ns/opex/1.0/nonCommercialWebsite"}]},{"@id":"http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/attribute"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf"}]}],"organisation":{"website":"http://exampleco.digicat.io","star_rating":0,"name":"ExampleCo","twitter":"DigiCatapult","state":"approved","created_by":"d17c7d92c98009f458d15ed978000518","id":"exampleco","phone":"0300 1233 101","reference_links":{"links":{"examplecopictureid":"https://demo.digicat.io/exampleco/image?source_id={source_id}"},"redirect_id_type":"examplecopictureid"},"address":"Digital Catapult\n101 Euston Road London\nNW1 2RA","logo":"https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png","email":"support-copyrighthub@cde.catapult.org.uk","description":"A fictional company for demo purposes for the Copyright Hub project"}},{"offer":[{"@id":"http://openpermissions.org/ns/id/584bd56f56e742308d88ee1d448750b5","@type":["http://www.w3.org/ns/odrl/2/Offer","http://www.w3.org/ns/odrl/2/Policy","http://www.w3.org/ns/odrl/2/Asset","http://openpermissions.org/ns/op/1.1/Policy"],"http://www.w3.org/ns/odrl/2/assigner":[{"@id":"http://openpermissions.org/ns/id/35a847fc7f2a44a9a78761400158f973"}],"http://www.w3.org/ns/odrl/2/conflict":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}],"http://purl.org/dc/terms/created":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"}],"http://purl.org/dc/terms/modified":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"},{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-05-20T16:11:07.194000+00:00"}],"http://purl.org/dc/terms/title":[{"@language":"en","@value":"Commercial Website"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/1b78c684335b43faa9b565a66ab9e360"}],"http://www.w3.org/ns/odrl/2/inheritAllowed":[{"@value":false}],"http://openpermissions.org/ns/op/1.1/policyDescription":[{"@language":"en","@value":"Use an image on a blog or website.<br/><br/>Site may carry advertising and/or sells products or services (NB image may not be used in an advert).<br/>Site receives no more than 50,000 views per month.<br/>Maximum size of image 400 x 400px."}],"http://www.w3.org/ns/odrl/2/permission":[{"@id":"http://openpermissions.org/ns/id/409eb20ee58f4a489d65e68a53bdac71"}],"http://www.w3.org/ns/odrl/2/profile":[{"@language":"en","@value":"http://openpermissions.org/ns/opex/1.0/"}],"http://www.w3.org/ns/odrl/2/target":[{"@id":"http://openpermissions.org/ns/id/745b544af1bb417db00213315a39ccf1"},{"@id":"http://openpermissions.org/ns/id/7238040c2f8e467c9a5b8aa755a7fff7"},{"@id":"http://openpermissions.org/ns/id/d305fe9b6d194a6ea4bb35772872e265"},{"@id":"http://openpermissions.org/ns/id/081a42ecc19d4b20b7078740c474620e"},{"@id":"http://openpermissions.org/ns/id/c57ab28f4c0d49f2b12d65b542569907"},{"@id":"http://openpermissions.org/ns/id/ac9d1c16a3f5474d93baf79089d26688"},{"@id":"http://openpermissions.org/ns/id/e692ce54c8c14524a6cb766bbcb30cb7"},{"@id":"http://openpermissions.org/ns/id/93a804f10e314552afd84a6861d47db6"},{"@id":"http://openpermissions.org/ns/id/165d8b43aed84530aed685b7ac063f98"},{"@id":"http://openpermissions.org/ns/id/6335fededf744520b26a2d4a427bc2ca"},{"@id":"http://openpermissions.org/ns/id/24ef52bec697412f9f4a61200ffc29df"},{"@id":"http://openpermissions.org/ns/id/c634f25a03be439db5bcafa7648713cc"},{"@id":"http://openpermissions.org/ns/id/02fe46df70d949a787312d218eac279c"},{"@id":"http://openpermissions.org/ns/id/5f54774ce5e94495994e6b35b1501eec"},{"@id":"http://openpermissions.org/ns/id/a3571dfed23a40238802e1633ec24a50"},{"@id":"http://openpermissions.org/ns/id/4f498ecfd82d4dcba1d038a55857198d"},{"@id":"http://openpermissions.org/ns/id/47cb4457184646728d3fd266846a00c6"},{"@id":"http://openpermissions.org/ns/id/1133475ce672484caea82bec9c3b4147"},{"@id":"http://openpermissions.org/ns/id/0617c5eb1f4a48dbb15e08129ab0306f"},{"@id":"http://openpermissions.org/ns/id/0c92ef9243fd46c6b711d50f4b3a2e96"},{"@id":"http://openpermissions.org/ns/id/aa82d80f0ce14752ac47fad1d8ef3aeb"},{"@id":"http://openpermissions.org/ns/id/8d71ae9f1d2d418a8a0367d37d30ebad"},{"@id":"http://openpermissions.org/ns/id/2664c3b7f9624ec7be8b6aeb12f499da"},{"@id":"http://openpermissions.org/ns/id/f105fd470a8f403faacde7e69f91a161"},{"@id":"http://openpermissions.org/ns/id/c7f389e1262e4de1b506033d6573e0e6"},{"@id":"http://openpermissions.org/ns/id/f003d3736d2a4fc2b3b45b5b22781c40"},{"@id":"http://openpermissions.org/ns/id/8164b70deaa74e83928353e933bef4dd"},{"@id":"http://openpermissions.org/ns/id/ff815ae9cd81404597d9f59f7754474d"},{"@id":"http://openpermissions.org/ns/id/5708a208b0f6405da84b1acfd5e1a631"},{"@id":"http://openpermissions.org/ns/id/e330532b0cee435aaada01acb4012706"},{"@id":"http://openpermissions.org/ns/id/6b7b0c3e4b5c4d998943e4e1327757de"},{"@id":"http://openpermissions.org/ns/id/c1ff26c81cf84674be0fc5de74801ae2"},{"@id":"http://openpermissions.org/ns/id/2049ae4cbc104cce9d095bd7c0cc85c5"},{"@id":"http://openpermissions.org/ns/id/7d8cc2b7e7284e67bf0ade9007c887bc"},{"@id":"http://openpermissions.org/ns/id/621c2041455e4c0fa4bd7f0294c9f029"},{"@id":"http://openpermissions.org/ns/id/c49f94c7c0d54d27923f2c9aa0908770"},{"@id":"http://openpermissions.org/ns/id/91ede339f3df4450aff99a868a40074a"},{"@id":"http://openpermissions.org/ns/id/b62f78d96e184449aa26032571c4e554"},{"@id":"http://openpermissions.org/ns/id/3c8ee9b864c64d3d94539e5fe1f1aa15"},{"@id":"http://openpermissions.org/ns/id/03304aa56651496cbece992d6cb0eed4"},{"@id":"http://openpermissions.org/ns/id/1c279eb0dd024b50bbe063147645afca"},{"@id":"http://openpermissions.org/ns/id/ea878e15b098433f9be31815a8a9130c"}],"http://www.w3.org/ns/odrl/2/type":[{"@language":"en","@value":"offer"}],"http://www.w3.org/ns/odrl/2/uid":[{"@language":"en","@value":"b2474e57ed4a417ab385acda175ff5c5"}],"http://www.w3.org/ns/odrl/2/undefined":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}]},{"@id":"http://openpermissions.org/ns/id/e692ce54c8c14524a6cb766bbcb30cb7","@type":["http://openpermissions.org/ns/op/1.1/AssetSelector","http://openpermissions.org/ns/op/1.1/Asset","http://www.w3.org/ns/odrl/2/Asset"],"http://openpermissions.org/ns/op/1.1/count":[{"@value":1}],"http://openpermissions.org/ns/op/1.1/fromSet":[{"@id":"http://openpermissions.org/ns/id/d562ded9942449fca62c6b9653129080"}],"http://openpermissions.org/ns/op/1.1/selectRequired":[{"@value":false}]},{"@id":"http://openpermissions.org/ns/id/a2945f5e462d453388d3e67e3c20efae","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/attributeText":[{"@language":"en","@value":"This photograph (c) Test Demo PseudoLtd Ltd, all rights reserved."}]},{"@id":"http://openpermissions.org/ns/id/1b78c684335b43faa9b565a66ab9e360","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/compensate"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/635fb78bf40b44a19c4d66c8c648328f"}]},{"@id":"http://openpermissions.org/ns/id/409eb20ee58f4a489d65e68a53bdac71","@type":["http://www.w3.org/ns/odrl/2/Permission","http://www.w3.org/ns/odrl/2/Rule"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/present"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/96b3e4f8a1c44394b2b93b64eb436c5f"},{"@id":"http://openpermissions.org/ns/id/1278c8033b544ada9be4ae55a107cc2d"},{"@id":"http://openpermissions.org/ns/id/0523141aa2794eedacc010a25b168aa6"},{"@id":"http://openpermissions.org/ns/id/b816a7181a4344629a8e84f30ea6e10d"},{"@id":"http://openpermissions.org/ns/id/7a8f219cd99440898b9627c735546d17"},{"@id":"http://openpermissions.org/ns/id/92196465c7524a03b6ab925d33cc35bb"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/f9ab934e1adc42fa97240b5cf9b92256"}]},{"@id":"http://openpermissions.org/ns/id/b816a7181a4344629a8e84f30ea6e10d","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/isPartOf"}],"http://www.w3.org/ns/odrl/2/spatial":[{"@id":"http://sws.geonames.org/6295630/"}]},{"@id":"http://openpermissions.org/ns/id/35a847fc7f2a44a9a78761400158f973","@type":["http://openpermissions.org/ns/op/1.1/Party"],"http://openpermissions.org/ns/op/1.1/provider":[{"@value":"exampleco"}],"http://openpermissions.org/ns/op/1.1/reference":[{"@value":""}]},{"@id":"http://openpermissions.org/ns/id/0523141aa2794eedacc010a25b168aa6","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/count":[{"@value":1}],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}]},{"@id":"http://openpermissions.org/ns/id/f9ab934e1adc42fa97240b5cf9b92256","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/attribute"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/a2945f5e462d453388d3e67e3c20efae"}]},{"@id":"http://openpermissions.org/ns/id/7a8f219cd99440898b9627c735546d17","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/width":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/1278c8033b544ada9be4ae55a107cc2d","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/host":[{"@id":"http://openpermissions.org/ns/opex/1.0/commercialWebsite"}]},{"@id":"http://openpermissions.org/ns/id/96b3e4f8a1c44394b2b93b64eb436c5f","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/views":[{"@value":50000}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/visitorsPerMonth"}]},{"@id":"http://openpermissions.org/ns/id/92196465c7524a03b6ab925d33cc35bb","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/height":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/635fb78bf40b44a19c4d66c8c648328f","@type":["http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://www.w3.org/ns/odrl/2/payAmount":[{"@type":"http://www.w3.org/2001/XMLSchema#decimal","@value":"2"}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://cvx.iptc.org/iso4217a/GBP"}]}],"organisation":{"website":"http://exampleco.digicat.io","star_rating":0,"name":"ExampleCo","twitter":"DigiCatapult","state":"approved","created_by":"d17c7d92c98009f458d15ed978000518","id":"exampleco","phone":"0300 1233 101","reference_links":{"links":{"examplecopictureid":"https://demo.digicat.io/exampleco/image?source_id={source_id}"},"redirect_id_type":"examplecopictureid"},"address":"Digital Catapult\n101 Euston Road London\nNW1 2RA","logo":"https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png","email":"support-copyrighthub@cde.catapult.org.uk","description":"A fictional company for demo purposes for the Copyright Hub project"}}]
    var response=selector.parseOffer(offerObj);
    expect(response).to.be.an('array');
    expect(response.length).to.equal(2);
  });

  it('should return a parsed array when object is passed', () => {
    const selector = new OfferSelector();
    var offerObj = [{"offer":[{"@id":"http://openpermissions.org/ns/id/3fd3d56d52724d978281e455ab183f2c","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/height":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/attributeText":[{"@language":"en","@value":"This photograph (c) Test Demo PseudoLtd Ltd, all rights reserved."}]},{"@id":"http://openpermissions.org/ns/id/295c0a5a5efc44f8aec9508603a7f9d5","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Permission"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/present"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/66a15b9d0c91473da18e7ccf85187334"},{"@id":"http://openpermissions.org/ns/id/c25a0129e6ba4f3fb24931bc7a289095"},{"@id":"http://openpermissions.org/ns/id/3fd3d56d52724d978281e455ab183f2c"},{"@id":"http://openpermissions.org/ns/id/5eed56b7bb8b4d7e9137719c83c82492"},{"@id":"http://openpermissions.org/ns/id/074536c6e69249e7a1986acdcfc11ffa"},{"@id":"http://openpermissions.org/ns/id/d8fbc52c598b4daeb40a1db95fe45812"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628"}]},{"@id":"http://openpermissions.org/ns/id/7dfe87062e1941839005cf314ec33710","@type":["http://openpermissions.org/ns/op/1.1/Party"],"http://openpermissions.org/ns/op/1.1/provider":[{"@value":"exampleco"}],"http://openpermissions.org/ns/op/1.1/reference":[{"@value":""}]},{"@id":"http://openpermissions.org/ns/id/d8fbc52c598b4daeb40a1db95fe45812","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/width":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/f628280a61f64799baa34dba6d2b6cb3","@type":["http://openpermissions.org/ns/op/1.1/Asset","http://openpermissions.org/ns/op/1.1/AssetSelector","http://www.w3.org/ns/odrl/2/Asset"],"http://openpermissions.org/ns/op/1.1/count":[{"@value":1}],"http://openpermissions.org/ns/op/1.1/fromSet":[{"@id":"http://openpermissions.org/ns/id/d562ded9942449fca62c6b9653129080"}],"http://openpermissions.org/ns/op/1.1/selectRequired":[{"@value":false}]},{"@id":"http://openpermissions.org/ns/id/5eed56b7bb8b4d7e9137719c83c82492","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/isPartOf"}],"http://www.w3.org/ns/odrl/2/spatial":[{"@id":"http://sws.geonames.org/6295630/"}]},{"@id":"http://openpermissions.org/ns/id/e3138acd145f484e9c5601685d5166f8","@type":["http://www.w3.org/ns/odrl/2/Offer","http://www.w3.org/ns/odrl/2/Asset","http://openpermissions.org/ns/op/1.1/Policy","http://www.w3.org/ns/odrl/2/Policy"],"http://www.w3.org/ns/odrl/2/assigner":[{"@id":"http://openpermissions.org/ns/id/7dfe87062e1941839005cf314ec33710"}],"http://www.w3.org/ns/odrl/2/conflict":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}],"http://purl.org/dc/terms/created":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"}],"http://purl.org/dc/terms/modified":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"},{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-05-20T16:11:06.294000+00:00"}],"http://purl.org/dc/terms/title":[{"@language":"en","@value":"Non-commercial Website"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514"}],"http://www.w3.org/ns/odrl/2/inheritAllowed":[{"@value":false}],"http://openpermissions.org/ns/op/1.1/policyDescription":[{"@language":"en","@value":"Use an image on a blog or website<br/><br/>Site does not carry advertising or sell products or services.<br/>Site receives no more than 50,000 views per month<br/>Maximum size of image 400 x 400px."}],"http://www.w3.org/ns/odrl/2/permission":[{"@id":"http://openpermissions.org/ns/id/295c0a5a5efc44f8aec9508603a7f9d5"}],"http://www.w3.org/ns/odrl/2/profile":[{"@language":"en","@value":"http://openpermissions.org/ns/opex/1.0/"}],"http://www.w3.org/ns/odrl/2/target":[{"@id":"http://openpermissions.org/ns/id/081a42ecc19d4b20b7078740c474620e"},{"@id":"http://openpermissions.org/ns/id/7d8cc2b7e7284e67bf0ade9007c887bc"},{"@id":"http://openpermissions.org/ns/id/1133475ce672484caea82bec9c3b4147"},{"@id":"http://openpermissions.org/ns/id/8164b70deaa74e83928353e933bef4dd"},{"@id":"http://openpermissions.org/ns/id/165d8b43aed84530aed685b7ac063f98"},{"@id":"http://openpermissions.org/ns/id/d401964b086c49a8bda78c469b904a14"},{"@id":"http://openpermissions.org/ns/id/d86128c3dfdf459bb2a5ec8037fe2dcf"},{"@id":"http://openpermissions.org/ns/id/1c279eb0dd024b50bbe063147645afca"},{"@id":"http://openpermissions.org/ns/id/c49f94c7c0d54d27923f2c9aa0908770"},{"@id":"http://openpermissions.org/ns/id/f628280a61f64799baa34dba6d2b6cb3"},{"@id":"http://openpermissions.org/ns/id/475ce2d3be2c411a89ec3f70338df3c9"},{"@id":"http://openpermissions.org/ns/id/2049ae4cbc104cce9d095bd7c0cc85c5"},{"@id":"http://openpermissions.org/ns/id/67c81b79ce2f4797995ffdde3c6bd7bf"},{"@id":"http://openpermissions.org/ns/id/c634f25a03be439db5bcafa7648713cc"},{"@id":"http://openpermissions.org/ns/id/d305fe9b6d194a6ea4bb35772872e265"},{"@id":"http://openpermissions.org/ns/id/f003d3736d2a4fc2b3b45b5b22781c40"},{"@id":"http://openpermissions.org/ns/id/a5a177ba246f454bbc1ea315e07db873"},{"@id":"http://openpermissions.org/ns/id/7faf9bf9930b41aaa3011da425d352a0"},{"@id":"http://openpermissions.org/ns/id/df681b2d50ad4adfbab6a516a36ee937"},{"@id":"http://openpermissions.org/ns/id/9bcf4ff0ca1b4c4b980b6c5f0660e95b"},{"@id":"http://openpermissions.org/ns/id/3402ce51fcfc425cbc0e514b18425699"},{"@id":"http://openpermissions.org/ns/id/7238040c2f8e467c9a5b8aa755a7fff7"},{"@id":"http://openpermissions.org/ns/id/91ede339f3df4450aff99a868a40074a"},{"@id":"http://openpermissions.org/ns/id/a7b945cfe0784fa49925f84453998e02"},{"@id":"http://openpermissions.org/ns/id/ff815ae9cd81404597d9f59f7754474d"},{"@id":"http://openpermissions.org/ns/id/c1ff26c81cf84674be0fc5de74801ae2"},{"@id":"http://openpermissions.org/ns/id/97f67fc73dfe44049ad408ca506894ef"},{"@id":"http://openpermissions.org/ns/id/0c92ef9243fd46c6b711d50f4b3a2e96"},{"@id":"http://openpermissions.org/ns/id/ea878e15b098433f9be31815a8a9130c"},{"@id":"http://openpermissions.org/ns/id/853754bf1b144e5da6071b901a4f791c"},{"@id":"http://openpermissions.org/ns/id/b43db62dd7e24694ac09d09318290fd1"},{"@id":"http://openpermissions.org/ns/id/8d71ae9f1d2d418a8a0367d37d30ebad"},{"@id":"http://openpermissions.org/ns/id/02fe46df70d949a787312d218eac279c"},{"@id":"http://openpermissions.org/ns/id/fa72751888ed4b35b05c889aa9f453ff"},{"@id":"http://openpermissions.org/ns/id/ac9d1c16a3f5474d93baf79089d26688"},{"@id":"http://openpermissions.org/ns/id/6335fededf744520b26a2d4a427bc2ca"},{"@id":"http://openpermissions.org/ns/id/f105fd470a8f403faacde7e69f91a161"},{"@id":"http://openpermissions.org/ns/id/24ef52bec697412f9f4a61200ffc29df"},{"@id":"http://openpermissions.org/ns/id/887979ab70e44c65b39719c4ea08c565"},{"@id":"http://openpermissions.org/ns/id/28bca0d758a34f789fdf35c17369b51f"},{"@id":"http://openpermissions.org/ns/id/76009f788b834647bc62c2f606742107"},{"@id":"http://openpermissions.org/ns/id/c7f389e1262e4de1b506033d6573e0e6"},{"@id":"http://openpermissions.org/ns/id/b62f78d96e184449aa26032571c4e554"},{"@id":"http://openpermissions.org/ns/id/aa9881ca32b7410fb3f4adc13c4119e2"},{"@id":"http://openpermissions.org/ns/id/94b48b7ce8ac48b6bbf3caf1655b5601"},{"@id":"http://openpermissions.org/ns/id/2664c3b7f9624ec7be8b6aeb12f499da"},{"@id":"http://openpermissions.org/ns/id/8a8a077148bd4c448a647c369739d1d3"},{"@id":"http://openpermissions.org/ns/id/b6550ff196d64a6cafd06926e9cea74f"},{"@id":"http://openpermissions.org/ns/id/4f498ecfd82d4dcba1d038a55857198d"},{"@id":"http://openpermissions.org/ns/id/23cd89d47d8c4b809f9bedf20ad395a1"},{"@id":"http://openpermissions.org/ns/id/27a3bbc00f7048c5812d35339c6677c6"},{"@id":"http://openpermissions.org/ns/id/11202b8e10854cdbb279160204f933e4"},{"@id":"http://openpermissions.org/ns/id/9aa76c6853f446d8a2bb30d0e880febd"}],"http://www.w3.org/ns/odrl/2/type":[{"@language":"en","@value":"offer"}],"http://www.w3.org/ns/odrl/2/uid":[{"@language":"en","@value":"a88b857c4ad2430584b03fd8184dc88b"}],"http://www.w3.org/ns/odrl/2/undefined":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}]},{"@id":"http://openpermissions.org/ns/id/c25a0129e6ba4f3fb24931bc7a289095","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/views":[{"@value":50000}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/visitorsPerMonth"}]},{"@id":"http://openpermissions.org/ns/id/8731c302fbe542e9a1da8d7aeb713514","@type":["http://www.w3.org/ns/odrl/2/Duty","http://www.w3.org/ns/odrl/2/Rule"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/compensate"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391"}]},{"@id":"http://openpermissions.org/ns/id/074536c6e69249e7a1986acdcfc11ffa","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/count":[{"@value":1}],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}]},{"@id":"http://openpermissions.org/ns/id/b273de423ab54816ab7aeb0b60a1c391","@type":["http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://www.w3.org/ns/odrl/2/payAmount":[{"@type":"http://www.w3.org/2001/XMLSchema#decimal","@value":"1"}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://cvx.iptc.org/iso4217a/GBP"}]},{"@id":"http://openpermissions.org/ns/id/66a15b9d0c91473da18e7ccf85187334","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/host":[{"@id":"http://openpermissions.org/ns/opex/1.0/nonCommercialWebsite"}]},{"@id":"http://openpermissions.org/ns/id/ee49ba566d3c41479608ce7ee7cd8628","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/attribute"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/db742f3832ac443eba397167bc6244cf"}]}],"organisation":{"website":"http://exampleco.digicat.io","star_rating":0,"name":"ExampleCo","twitter":"DigiCatapult","state":"approved","created_by":"d17c7d92c98009f458d15ed978000518","id":"exampleco","phone":"0300 1233 101","reference_links":{"links":{"examplecopictureid":"https://demo.digicat.io/exampleco/image?source_id={source_id}"},"redirect_id_type":"examplecopictureid"},"address":"Digital Catapult\n101 Euston Road London\nNW1 2RA","logo":"https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png","email":"support-copyrighthub@cde.catapult.org.uk","description":"A fictional company for demo purposes for the Copyright Hub project"}},{"offer":[{"@id":"http://openpermissions.org/ns/id/584bd56f56e742308d88ee1d448750b5","@type":["http://www.w3.org/ns/odrl/2/Offer","http://www.w3.org/ns/odrl/2/Policy","http://www.w3.org/ns/odrl/2/Asset","http://openpermissions.org/ns/op/1.1/Policy"],"http://www.w3.org/ns/odrl/2/assigner":[{"@id":"http://openpermissions.org/ns/id/35a847fc7f2a44a9a78761400158f973"}],"http://www.w3.org/ns/odrl/2/conflict":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}],"http://purl.org/dc/terms/created":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"}],"http://purl.org/dc/terms/modified":[{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-04-20T17:08:00+00:00"},{"@type":"http://www.w3.org/2001/XMLSchema#dateTime","@value":"2016-05-20T16:11:07.194000+00:00"}],"http://purl.org/dc/terms/title":[{"@language":"en","@value":"Commercial Website"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/1b78c684335b43faa9b565a66ab9e360"}],"http://www.w3.org/ns/odrl/2/inheritAllowed":[{"@value":false}],"http://openpermissions.org/ns/op/1.1/policyDescription":[{"@language":"en","@value":"Use an image on a blog or website.<br/><br/>Site may carry advertising and/or sells products or services (NB image may not be used in an advert).<br/>Site receives no more than 50,000 views per month.<br/>Maximum size of image 400 x 400px."}],"http://www.w3.org/ns/odrl/2/permission":[{"@id":"http://openpermissions.org/ns/id/409eb20ee58f4a489d65e68a53bdac71"}],"http://www.w3.org/ns/odrl/2/profile":[{"@language":"en","@value":"http://openpermissions.org/ns/opex/1.0/"}],"http://www.w3.org/ns/odrl/2/target":[{"@id":"http://openpermissions.org/ns/id/745b544af1bb417db00213315a39ccf1"},{"@id":"http://openpermissions.org/ns/id/7238040c2f8e467c9a5b8aa755a7fff7"},{"@id":"http://openpermissions.org/ns/id/d305fe9b6d194a6ea4bb35772872e265"},{"@id":"http://openpermissions.org/ns/id/081a42ecc19d4b20b7078740c474620e"},{"@id":"http://openpermissions.org/ns/id/c57ab28f4c0d49f2b12d65b542569907"},{"@id":"http://openpermissions.org/ns/id/ac9d1c16a3f5474d93baf79089d26688"},{"@id":"http://openpermissions.org/ns/id/e692ce54c8c14524a6cb766bbcb30cb7"},{"@id":"http://openpermissions.org/ns/id/93a804f10e314552afd84a6861d47db6"},{"@id":"http://openpermissions.org/ns/id/165d8b43aed84530aed685b7ac063f98"},{"@id":"http://openpermissions.org/ns/id/6335fededf744520b26a2d4a427bc2ca"},{"@id":"http://openpermissions.org/ns/id/24ef52bec697412f9f4a61200ffc29df"},{"@id":"http://openpermissions.org/ns/id/c634f25a03be439db5bcafa7648713cc"},{"@id":"http://openpermissions.org/ns/id/02fe46df70d949a787312d218eac279c"},{"@id":"http://openpermissions.org/ns/id/5f54774ce5e94495994e6b35b1501eec"},{"@id":"http://openpermissions.org/ns/id/a3571dfed23a40238802e1633ec24a50"},{"@id":"http://openpermissions.org/ns/id/4f498ecfd82d4dcba1d038a55857198d"},{"@id":"http://openpermissions.org/ns/id/47cb4457184646728d3fd266846a00c6"},{"@id":"http://openpermissions.org/ns/id/1133475ce672484caea82bec9c3b4147"},{"@id":"http://openpermissions.org/ns/id/0617c5eb1f4a48dbb15e08129ab0306f"},{"@id":"http://openpermissions.org/ns/id/0c92ef9243fd46c6b711d50f4b3a2e96"},{"@id":"http://openpermissions.org/ns/id/aa82d80f0ce14752ac47fad1d8ef3aeb"},{"@id":"http://openpermissions.org/ns/id/8d71ae9f1d2d418a8a0367d37d30ebad"},{"@id":"http://openpermissions.org/ns/id/2664c3b7f9624ec7be8b6aeb12f499da"},{"@id":"http://openpermissions.org/ns/id/f105fd470a8f403faacde7e69f91a161"},{"@id":"http://openpermissions.org/ns/id/c7f389e1262e4de1b506033d6573e0e6"},{"@id":"http://openpermissions.org/ns/id/f003d3736d2a4fc2b3b45b5b22781c40"},{"@id":"http://openpermissions.org/ns/id/8164b70deaa74e83928353e933bef4dd"},{"@id":"http://openpermissions.org/ns/id/ff815ae9cd81404597d9f59f7754474d"},{"@id":"http://openpermissions.org/ns/id/5708a208b0f6405da84b1acfd5e1a631"},{"@id":"http://openpermissions.org/ns/id/e330532b0cee435aaada01acb4012706"},{"@id":"http://openpermissions.org/ns/id/6b7b0c3e4b5c4d998943e4e1327757de"},{"@id":"http://openpermissions.org/ns/id/c1ff26c81cf84674be0fc5de74801ae2"},{"@id":"http://openpermissions.org/ns/id/2049ae4cbc104cce9d095bd7c0cc85c5"},{"@id":"http://openpermissions.org/ns/id/7d8cc2b7e7284e67bf0ade9007c887bc"},{"@id":"http://openpermissions.org/ns/id/621c2041455e4c0fa4bd7f0294c9f029"},{"@id":"http://openpermissions.org/ns/id/c49f94c7c0d54d27923f2c9aa0908770"},{"@id":"http://openpermissions.org/ns/id/91ede339f3df4450aff99a868a40074a"},{"@id":"http://openpermissions.org/ns/id/b62f78d96e184449aa26032571c4e554"},{"@id":"http://openpermissions.org/ns/id/3c8ee9b864c64d3d94539e5fe1f1aa15"},{"@id":"http://openpermissions.org/ns/id/03304aa56651496cbece992d6cb0eed4"},{"@id":"http://openpermissions.org/ns/id/1c279eb0dd024b50bbe063147645afca"},{"@id":"http://openpermissions.org/ns/id/ea878e15b098433f9be31815a8a9130c"}],"http://www.w3.org/ns/odrl/2/type":[{"@language":"en","@value":"offer"}],"http://www.w3.org/ns/odrl/2/uid":[{"@language":"en","@value":"b2474e57ed4a417ab385acda175ff5c5"}],"http://www.w3.org/ns/odrl/2/undefined":[{"@id":"http://www.w3.org/ns/odrl/2/invalid"}]},{"@id":"http://openpermissions.org/ns/id/e692ce54c8c14524a6cb766bbcb30cb7","@type":["http://openpermissions.org/ns/op/1.1/AssetSelector","http://openpermissions.org/ns/op/1.1/Asset","http://www.w3.org/ns/odrl/2/Asset"],"http://openpermissions.org/ns/op/1.1/count":[{"@value":1}],"http://openpermissions.org/ns/op/1.1/fromSet":[{"@id":"http://openpermissions.org/ns/id/d562ded9942449fca62c6b9653129080"}],"http://openpermissions.org/ns/op/1.1/selectRequired":[{"@value":false}]},{"@id":"http://openpermissions.org/ns/id/a2945f5e462d453388d3e67e3c20efae","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/attributeText":[{"@language":"en","@value":"This photograph (c) Test Demo PseudoLtd Ltd, all rights reserved."}]},{"@id":"http://openpermissions.org/ns/id/1b78c684335b43faa9b565a66ab9e360","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/compensate"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/635fb78bf40b44a19c4d66c8c648328f"}]},{"@id":"http://openpermissions.org/ns/id/409eb20ee58f4a489d65e68a53bdac71","@type":["http://www.w3.org/ns/odrl/2/Permission","http://www.w3.org/ns/odrl/2/Rule"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/present"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/96b3e4f8a1c44394b2b93b64eb436c5f"},{"@id":"http://openpermissions.org/ns/id/1278c8033b544ada9be4ae55a107cc2d"},{"@id":"http://openpermissions.org/ns/id/0523141aa2794eedacc010a25b168aa6"},{"@id":"http://openpermissions.org/ns/id/b816a7181a4344629a8e84f30ea6e10d"},{"@id":"http://openpermissions.org/ns/id/7a8f219cd99440898b9627c735546d17"},{"@id":"http://openpermissions.org/ns/id/92196465c7524a03b6ab925d33cc35bb"}],"http://www.w3.org/ns/odrl/2/duty":[{"@id":"http://openpermissions.org/ns/id/f9ab934e1adc42fa97240b5cf9b92256"}]},{"@id":"http://openpermissions.org/ns/id/b816a7181a4344629a8e84f30ea6e10d","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/isPartOf"}],"http://www.w3.org/ns/odrl/2/spatial":[{"@id":"http://sws.geonames.org/6295630/"}]},{"@id":"http://openpermissions.org/ns/id/35a847fc7f2a44a9a78761400158f973","@type":["http://openpermissions.org/ns/op/1.1/Party"],"http://openpermissions.org/ns/op/1.1/provider":[{"@value":"exampleco"}],"http://openpermissions.org/ns/op/1.1/reference":[{"@value":""}]},{"@id":"http://openpermissions.org/ns/id/0523141aa2794eedacc010a25b168aa6","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/count":[{"@value":1}],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}]},{"@id":"http://openpermissions.org/ns/id/f9ab934e1adc42fa97240b5cf9b92256","@type":["http://www.w3.org/ns/odrl/2/Rule","http://www.w3.org/ns/odrl/2/Duty"],"http://www.w3.org/ns/odrl/2/action":[{"@id":"http://www.w3.org/ns/odrl/2/attribute"}],"http://www.w3.org/ns/odrl/2/constraint":[{"@id":"http://openpermissions.org/ns/id/a2945f5e462d453388d3e67e3c20efae"}]},{"@id":"http://openpermissions.org/ns/id/7a8f219cd99440898b9627c735546d17","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/width":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/1278c8033b544ada9be4ae55a107cc2d","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://openpermissions.org/ns/opex/1.0/host":[{"@id":"http://openpermissions.org/ns/opex/1.0/commercialWebsite"}]},{"@id":"http://openpermissions.org/ns/id/96b3e4f8a1c44394b2b93b64eb436c5f","@type":["http://www.w3.org/ns/odrl/2/Constraint","http://openpermissions.org/ns/opex/1.0/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/views":[{"@value":50000}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/visitorsPerMonth"}]},{"@id":"http://openpermissions.org/ns/id/92196465c7524a03b6ab925d33cc35bb","@type":["http://openpermissions.org/ns/opex/1.0/Constraint","http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/lteq"}],"http://openpermissions.org/ns/opex/1.0/height":[{"@value":400}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://openpermissions.org/ns/opex/1.0/pixel"}]},{"@id":"http://openpermissions.org/ns/id/635fb78bf40b44a19c4d66c8c648328f","@type":["http://www.w3.org/ns/odrl/2/Constraint"],"http://www.w3.org/ns/odrl/2/operator":[{"@id":"http://www.w3.org/ns/odrl/2/eq"}],"http://www.w3.org/ns/odrl/2/payAmount":[{"@type":"http://www.w3.org/2001/XMLSchema#decimal","@value":"2"}],"http://www.w3.org/ns/odrl/2/unit":[{"@id":"http://cvx.iptc.org/iso4217a/GBP"}]}],"organisation":{"website":"http://exampleco.digicat.io","star_rating":0,"name":"ExampleCo","twitter":"DigiCatapult","state":"approved","created_by":"d17c7d92c98009f458d15ed978000518","id":"exampleco","phone":"0300 1233 101","reference_links":{"links":{"examplecopictureid":"https://demo.digicat.io/exampleco/image?source_id={source_id}"},"redirect_id_type":"examplecopictureid"},"address":"Digital Catapult\n101 Euston Road London\nNW1 2RA","logo":"https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png","email":"support-copyrighthub@cde.catapult.org.uk","description":"A fictional company for demo purposes for the Copyright Hub project"}}]
    var response = selector.parseOffer(offerObj);
    var expresp =  [{ "id": "0", "type" : "Non-commercial Website", "description": "Use an image on a blog or website<br/><br/>Site does not carry advertising or sell products or services.<br/>Site receives no more than 50,000 views per month<br/>Maximum size of image 400 x 400px." , color: "color1", "logo" : "https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png",
                "title_color": "#379392", "logo_color" : "#353866", "btn_text_color": "white", "primary_color": "#CE6D39", "secondary_color":"#F17F42"},
                { "id":"1", "type" : "Commercial Website", "description": "Use an image on a blog or website.<br/><br/>Site may carry advertising and/or sells products or services (NB image may not be used in an advert).<br/>Site receives no more than 50,000 views per month.<br/>Maximum size of image 400 x 400px." , color: "color1", "logo" : "https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/logo_exampleco_sm.png",
                            "title_color": "#379392", "logo_color" : "#353866", "btn_text_color": "white", "primary_color": "#CE6D39", "secondary_color":"#F17F42"}]

    expect(response).to.be.an('array');
    expect(response.length).to.equal(2);
    expect(response).to.eql(expresp);
  });

});

describe('OfferSelector constructor', () => {
  it('should initialise with default options if none provided', () => {
    const selector = new OfferSelector();
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom tag if provided', () => {
    const selector = new OfferSelector({tag: 'my-tag'});
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'my-tag'
    })
  });

  it('should initialise with custom offers if provided', () => {
    const selector = new OfferSelector({offers: 'https://my-offers'});
    expect(selector.options).to.eql({
      offers: 'https://my-offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector'
    })
  });

  it('should initialise with custom organisations if provided', () => {
    const selector = new OfferSelector({organisations: 'https://my-organisations',});
    expect(selector.options).to.eql({
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://my-organisations',
      tag: 'offer-selector'
    })
  });
  it('should initialise with custom options if provided', () => {
    const selector = new OfferSelector({offers: 'https://my-offers', organisations: 'https://my-organisations', tag: 'my-tag'});
    expect(selector.options).to.eql({
      offers: 'https://my-offers',
      organisations: 'https://my-organisations',
      tag: 'my-tag'
    })
  })
});

describe('Offer Selector parseOffers', () => {
   beforeEach(() => {
    sinon.stub(helper, 'getAssigner');
    sinon.stub(ldPromises, 'expand');

    helper.getAssigner.returns('org1');
    ldPromises.expand.resolves([{'id': 'id1'}])
  });

  afterEach(() => {
    helper.getAssigner.restore();
    ldPromises.expand.restore();
  });

  it('should return a flattened array of expanded offers if single asset response', done => {
    const selector = new OfferSelector();
    const response = {
      "status": 200,
      "data": [{
        "entity_id": "entity1",
        "repository": {
          "repository_id": "repo1"
        },
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      }]
    };

    selector.parseOffers(response)
      .then(result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(2);
      })
      .then(done, done)
  });

  it('should return a flattened array of expanded offers if multi asset response', done => {
    const selector = new OfferSelector();
    const response = {
      "status": 200,
      "data": [{
        "entity_id": "entity1",
        "repository": {
          "repository_id": "repo1"
        },
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      },
        {
          "entity_id": "entity2",
          "repository": {
            "repository_id": "repo1"
          },
          "offers": [{
            "@context": {},
            "@graph": []
          }, {
            "@context": {},
            "@graph": []
          }],
          "source_id_type": "examplecopictureid"
        }]
    };

    selector.parseOffers(response)
      .then(result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(4)
      })
      .then(done, done)
  });


  it('should return an empty array if no offers', done => {
    const selector = new OfferSelector();
    selector.parseOffers({status: 200, data: []})
      .then(result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(0);
      })
      .then(done, done)
  });

  it('should return an empty array if no data key', done => {
    const selector = new OfferSelector();
    selector.parseOffers({status: 200})
      .then(result => {
        expect(result).to.be.an('array');
        expect(result.length).to.equal(0);
      })
      .then(done, done)
  });

  it('should return an offer object with expanded offer and other entity information', done => {
    const selector = new OfferSelector();
    const response = {
      "status": 200,
      "data": [{
        "entity_id": "entity1",
        "repository": {
          "repository_id": "repo1"
        },
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      }, {
        "entity_id": "entity2",
        "repository": {
          "repository_id": "repo2"
        },
        "offers": [{
          "@context": {},
          "@graph": []
        }, {
          "@context": {},
          "@graph": []
        }],
        "source_id_type": "examplecopictureid"
      }]
    };

    selector.parseOffers(response)
      .then(result => {
        expect(result).to.eql([{
          offer: [{'id': 'id1'}],
          entity_id: 'entity1',
          repository_id: 'repo1',
          organisation: 'org1'
        }, {
          offer: [{'id': 'id1'}],
          entity_id: 'entity1',
          repository_id: 'repo1',
          organisation: 'org1'
        }, {
          offer: [{'id': 'id1'}],
          entity_id: 'entity2',
          repository_id: 'repo2',
          organisation: 'org1'
        }, {
          offer: [{'id': 'id1'}],
          entity_id: 'entity2',
          repository_id: 'repo2',
          organisation: 'org1'
        }])
      })
      .then(done, done)
  });
});



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
