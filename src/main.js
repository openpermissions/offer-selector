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

import riot from 'riot';
import _defaultsDeep from 'lodash.defaultsdeep';
import 'isomorphic-fetch';

import {parseResponse} from './helper'
import parser from './offer';
import './templates/offers.tag';
import './templates/error.tag';

class OfferSelector {
  constructor(options) {
    this.version = '__VERSION__';
    this.options = _defaultsDeep(options || {}, {
      offers: 'https://query.copyrighthub.org/v1/query/search/offers',
      organisations: 'https://acc.copyrighthub.org/v1/accounts/organisations',
      tag: 'offer-selector',
      defaults: {
        'primary_color': '#353866',
        'secondary_color': '#379392',
        price: {unit: 'GBP'}
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
    });
  }

  displayError(err) {
    const nodes = document.getElementsByTagName(this.options.tag);
    if (nodes.length == 0) {
      throw Error(`Tag ${tag} not found in html`);
    }
    nodes[0].innerHTML = '<error></error>';
    riot.mount('error', {
      error: err
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

    return fetch(this.options.offers, init)
      .then(parseResponse)
      .then(response => parser.parseOffers(response.data, this.options))
      .then(val => this.displayOffers(val))
      .catch(err => {
        this.displayError(err);
        throw err;
      });
  }
}

module.exports = OfferSelector;
