import Swiper from 'swiper'

module.exports = {
  renderSwiper: function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    function ellipsizeTextBox(el) {
      var wordArray = el.innerHTML.split(' ');
      while (el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }
    }

    var all = document.getElementsByClassName('all');
    var cardTable = document.getElementsByClassName('card_table');
    var usages = document.getElementsByClassName('usage');

    var allHeight, cardHeight, usageVisibility;
    if (height <= 420) {
      allHeight = "300px";
      cardHeight = "250px";
      usageVisibility = "hidden";
    } else {
      allHeight = "470px";
      cardHeight = "400px";
      usageVisibility = "visible";
    }

    for (var i = 0; i < all.length; i++) {
      all[i].style.height = allHeight;
    }

    for (var i = 0; i < cardTable.length; i++) {
      cardTable[i].style.height = cardHeight;
    }

    for (var i = 0; i < usages.length; i++) {
      usages[i].style.visibility = usageVisibility;
      if (usageVisibility == "visible") {ellipsizeTextBox(usages[i])};
    }

    var options = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'
    };

    if (width < 674) {
      options.slidesPerView = 1;
      options.spaceBetween = 30;
      options.centeredSlides = true;
    } else if (width < 1025) {
      options.slidesPerView = 2;
      options.spaceBetween = 5;
    } else if (width <= 1700) {
      options.slidesPerView = 4;
      options.spaceBetween = 5;
    } else if (width >= 1700) {
      options.slidesPerView = 5;
      options.spaceBetween = 20;
    }
    var swiper = new Swiper('.swiper', options);
  }
};
