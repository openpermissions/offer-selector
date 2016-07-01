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
import _get from 'lodash.get';
import pickBy from 'lodash.pickby';
import jsonld from 'jsonld';
import 'isomorphic-fetch';

import {names} from './constants';

/**
 * Extract relevant information and fetch the organisation
 */
function transformLicensor(data, options) {
  let licensor = defaultsDeep({}, data.licensor, options);
  //Get navigation link
  let link = _get(licensor, ['reference_links', 'links', data.source_id_type]);
  if (link) {
    link = link.replace(/{source_id}/g, data.source_id);
    link = link.replace(/{source_id_type}/g, data.source_id_type);
    licensor.link = link;
  } else if (licensor.website) {
    licensor.link = licensor.website;
  }
  return licensor;
}

export default {
  /**
   * Parse a source id/source id type to get licensor information
   */
  parseLicensor: function (data, options={}) {
    const url = `${options.query}/licensors?source_id=${data.source_id}&source_id_type=${data.source_id_type}`;
    return fetch(url)
      .then(response => {
        if (!response.ok && response.status != 404) {
          return response.json()
            .then(result => Promise.reject(result));
        }
        return response.json();
      })
      .then(response => {
        if (response.status == 404) {
          return Promise.resolve([]);
        }
        return Promise.resolve(response.data.map(licensor => {
            return {
              source_id: data.source_id,
              source_id_type: data.source_id_type,
              licensor: licensor
            }
          })
        )
      });
  },

  /**
   * Parse a set of source_ids to get licensors
   */
  parseLicensors: function (ids, options={}) {
    /* Note: This is limited to only retrieve licensors that are directly associated with the given source ids.
      Ideally we should also be able to look up dependent source_ids/licensors, but this would require directly
      querying the index service, or updating the query service to be more flexible.
    */
    const defaults = defaultsDeep({}, options.defaults || {});

    return Promise.all(ids.map(id => this.parseLicensor(id, options)))
      .then(values => {
        let licensors = [].concat.apply([], values);
        licensors = licensors.map(licensor => transformLicensor(licensor, defaults));
        return Promise.resolve(licensors)
      });
  }
};
