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
require('whatwg-fetch');
require('./templates/offers.tag');

const riot = require('riot');
const _defaults = require('lodash.defaults');
const _uniq = require('lodash.uniq');
const jsonld = require('jsonld');
const ldPromises = jsonld.promises;
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


  parseOffer(offerObj, idx) {
    const offer = offerObj.offer.find(o => o["@type"].indexOf("http://www.w3.org/ns/odrl/2/Offer") !== -1);

    var title = offer['http://purl.org/dc/terms/title'][0]['@value'];
    var description = offer['http://openpermissions.org/ns/op/1.1/policyDescription'][0]['@value'];
    var offerId = offer['@id'].split('/');
    offerId = offerId[offerId.length-1];

    //TODO:
    // - Get price from offer
    // - Get purchase link from organisation
    // - Get colours from organisation

    return {
      "id": idx,
      "offer_id": offerId,
      "repository_id": offerObj.repositoryId,
      "type" : title,
      "description": description ,
      "color": "color1",
      "logo" : offerObj.organisation.logo,
      "title_color": "#379392",
      "logo_color" : "#353866",
      "btn_text_color": "white",
      "primary_color": "#CE6D39"
    };
  };

  parseOffers(response) {
    let data = response.data || [];
    let offers = data.map( asset => {
      return asset.offers.map( offer => {
        return {
          offer: offer,
          repositoryId: asset.repository.repository_id,
          entityId: asset.entity_id
        }
      });
    });
    offers = [].concat.apply([], offers);
    const offerPromises = offers.map(offer => {
      return new Promise((resolve, reject) => {
        ldPromises.expand(offer.offer).then(expanded => {
          offer.offer = expanded;
          offer.organisation = helper.getAssigner(offer.offer);
          resolve(offer);
        })
      });
    });
    return Promise.all(offerPromises);
  };

  retrieveOrganisations(offers) {
    return new Promise((resolve, reject) => {
      let organisationIds = offers.map(offer => offer.organisation);
      organisationIds = _uniq(organisationIds.filter(value => value !== undefined));

      let orgPromises = organisationIds.map(org => {
        return new Promise((resolve, reject) => {
          fetch(`${this.options.organisations}/${org}`)
            .then(response => helper.parseResponse(response))
            .then(response => resolve(response.data))
            .catch(err => {
              console.log(err);
              resolve({});
            });
        });
      });

      Promise.all(orgPromises).then(
        organisations => {
          offers.forEach(offer => {
            offer.organisation = organisations.find(org => org.id == offer.organisation) || {};
          });
          resolve(offers);
        },
        reason => {
          console.log(reason);
          offers.forEach(offer => {
            offer.organisation = {};
          });
          resolve(offers);
        });
    });
  }

  displayOffers(offers) {
    const nodes = document.getElementsByTagName(this.options.tag);
    if (nodes.length == 0) {
      throw Error(`Tag ${tag} not found in html`);
    }
    nodes[0].innerHTML = '<offers></offers>';

    riot.mount('offers', {
      title: 'OPP Licence Offers',
      items: offers.map(this.parseOffer)
    })
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
