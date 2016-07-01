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
import offerParser from './offer';
import licensorParser from './licensor';
import linksParser from './link';
import './templates/cards.tag';
import './templates/error.tag';

class OfferSelector {
  constructor(options) {
    this.version = '__VERSION__';
    this.options = _defaultsDeep(options || {}, {
      query: 'https://query.copyrighthub.org/v1/query',
      accounts: 'https://acc.copyrighthub.org/v1/accounts',
      tag: 'offer-selector',
      defaults: {
        'primary_color': '#353866',
        'secondary_color': '#379392',
        price: {unit: 'GBP'}
      }
    });
  }

  _parentNode()  {
    const nodes = document.getElementsByTagName(this.options.tag);
    if (nodes.length == 0) {
      throw Error(`Tag ${tag} not found in html`);
    }
    return nodes[0]
  }

  displayCards(items, type) {
    this._parentNode().innerHTML = '<cards></cards>';
    riot.mount('cards', {
      items: items,
      type: type
    });
  }

  displayFailure() {
    this._parentNode().innerHTML = '<failure></failure>';
    riot.mount('failure');
  }

  displayError(err) {
    this._parentNode().innerHTML = '<error></error>';
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

    const offersUrl = `${this.options.query}/search/offers`;
    return fetch(offersUrl, init)
      .then(parseResponse)
      .then(response => {
        //If there are offers, parse the offers
        if (response.data.length !== 0) {
          return offerParser.parseOffers(response.data, this.options)
            .then(result => Promise.resolve([result, 'offer']));
        //If there are no offers look for licensors
        } else {
          return licensorParser.parseLicensors(sourceIds, this.options)
            .then(result => Promise.resolve([result, 'licensor']));
        }
      })
      //If there are no offers or licensors, look for links.
      .then(response => {
        if (response[0].length === 0) {
          return linksParser.parseLinks(sourceIds, this.options)
            .then(result => Promise.resolve([result, 'link']));
        } else {
          return response;
        }
      })
      .then(result => {
        if (result[0].length !== 0) {
          this.displayCards(result[0], result[1])
        } else {
          this.displayFailure();
        }
      })
      .catch(err => {
        this.displayError(err);
        throw err;
      });
  }
}

module.exports = OfferSelector;
