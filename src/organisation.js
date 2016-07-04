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

/**
 * Responsible for fetching and parsing organisations
 */

'use strict';
import 'isomorphic-fetch';
import _get from 'lodash.get';
import _has from 'lodash.has';

import {parseResponse} from './helper';

getOrganisation.cache = {};
getOrganisation.clearCache = () => getOrganisation.cache = {};

/**
 * Get an organisation using it's ID
 */
export function getOrganisation(orgId, orgUrl) {
  let request = getOrganisation.cache[orgId];

  if (!request) {
    request = fetch(`${orgUrl}/${orgId}`).then(parseResponse);

    getOrganisation.cache[orgId] = request;
  }

  return request;
}

/**
 * Pick the organisation's styles
 */
export function styles(organisation) {
  return {
    logo: organisation.logo,
    primary_color: organisation.primary_color,
    secondary_color: organisation.secondary_color
  };
}

/**
 * Get the payment URL and replace placeholders with the source & offer IDs
 */
export function paymentUrl(organisation, offerId, sourceId, sourceIdType) {
  const matchSourceId = _get(organisation, 'payment.source_id_type') == sourceIdType;
  const hasPaymentSourceId = _has(organisation, 'payment.source_id_type');
  const hasPaymentUrl = _has(organisation, 'payment.url');
  const includePayment = hasPaymentUrl && (matchSourceId || !hasPaymentSourceId);

  if (!includePayment) { return; }

  let paymentUrl = organisation.payment.url.replace(/{offer_id}/g, offerId);
  if (matchSourceId) {
    paymentUrl = paymentUrl.replace(/{source_id}/g, sourceId);
  }

  return paymentUrl;
}
