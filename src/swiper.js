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

    var usages = document.getElementsByClassName('usage');
    for (var i = 0; i < usages.length; i++) {
      ellipsizeTextBox(usages[i])
    }
    if (height <= 420) {
      $('.card_table').css('height', "250px");
      $('.all').css('height', "300px");
      $('.usage').hide();
    } else {
      $('.card_table').css('height', "400px");
      $('.all').css('height', "470px");
      $('.usage').show();
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
