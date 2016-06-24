import Swiper from 'swiper'
import * as accounting from 'accounting'
import {currencySymbols} from './constants'

module.exports = {

  getAssigner: function (offer) {
    let o = offer.find(element => element['@type'].indexOf("http://www.w3.org/ns/odrl/2/Offer") !== -1);
    if (o === undefined) {
      return undefined;
    }
    let assignerId = o['http://www.w3.org/ns/odrl/2/assigner'];
    if (assignerId === undefined) {
      return undefined;
    }

    assignerId = assignerId[0]['@id'];

    let assigner = offer.find(element => element['@id'] == assignerId);
    if (assigner === undefined) {
      return undefined;
    }
    assigner = assigner['http://openpermissions.org/ns/op/1.1/provider'][0]['@value'];
    return assigner;
  },

  parseResponse: function (response) {
    if (response.status == 200) {
      return response.json();
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  },
  gradient_Color: function (col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

  },
  change_color: function (id, title_color, logo_color, btn_text_color, primary_color, secondary_color) {

    var id_tag = "#" + id;
    console.log(id_tag);
    //Change title color
    $(id_tag + '.type').css('color',title_color);

    //Change Logo color
    $(id_tag + '.logo').css('background',logo_color);

    //Change button text change_color
    $(id_tag + '.button').css('color',btn_text_color);

    // Create css for gradient button
    var primary_color_1 = { "background" : primary_color,
                            "background" : "-webkit-gradient(linear,left top,left bottom,from("+ primary_color +"),to(" + secondary_color +"))",
                            "background" : "-webkit-linear-gradient("+ primary_color +","+ secondary_color +")",
                            "background" : "-moz-linear-gradient("+ primary_color +","+ secondary_color +")",
                            "background" : " -o-linear-gradient("+ primary_color +","+ secondary_color +")",
                            "background" : "linear-gradient("+ primary_color +","+ secondary_color +")"};
    $(id_tag + '.color').css(primary_color_1);
  },
  render_swiper: function() {

      var width = window.innerWidth;
      var height = window.innerHeight;
      var fallback = "#9DC8C8";

      $('.message').hide();

      if(height <= 420)
      {
        $('.card_table').css('height',"250px");
        $('.all').css('height',"300px");
        $('.container').hide();
        $('.button_span').hide();
        $('.message').show();
      }
      else
      {
        $('.card_table').css('height',"400px");
        $('.all').css('height',"470px");
        $('.container').show();
        $('.button_span').show();
        $('.message').hide();
      }

      if(width<415)
      {
      var swiper = new Swiper('.swiper', {
        pagination: '.swiper-pagination',
        slidesPerView:1,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        centeredSlides: true,
      });
      }

      if(width>=415&&width<1025)
      {
      //Color fallback from mobile
      $('.all').css({transition: 'background 1s ease-in-out',
                        "background": fallback });
      var swiper2 = new Swiper('.swiper2', {
        pagination: '.swiper-pagination',
        slidesPerView:2,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 5,

      });
      }

      if(width>=1025&&width<=1700)
      {
      //Color fallback from mobile
      $('.all').css({transition: 'background 1s ease-in-out',
                        "background": fallback });
      var swiper3 = new Swiper('.swiper3', {
        pagination: '.swiper-pagination',
        slidesPerView:4,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 5,

      });
      }

      if(width>=1700)
      {
      // Color fallback from mobile
      $('.all').css({transition: 'background 1s ease-in-out',
                        "background": fallback });
      var swiper3 = new Swiper('.swiper4', {
        pagination: '.swiper-pagination',
        slidesPerView:5,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 20,

      });
      }
  },
 scroller: function () {
   //Hide all up buttons initially
   $(".up").addClass('hiding');
   //array for card heights
   var container_height = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);

   $(".up").click(function () {
     //Get id of current card
     var button_id = $(this).attr("id");
     var array_id = button_id;
     button_id = "#" + button_id;

     //Animation for up
     $(button_id + '.container').animate({scrollTop: '-=140'}, "fast");

     //When pressing up container scrolls up
     container_height[array_id] -=140;

     //Check height of container
     var check_height=$(button_id + '.container').height();
     check_height += container_height[array_id];

     //if the height is the same value as container, we hide the up button as we ar at the top
     if(check_height<=145){
        $(button_id + ".up").addClass('hiding');
        $(button_id + ".down").show();
      }

     //show down button if there is any content left
     if ($(button_id + '.content').height() >  check_height) {

          $(button_id + ".down").show();

        }
   });

   $(".down").click(function () {
     // Get id of current card
     var button_id = $(this).attr("id");
     var array_id = button_id;
     button_id = "#" + button_id;

     //When pressing down container scrolls lower
     container_height[array_id] +=140;

     //Animation for down
     $(button_id + '.container').animate({scrollTop: '+=140'}, "fast");

     //Up button is now made visible
     $(button_id + ".up").removeClass("hiding");

     //Check if there is still content left, if not, hide down button as we've reached end of overflowing text

     var check_height =  $(button_id + '.container').height();
     check_height += container_height[array_id];
     if ($(button_id + '.content').height() <  check_height + 5) {
          $(button_id + ".down").hide();
        }
   });
 },
 background_changer: function(colors){

   var fallback = "#9DC8C8";
   if(colors == null)
   {
     colors = [fallback];
   }
   $(".swiper-button-next").click(function () {
     var active = $('.swiper-slide-active .logo').attr('id');

     if(active == null) active = 0;

     if($(this).parents('.swiper').length > 0)
     {
       $('.all').css({transition: 'background 1s ease-in-out',
                     "background": colors[active] });
     }
     else
     {
       $('.all').css({transition: 'background 1s ease-in-out',
                    "background": fallback });
     }
      });

     $(".swiper-button-prev").click(function () {
       var active = $('.swiper-slide-active .logo').attr('id');

       if(active == null) active = 0;

       if($(this).parents('.swiper').length > 0)
       {
         $('.all').css({transition: 'background 1s ease-in-out',
                       "background": colors[active] });
       }
       else
       {
         $('.all').css({transition: 'background 1s ease-in-out',
                      "background": fallback });
       }
       });
 },

 formatMoney: function (value, currencyCode) {
   return accounting.formatMoney(value, currencySymbols[currencyCode] || currencyCode);
  }
};
