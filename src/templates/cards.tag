<offer-card>
    <div class="card_table">
        <div class="logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
            <img src={item.logo}></img>
        </div>
        <h1 style={parent.cssStyleRules(item.secondary_color)} class="name" id={item.id}>{item.name}</h1>
        <raw class="usage" content="{item.description}"></raw>
        <a class ="details" style={parent.cssStyleRules(item.secondary_color)} href={parent.formatDetailsUrl(item.repository_id, item.id)}>More Details</a>
        <a href="#" style={parent.cssStyleRules('#fff', item.primary_color)} class="button" id={item.id}> Buy for {parent.formatMoney(item.price.value, item.price.unit)}</a>
        <div class="footer-logo">
            <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
    </div>
</offer-card>

<licensor-card>
    <div class="card_table">
        <div class="logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
            <img src={item.logo}></img>
        </div>
        <h1 style={parent.cssStyleRules(item.secondary_color)} class="name" id={item.id}>{item.name}</h1>
        <raw class="usage" content="{item.description}"></raw>
        <a if={item.url} href={item.url} style={parent.cssStyleRules('#fff', item.primary_color)}  class="button" id={item.id}> Go to Site</a>
        <div class="footer-logo">
            <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
    </div>
</licensor-card>

<cards>
    <div class="all">
        <div class="swiper-container swiper" id="container">
            <div class="swiper-wrapper" id="wrapper">
                <div each={item in this.items} class="swiper-slide">
                    <offer-card if={parent.type=='offer'} item={item}/>
                    <licensor-card if={parent.type=='licensor'} item={item}/>
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
        </div>
    </div>

<script>
  this.items = opts.items;
  this.type = opts.type;
  const helper = require('../helper');
  this.formatMoney = helper.formatMoney;
  this.cssStyleRules = helper.cssStyleRules
  this.formatDetailsUrl = helper.formatDetailsUrl

  const swiper = require('../swiper');
  window.onresize = swiper.renderSwiper;

  this.on('mount', function(){
    swiper.renderSwiper();
  });

  this.on('updated', function(){
    swiper.renderSwiper();
  });
</script>
</cards>


riot.tag('raw', '<div></div>', function (opts) {
    this.updateContent = function () {
        this.root.innerHTML = opts.content;
    };

    this.on('update', function() {
        this.updateContent();
    });

    this.updateContent();
});
