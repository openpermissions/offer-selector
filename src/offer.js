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
import * as accounting from 'accounting'
import jsonld from 'jsonld'
import 'isomorphic-fetch'

getOrganisation.cache = {};
/**
 * Get an organisation using it's ID
 */
function getOrganisation(result, grouped, orgUrl) {
  if (!result.assignerId) { return Promise.resolve(result); }

  let assigner = grouped[result.assignerId];
  delete result.assignerId;

  if (!assigner) { return Promise.resolve(result); }
  let orgId = assigner['http://openpermissions.org/ns/op/1.1/provider'][0]['@value'];
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

/**
 * Extract relevant information and fetch the organisation
 */
function transformOffer(result, obj) {
  let title = obj['http://purl.org/dc/terms/title'][0]['@value'];
  let description = obj['http://openpermissions.org/ns/op/1.1/policyDescription'][0]['@value'];
  let offerId = obj['@id'].split('/').slice(-1)[0];
  let assignerId = obj['http://www.w3.org/ns/odrl/2/assigner'][0]['@id'];

  return Promise.resolve(Object.assign(result, {
    id: offerId,
    offer_id: offerId,  // TODO: I don't think we need this
    type : title,
    description: description,
    assignerId: assignerId
  }));
}

/**
 * Parse an expanded JSON-LD response
 */
export function parseOffer(data, options={}) {
  let defaults = Object.assign({}, options.defaults || {});
  let grouped = {};
  let transformations = {
    'http://www.w3.org/ns/odrl/2/Offer': transformOffer,
  };

  // loop over each item in the offer and apply relevant async transformations
  let chain = data.reduce((promise, obj) => {
    grouped[obj['@id']] = obj;

    return Object.keys(transformations).reduce((prevPromise, key) => {
      if (!obj['@type']) { return prevPromise; }
      if (!obj['@type'].includes(key)) { return prevPromise; }

      return prevPromise.then(result => transformations[key](result, obj))
    }, promise);
  }, Promise.resolve(defaults));

  return chain.then(result => getOrganisation(result, grouped, options.organisations));
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
