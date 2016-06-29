import Swiper from 'swiper'
import * as accounting from 'accounting'
import {currencySymbols} from './constants'

module.exports = {
  render_swiper: function() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    function ellipsizeTextBox(el) {
      var wordArray = el.innerHTML.split(' ');
      while(el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }
    }
    var usages = document.getElementsByClassName('usage');
    for(var i=0; i< usages.length; i++){
      ellipsizeTextBox(usages[i])
    }
    if(height <= 420)
    {
      $('.card_table').css('height',"250px");
      $('.all').css('height',"300px");
      $('.usage').hide();
    }
    else
    {
      $('.card_table').css('height',"400px");
      $('.all').css('height',"470px");
      $('.usage').show();
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
