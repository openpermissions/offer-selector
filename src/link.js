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
import defaultsDeep from 'lodash.defaultsdeep';
import 'isomorphic-fetch';
import {parseResponse} from './helper';

getOrganisation.cache = {};
/**
 * Get an organisation using it's ID
 */
function getOrganisation(result, orgUrl, defaults) {
  if (!result.organisation_id) { return Promise.resolve(result); }

  const orgId = result.organisation_id;

  let request = getOrganisation.cache[orgId];
  if (!request) {
    request = fetch(`${orgUrl}/${orgId}`)
      .then(parseResponse);

    getOrganisation.cache[orgId] = request;
  }

  return request.then(response => defaultsDeep({}, response.data, result, defaults));
}

export default {
  /**
   * Parse a source id/source id type to get licensor information
   */
  parseLink: function (id, options={}) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const init = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(id)
    };

    const linksUrl = `${options.accounts}/links`;
    return fetch(linksUrl, init)
      .then(parseResponse)
      .then(response => Promise.all(response.data.map(link =>
        getOrganisation(link, `${options.accounts}/organisations`, options.defaults))))
  },

  /**
   * Parse a set of source_ids to get reference links
   */
  parseLinks: function (ids, options={}) {
    return Promise.all(ids.map(id => this.parseLink(id, options)))
      .then(values => {
        let links = [].concat.apply([], values);
        return Promise.resolve(links)
      });
  }
};
