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

import riot from 'riot'
import _defaults from 'lodash.defaults'
import fetch from 'isomorphic-fetch'

import {parseOffers} from './offer'
import './templates/offers.tag'

class OfferSelector {
  constructor(options) {
    this.version = '__VERSION__';
    this.options = _defaults(options || {}, {
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector',
      defaults: {
        color: 'color1',
        title_color: '#379392',
        logo_color : '#353866',
        btn_text_color: 'white',
        primary_color: '#CE6D39'
      }
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
      items: offers
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
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      .then(response => parseOffers(response.data, this.options))
      .then(val => this.displayOffers(val));
  }
}

module.exports = OfferSelector;
