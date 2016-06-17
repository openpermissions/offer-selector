<offers>
  <div>
      <h1> {opts.title} </h1>
      <div class="all">
        <!-- Container for smartphones -->

        <div class="swiper-container swiper" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">
                <div class="logo">
                  <img src="../src/templates/logos/mirrorpix-logo.png"></img>
                </div>
                <ul>
                  <li class="type">{type}</li>
                  <button id="up"><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <div class="container" id="scroller"><div class="content"><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button id="down"><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <li class="price"> <a href="#" class="button { color }"> Buy for £6.00 </a></li>
                </ul>
                <div class="footer-logo">
                  <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>

        <!-- Container for tablets -->

        <div class="swiper-container swiper2" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">

                <div class="logo">
                  <img src="../src/templates/logos/mirrorpix-logo.png"></img>
                </div>
                <ul>
                  <li class="type">{type}</li>
                  <li class="usage">{description}</li>
                  <li class="price"> <a href="#" class={"button " + color}> Buy for £6.00 </a></li>
                </ul>
                <div class="footer-logo">
                  <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>

        <!-- Container for desktop -->

        <div class="swiper-container swiper3" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">

                <div class="logo">
                  <img src="../src/templates/logos/mirrorpix-logo.png"></img>
                </div>
                <ul>
                  <li class="type"> {type}</li>
                  <li class="usage">{description}</li>
                  <li class="price"> <a href="#" class={"button " + color}> Buy for £6.00 </a></li>
                </ul>
                <div class="footer-logo">
                  <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>

        <!-- Container for large screens -->

        <div class="swiper-container swiper4" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">

                <div class="logo">
                  <img src="../src/templates/logos/mirrorpix-logo.png"></img>
                </div>
                <ul>
                  <li class="type"> {type}</li>
                  <li class="usage">{description}</li>
                  <li class="price"> <a href="#" class={"button " + color}> Buy for £6.00 </a></li>
                </ul>
                <div class="footer-logo">
                  <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>
      </div>
  </div>

  <script>
    //require('swiper');

    console.log("here script");
    /* Pass dummy array to Riot */
    this.items = opts.items;
    console.log(opts.items);

    debugme(value, value2){
      console.log("here " + value2 , value);
      return value;
    }
    render_swiper() {

        var width = window.innerWidth;

        if(width<415) {

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

        if(width>=415&&width<1000) {

        var swiper2 = new Swiper('.swiper2', {
          pagination: '.swiper-pagination',
          slidesPerView:2,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,

        });
        }

        if(width>=1000&&width<=1700) {

        var swiper3 = new Swiper('.swiper3', {
          pagination: '.swiper-pagination',
          slidesPerView:4,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,

        });
        }

        if(width>=1700) {

        var swiper3 = new Swiper('.swiper4', {
          pagination: '.swiper-pagination',
          slidesPerView:5,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 20,

        });
     }
 }




/* Call the render_swiper function every time screen gets resized */

window.onresize = this.render_swiper;

/* Add swiper when mounting elements */

this.on('mount', function(){
    this.render_swiper();
  });

/* After page is updated (used for window resizing) */

this.on('updated', function(){
  this.render_swiper();
});
  </script>
</offers>

riot.tag('raw', '<span></span>', function (opts) {
    this.updateContent = function () {
        this.root.innerHTML = opts.content;
    };

    this.on('update', function() {
        this.updateContent();
    });

    this.updateContent();
});
