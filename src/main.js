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
require('./offer-parser.js');


function requestJSON()
{
  var request = new XMLHttpRequest();
  request.open("GET", "../src/file.json", false);
  request.send(null)
  var my_JSON_object = JSON.parse(request.responseText);
  return my_JSON_object;
}

var items = [];
function parseOffer(offerObj){

  var z = 0;
  const title = 'http://purl.org/dc/terms/title';
  const policy = 'http://openpermissions.org/ns/op/1.1/policyDescription';
  return new Promise(function (resolve,reject) {
    offerObj.forEach(i => {

      i.forEach(j => {
        const type = j['@type'];
        //if(!=-1)
        var example = null;
        type.forEach(elem => {
          if(elem.indexOf('Offer')!=-1)
          {
            var current_title = j[title][0]['@value'];
            var current_policy = j[policy][0]['@value'];
            //current_policy = current_policy.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,'\n');
            console.log(current_policy);
            items[z] = { "type" : current_title, "description": current_policy , color: "color1"};
            z = z +1;
          }
        })
      })
    })
      if(reject) {console.log('yolo');}
      if(resolve) {console.log('also yolo');}

   })
 }

var offerObject = requestJSON();

parseOffer(offerObject);

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
/*
document.getElementById('up').onclick = function () {
   scrollTo(document.body, 0, 1250);
}*/
$(document).ready(function() {

$("#up").hide();
    if ($('.content').height() > $('.container').height()) {

        $("#up").click(function () {
             $('.container').animate({scrollTop: '-=150'}, "fast");
             if ($('.content').height() <  $('.container').height()+150) {
               $("#down").show();
             }
             //scrollTo(document.getElementById('id'), 0, 1250);

        });

        $("#down").click(function () {
             $('.container').animate({scrollTop: '+=150'}, "fast");
             $("#up").show();
             if ($('.content').height() <  $('.container').height()+150) {
               $("#down").hide();

             }
        });
    }
});

function mount(){
  riot.mount('offers', {
    title: 'OPP License Offers',
    items: items
  })
}


module.exports = mount;
