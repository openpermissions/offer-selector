import * as accounting from 'accounting';
import {currencySymbols} from './constants';

export default {
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

  cssStyleRules: function (fg, bg){
    var rules = [];
    if(bg) { rules.push('background-color:' + bg); }
    if(fg) { rules.push('color:' + fg); }
    return rules.join(';');
  },

  formatDetailsUrl: function (repoId, offerId) {
    return `http://offer.digicat.io?repository=${repoId}&offer=${offerId}`;
  }
};
