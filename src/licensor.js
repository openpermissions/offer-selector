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
import 'isomorphic-fetch';
import defaultsDeep from 'lodash.defaultsdeep';

import {referenceLink} from './organisation';


export default {
  /**
   * Parse a source id/source id type to get licensor information
   */
  getLicensors: function (sourceId, sourceIdType, options={}) {
    const url = `${options.query}/licensors?source_id=${sourceId}&source_id_type=${sourceIdType}`;

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
          const result = defaultsDeep(licensor, options.defaults || {});

          const link = referenceLink(licensor, sourceId, sourceIdType);
          if (link) {
            result.link = link;
          }

          return result;
        }));
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
    return Promise.all(ids.map(id => this.getLicensors(id.source_id, id.source_id_type, options)))
      .then(values => [].concat.apply([], values));
  }
};
