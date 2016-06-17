module.exports = {
  
  getAssigner: function (offer) {
    let o = offer.find(element => element['@type'].indexOf("http://www.w3.org/ns/odrl/2/Offer") !== -1);
    if (o === undefined) {
      return undefined;
    }
    let assignerId = o['http://www.w3.org/ns/odrl/2/assigner'];
    if (assignerId === undefined) {
      return undefined;
    }

    assignerId = assignerId[0]['@id'];

    let assigner = offer.find(element => element['@id'] == assignerId);
    if (assigner === undefined) {
      return undefined;
    }
    assigner = assigner['http://openpermissions.org/ns/op/1.1/provider'][0]['@value'];
    return assigner;
  },
  
  parseResponse: function (response) {
    if (response.status == 200) {
      return response.json();
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }
};
