<offers>
  <div>
      <!--<h1> {opts.title} </h1>-->
      <div class="all">
        <!-- Container for smartphones -->

        <div class="swiper-container swiper" id="container">
          <div class="swiper-wrapper" id="wrapper">
            <div each = {items} class="swiper-slide">
              <div class="card_table" id="mobile">
                <div class="logo" style={parent.cssStyleRules(undefined, primary_color)} id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</li>
                  <a href={parent.formatDetailsUrl(repository_id,offer_id)}>More Details...</a>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                </ul>
                <div class="price"> <a href="#" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a></div>
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
                <div class="logo" style={parent.cssStyleRules(undefined, primary_color)} id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</li>
                  <a href={parent.formatDetailsUrl(repository_id,offer_id)}>More Details...</a>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                </ul>
                <div class="price"> <a href="#" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a></div>
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

                <div style={parent.cssStyleRules(undefined, primary_color)} class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</li>
                  <a href={parent.formatDetailsUrl(repository_id,offer_id)}>More Details...</a>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                </ul>
                <div class="price"> <a href="#" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a></div>
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

                <div style={parent.cssStyleRules(undefined, primary_color)} class="logo" id={id}>
                  <img src={logo}></img>
                </div>
                <ul>
                  <li style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</li>
                  <a href={parent.formatDetailsUrl(repository_id,offer_id)}>More Details...</a>
                  <li class="usage message">Rotate for description </li>
                  <button class="button_span up" id={id}><img src="../ui_elem/caret-top.svg"></img></button>
                  <div class="container" id={id}><div class="content" id={id}><li class="usage"><raw content="{description}"></raw></li></div></div>
                  <button class="button_span down" id={id}><img src="../ui_elem/caret-bottom.svg"></img></button>
                </ul>
                <div class="price"> <a href="#" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a></div>
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
  this.formatMoney = helper.formatMoney;
  this.cssStyleRules = helper.cssStyleRules
  this.formatDetailsUrl = helper.formatDetailsUrl

  window.onresize = helper.render_swiper;

  this.on('mount', function(){
    helper.render_swiper();
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
