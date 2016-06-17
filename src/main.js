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
const _defaults = require('lodash.defaults');
const _uniq = require('lodash.uniq');
const jsonld = require('jsonld');
const ldPromises = jsonld.promises;
require('whatwg-fetch');
const helper = require('./helper');

class OfferSelector {
  constructor(options) {
    this.version = '__VERSION__';
    this.options = _defaults(options || {}, {
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
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

  retrieveOrganisations(offers) {
    return new Promise((resolve, reject) => {
      offers = offers.map(offer => {
        return {"offer": offer, "organisation": helper.getAssigner(offer)}
      });

      let organisationIds = offers.map(offer => offer.organisation);
      organisationIds = _uniq(organisationIds.filter(value => value !== undefined));

      let orgPromises = organisationIds.map(org => {
        return new Promise((resolve, reject) => {
          fetch(`${this.options.organisations}/${org}`)
            .then(response => helper.parseResponse(response))
            .then(response => resolve(response.data));
        });
      });

      Promise.all(orgPromises).then(organisations => {
        offers.forEach(offer => {
          offer.organisation = organisations.find(org => org.id == offer.organisation) || {};
        });
        resolve(offers);
      });
    });
  };

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

    fetch(this.options.offers, init)
      .then(val => helper.parseResponse(val))
      .then(val => this.parseOffers(val))
      .then(val => this.retrieveOrganisations(val))
      .then(val => this.displayOffers(val))
      .catch(err => {
        var error = new Error(err);
        throw error
      })
  }
}

module.exports = OfferSelector;