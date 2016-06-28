import Swiper from 'swiper'
import * as accounting from 'accounting'
import {currencySymbols} from './constants'

module.exports = {
  render_swiper: function() {

      var width = window.innerWidth;
      var height = window.innerHeight;

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

 formatMoney: function (value, currencyCode) {
   return accounting.formatMoney(value, currencySymbols[currencyCode] || currencyCode);
 },

  cssStyleRules(fg, bg){
    var rules = [];
    if(bg) { rules.push("background-color:" + bg); }
    if(fg) { rules.push("color:" + fg); }
    return rules.join(';');
  },

  formatDetailsUrl(repoId, offerId) {
    return "http://offer.digicat.io?repository="+repoId+"&offer="+offerId;
  }
};
