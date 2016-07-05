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
import {getOrganisation} from './organisation';

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
      .then(response => {
        const orgUrl =  `${options.accounts}/organisations`;
        const promises = response.data.map(link => {
          return getOrganisation(link.organisation_id,orgUrl)
            .then(response => defaultsDeep(response.data, link, options.defaults || {}));
        });

        return Promise.all(promises);
      });
  },

  /**
   * Parse a set of source_ids to get reference links
   */
  parseLinks: function (ids, options={}) {
    return Promise.all(ids.map(id => this.parseLink(id, options)))
      .then(values => [].concat.apply([], values));
  }
};
