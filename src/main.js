/**
 * Offer Selector
 *
 * Copyright 2016 Open Permissions Platform Coalition
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const defaults = require('lodash.defaults');
const jsonld = require('jsonld');
const ldPromises = jsonld.promises;
require('whatwg-fetch');


class OfferSelector {
  constructor(options) {
    this.version = '__VERSION__';
    this.options = defaults(options || {}, {
      query: 'https://query.copyrighthub.org/v1/query/search/offers',
      tag: 'offer-selector'
    });
  }

  parseOffers(response) {
    let data = response.data || [];
    let offers = data.map(d => d['offers']);
    offers = [].concat.apply([], offers);
    const offerPromises = offers.map(offer => ldPromises.expand(offer));
    return Promise.all(offerPromises);
  }

  displayOffers(offers) {
    offers.forEach(offer => { console.log(offer)})
  }

  loadOffers(sourceIds) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const init = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(sourceIds)
    };

    fetch(this.options.query, init)
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error
        }
      })
      .then(this.parseOffers)
      .then(this.displayOffers)
      .catch(err => {
        var error = new Error(err);
        throw error
      })
  }
}

module.exports = OfferSelector;