import Swiper from 'swiper'

module.exports = {
  renderSwiper: function() {
    function ellipsizeTextBox(el) {
      var wordArray = el.innerHTML.split(' ');
      while (el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }
    }

    var container = document.getElementById('container');
    var slides = document.getElementsByClassName('swiper-slide');
    var usages = document.getElementsByClassName('usage');

    var height = window.innerHeight;
    
    var containerHeight, slideHeight, usageVisibility;
    if (height <= 420) {
      containerHeight = "300px";
      slideHeight = "250px";
      usageVisibility = "hidden";
    } else {
      containerHeight = "470px";
      slideHeight = "400px";
      usageVisibility = "visible";
    }

    if (container) {container.style.height = containerHeight}

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.height = slideHeight;
    }

    for (var i = 0; i < usages.length; i++) {
      usages[i].style.visibility = usageVisibility;
      if (usageVisibility == "visible") {ellipsizeTextBox(usages[i])};
    }

    var options = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 'auto'
    };

    var swiper = new Swiper('.swiper', options);
  }
};
