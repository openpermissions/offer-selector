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
import _defaultsDeep from 'lodash.defaultsdeep';
import _pickBy from 'lodash.pickby';
import jsonld from 'jsonld';

import {names} from './constants';
import * as org from './organisation';

/**
 * Get an organisation using it's ID
 */
function addOrganisation(obj, grouped, sourceId, sourceIdType, orgUrl) {
  if (!obj.assignerId) { return Promise.resolve(obj); }

  const assigner = grouped[obj.assignerId];
  if (!assigner) { return Promise.resolve(obj); }

  const orgId = assigner[names.provider][0]['@value'];

  return org.getOrganisation(orgId, orgUrl)
    .then(response => {
      let result = {};
      const styles = org.styles(response.data);

      const paymentUrl = org.paymentUrl(response.data, obj.id, sourceId, sourceIdType);
      if (paymentUrl) {
        result.paymentUrl = paymentUrl;
      }

      const link = org.referenceLink(response.data, sourceId, sourceIdType);
      if (link) {
        result.link = link;
      }

      result = _defaultsDeep(result, styles, obj);
      delete result.assignerId;

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
  const title = getValue(obj[names.title]);
  const description = getValue(obj[names.description]);
  const offerId = obj['@id'].split('/').slice(-1)[0];
  const assignerId = getValue(obj[names.assigner], '@id');
  const duties = (obj[names.duty] || []).map(duty => duty['@id']);

  let items = {
    id: offerId,
    name : title,
    description: description,
    assignerId: assignerId,
    duties: duties
  };

  items = _pickBy(items, value => value !== undefined);

  return Promise.resolve({...result, ...items});
}

function getCompensateDuty(duties, grouped) {
  if (!duties) { return undefined; }

  return duties.find(dutyId => {
    const action = getValue(grouped[dutyId][names.action], '@id');
    return action === names.compensate;
  });
}

function addPrice(result, grouped) {
  const dutyId = getCompensateDuty(result.duties, grouped);
  delete result.duties;

  if (!dutyId) { return Promise.resolve(result); }

  const constraintId = getValue(grouped[dutyId][names.constraint], '@id');
  const constraint = grouped[constraintId];
  if (!constraint) { return Promise.resolve(result); }
  if (!constraint[names.payAmount]) { return Promise.resolve(result); }

  result.price = {
    ...result.price || {},
    value: getValue(constraint[names.payAmount])
  };

  const unit = getValue(constraint[names.unit], '@id');
  if (unit) {
    result.price.unit = unit.split('/').slice(-1)[0];
  }

  return Promise.resolve(result);
}

export default {
  /**
   * Parse an expanded JSON-LD response
   */
  parseOffer: function (data, sourceId, sourceIdType, options={}) {
    const defaults = _defaultsDeep({}, options.defaults || {});
    const grouped = {};
    // loop over each item in the offer and apply relevant async transformations
    const chain = data.reduce((promise, obj) => {
      grouped[obj['@id']] = obj;
      if (!obj['@type']) { return promise; }
      if (!obj['@type'].includes(names.offer)) { return promise; }

      return promise.then(result => transformOffer(result, obj));
    }, Promise.resolve(defaults));

    return chain
      .then(result => addOrganisation(result, grouped, sourceId, sourceIdType, `${options.accounts}/organisations`))
      .then(result => addPrice(result, grouped)) ;
  },

  /**
   * Parse a set of offers
   */
  parseOffers: function (data, options={}) {
    let offers = data.map(asset => {
      if (!asset.offers) { return []; }

      return asset.offers.map( offer => {
        return {
          offer: offer,
          repositoryId: asset.repository.repository_id,
          entityId: asset.entity_id,
          sourceId: asset.source_id,
          sourceIdType: asset.source_id_type
        };
      });
    });
    offers = [].concat.apply([], offers);

    const promises = offers.map(offer => {
      const promise = jsonld.promises.expand(offer.offer)
        .then(expanded => this.parseOffer(expanded, offer.sourceId, offer.sourceIdType, options))
        .then(parsed => {
          parsed.repositoryId = offer.repositoryId;
          return parsed;
        });

      return promise;
    });

    return Promise.all(promises);
  }
};
