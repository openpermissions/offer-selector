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
const riot = require('riot');
require('./templates/offers.tag');
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


parseOffer(offerObj){
  if(offerObj)
  {
    console.log(offerObj);
    var items = [];
    var z = 0;
    const title = 'http://purl.org/dc/terms/title';
    const policy = 'http://openpermissions.org/ns/op/1.1/policyDescription';

      offerObj.forEach(i => {
        //console.log(i);
        i.offer.forEach(j => {
          const type = j['@type'];

          //if(!=-1)

          type.forEach(elem => {
            if(elem.indexOf('Offer')!=-1)
            {
              var current_title = j[title][0]['@value'];
              var current_policy = j[policy][0]['@value'];
              //current_policy = current_policy.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,'\n');
              //console.log(current_policy);
              items[z] = { "id": z, "type" : current_title, "description": current_policy , color: "color1", "logo" : i.organisation.logo,
                          "title_color": "#379392", "logo_color" : "#353866", "btn_text_color": "white", "primary_color": "#CE6D39"};
              z = z + 1;
              console.log(items[z-1]);
              /*
              items[z] = { "id": z, "type" : current_title, "description": current_policy , color: "color1", "logo" : i.organisation.logo,
                          "title_color": "#9B8281", "logo_color" : "#1f4e5f", "btn_text_color": "white", "primary_color": "#79a8a9", "secondary_color":"#aacfd0"};
              z = z + 1;
              */
            }
          })
        })
      })
      return items;
  }
  else
  {
    var emptyarr = [];
    return emptyarr;
  }
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
    //offers.forEach(offer => { console.log(offer)})

      riot.mount('offers', {
        title: 'OPP Licence Offers',
        items: this.parseOffer(offers)
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
