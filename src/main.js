/**
 * Offer viewer
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
const riot = require('riot');
require('./templates/offers.tag');
console.log("here");
function mount(){
  riot.mount('offers', {
    title: 'OPP License Offers',
    items: [
      { type: "Commercial Website", color: "color1"},
      { type: "Non-commercial Website", color: "color2"},
      { type: "Advertisement", color: "color1"},
      { type: "Non-commercial Website", color: "color2"},
      { type: "Non-commercial Website", color: "color2"},
      { type: "Advertisement", color: "color1"},
      { type: "Advertisement", color: "color1"},
    ]
  })
}
module.exports = mount;
