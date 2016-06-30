import * as accounting from 'accounting'
import {currencySymbols} from './constants'

module.exports = {
  parseResponse: function(response) {
    if (!response.ok) {
      return response.json()
        .then(result => Promise.reject(result));
    }
    return response.json();
  },

 formatMoney: function (value, currencyCode) {
   return accounting.formatMoney(value, currencySymbols[currencyCode] || currencyCode);
 },

  cssStyleRules(fg, bg){
    var rules = [];
    if(bg) { rules.push("background-color:" + bg); }
    if(fg) { rules.push("color:" + fg); }
    return rules.join(';');
  },

  formatDetailsUrl(repoId, offerId) {
    return "http://offer.digicat.io?repository="+repoId+"&offer="+offerId;
  }
};
