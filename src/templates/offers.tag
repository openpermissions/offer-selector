<offers>
  <div>
      <!--<h1> {opts.title} </h1>-->
      <div class="all">
        <!-- Container for smartphones -->

        <div class="swiper-container swiper" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">
                <div class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li class="type" id={id}>{type}</li>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <li class="price"> <a href="#" class="button color" id={id}> Buy for £6.00 </a></li>
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
                <div class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li class="type" id={id}>{type}</li>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <li class="price"> <a href="#" class="button color" id={id}> Buy for £6.00 </a></li>
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

                <div class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li class="type" id={id}>{type}</li>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <li class="price"> <a href="#" class="button color" id={id}> Buy for £6.00 </a></li>
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

                <div class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li class="type" id={id}>{type}</li>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                  <li class="price"> <a href="#" class="button color" id={id}> Buy for £6.00 </a></li>
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
  this.items = opts.items;

  const helper = require('../helper');

  window.onresize = helper.render_swiper;

  this.on('mount', function(){
    helper.render_swiper();

    var item_length = opts.items.length;
    //
    for(var i = 0 ; i<item_length; i++)
    helper.change_color(opts.items[i].id,opts.items[i].title_color, opts.items[i].logo_color, opts.items[i].btn_text_color, opts.items[i].primary_color, helper.gradient_Color(opts.items[i].primary_color,40));

    /* This is just an example of how to change background colors on mobile */
    var colors = ["#9DC8C8","#6E7783","#555273","#87314E"];
    helper.background_changer(colors);

    /* Scroller */
    helper.scroller();
  });

  this.on('updated', function(){
    helper.render_swiper();
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
