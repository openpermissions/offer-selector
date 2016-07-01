<offers>
  <div class="all">
    <!-- Container for smartphones -->
    <div class="swiper-container swiper" id="container">
      <div class="swiper-wrapper" id="wrapper">
        <div each = {items} class="swiper-slide">
          <div class="card_table" id="mobile">
            <div class="logo" style={parent.cssStyleRules(undefined, primary_color)} id={id}>
              <img src={logo}></img>
            </div>
            <h1 style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</h1>
            <raw class="usage" content="{description}"></raw>
            <a class ="details" style={parent.cssStyleRules(secondary_color)} href={parent.formatDetailsUrl(repositoryId,id)}>More Details</a>
            <a target="_blank" href="{paymentUrl}"  style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a>
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
            <h1 style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</h1>
            <raw class="usage" content="{description}"></raw>
            <a class ="details" style={parent.cssStyleRules(secondary_color)} href={parent.formatDetailsUrl(repositoryId,id)}>More Details</a>
            <a target="_blank" href="{paymentUrl}" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a>
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
            <h1 style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</h1>
            <raw class="usage" content="{description}"></raw>
            <a class ="details" style={parent.cssStyleRules(secondary_color)} href={parent.formatDetailsUrl(repositoryId,id)}>More Details</a>
            <a target="_blank" href="{paymentUrl}"  style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a>
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
            <h1 style={parent.cssStyleRules(secondary_color)} class="type" id={id}>{type}</h1>
            <raw class="usage" content="{description}"></raw>
            <a class ="details" style={parent.cssStyleRules(secondary_color)} href={parent.formatDetailsUrl(repositoryId,id)}>More Details</a>
            <a target="_blank" href="{paymentUrl}"  style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a>
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


<script>
  this.items = opts.items;

  const helper = require('../helper');
  this.formatMoney = helper.formatMoney;
  this.cssStyleRules = helper.cssStyleRules
  this.formatDetailsUrl = helper.formatDetailsUrl

  const swiper = require('../swiper');

  window.onresize = swiper.renderSwiper();

  this.on('mount', function(){
    swiper.renderSwiper();
  });

  this.on('updated', function(){
    swiper.renderSwiper();
  });
</script>
</offers>

riot.tag('raw', '<div></div>', function (opts) {
    this.updateContent = function () {
        this.root.innerHTML = opts.content;
    };

    this.on('update', function() {
        this.updateContent();
    });

    this.updateContent();
});
