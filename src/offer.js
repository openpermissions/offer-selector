/**
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
import pickBy from 'lodash.pickby'
import jsonld from 'jsonld'
import 'isomorphic-fetch'

import {names} from './constants'

getOrganisation.cache = {};
/**
 * Get an organisation using it's ID
 */
function getOrganisation(result, grouped, orgUrl) {
  if (!result.assignerId) { return Promise.resolve(result); }

  let assigner = grouped[result.assignerId];
  delete result.assignerId;

  if (!assigner) { return Promise.resolve(result); }
  let orgId = assigner[names.provider][0]['@value'];
  let request = getOrganisation.cache[orgId];

  if (!request) {
    request = fetch(`${orgUrl}/${orgId}`)
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      });

    getOrganisation.cache[orgId] = request;
  }

  return request.then(response => {
    result.organisation = response.data;
    return result;
  });
}

function getValue(array, key='@value') {
  if (!array) { return; }

  return array[0][key];
}

/**
 * Extract relevant information and fetch the organisation
 */
function transformOffer(result, obj) {
  let title = getValue(obj[names.title]);
  let description = getValue(obj[names.description]);
  let offerId = obj['@id'].split('/').slice(-1)[0];
  let assignerId = getValue(obj[names.assigner], '@id');
  let duties = obj[names.duty].map(duty => duty['@id']);

  let items = {
    id: offerId,
    offer_id: offerId,  // TODO: I don't think we need this
    type : title,
    description: description,
    assignerId: assignerId,
    duties: duties
  }

  items = pickBy(items, value => value !== undefined);

  return Promise.resolve(Object.assign(result, items));
}

function getCompensateDuty(duties, grouped) {
  if (!duties) { return undefined; }

  return duties.find(dutyId => {
    let action = getValue(grouped[dutyId][names.action], '@id');
    return action === names.compensate;
  });
}

function addPrice(result, grouped) {
  let dutyId = getCompensateDuty(result.duties, grouped)
  delete result.duties;

  if (!dutyId) { return Promise.resolve(result); }

  let constraintId = getValue(grouped[dutyId][names.constraint], '@id');
  let constraint = grouped[constraintId];
  if (!constraint) { return Promise.resolve(result); }


  if (!constraint[names.payAmount]) { return Promise.resolve(result); }
  if (!result.price) { result.price = {}; }

  result.price.value = getValue(constraint[names.payAmount]);

  let unit = getValue(constraint[names.unit], '@id');
  if (unit) {
    result.price.unit = unit.split('/').slice(-1)[0];
  }

  return Promise.resolve(result);
}

/**
 * Parse an expanded JSON-LD response
 */
export function parseOffer(data, options={}) {
  let defaults = Object.assign({}, options.defaults || {});
  let grouped = {};
  // loop over each item in the offer and apply relevant async transformations
  let chain = data.reduce((promise, obj) => {
    grouped[obj['@id']] = obj;
    if (!obj['@type']) { return promise; }
    if (!obj['@type'].includes(names.offer)) { return promise; }

    return promise.then(result => transformOffer(result, obj));
  }, Promise.resolve(defaults));

  return chain
    .then(result => getOrganisation(result, grouped, options.organisations))
    .then(result => addPrice(result, grouped)) ;
}

/**
 * Parse a set of offers
 */
export function parseOffers(data, options={}) {
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

  let promises = offers.map(offer => {
    let promise = jsonld.promises.expand(offer.offer)
      .then(expanded => parseOffer(expanded, options))
      .then(parsed => {
        parsed.repository_id = offer.repositoryId;
        return parsed;
      });

    return promise;
  });

  return Promise.all(promises);
}