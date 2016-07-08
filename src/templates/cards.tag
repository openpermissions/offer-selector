<offer-card>
    <div class="opp_logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
        <img src={item.logo}></img>
    </div>
    <h1 style={parent.cssStyleRules(item.secondary_color)} class="opp_name" id={item.id}>{item.name}</h1>
    <raw class="opp_usage" content="{item.description}"></raw>
    <a class ="opp_details" style={parent.cssStyleRules(item.secondary_color)} href={parent.formatDetailsUrl(item.repositoryId, item.id)}>More Details</a>
    <a if={item.paymentUrl} target="_blank" href="{item.paymentUrl}" style={parent.cssStyleRules('#fff', item.primary_color)} class="opp_button" id={item.id}> Buy for {parent.formatMoney(item.price.value, item.price.unit)}</a>
    <a if={item.link && !item.paymentUrl} target="_blank" href={item.link} style={parent.cssStyleRules('#fff', item.primary_color)}  class="opp_button" id={item.id}> Go to Site</a>
    <div class="opp_footer-logo">
        <p>Powered by </p> <img src="https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/opp-logo.png"></img>
    </div>
</offer-card>

<organisation-card>
    <div class="opp_logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
        <img src={item.logo}></img>
    </div>
    <h1 style={parent.cssStyleRules(item.secondary_color)} class="opp_name" id={item.id}>{item.name}</h1>
    <raw class="opp_usage" content="{item.description}"></raw>
    <a if={item.link} href={item.link} style={parent.cssStyleRules('#fff', item.primary_color)}  class="opp_button" id={item.id}> Go to Site</a>
    <div class="opp_footer-logo">
        <p>Powered by </p> <img src="https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/opp-logo.png"></img>
    </div>
</organisation-card>

<cards>
    <div class="swiper-container swiper" id="opp_container">
        <div class="swiper-wrapper" id="wrapper">
            <div each={item in this.items} class="swiper-slide">
                <offer-card if={parent.type=='offer'} item={item}/>
                <organisation-card if={parent.type=='licensor' || parent.type=='link'} item={item}/>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white" id="pagination"></div>
        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
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

    <style>
        #opp_container {
          border-top: solid 0.08em #FFF;
          border-bottom: solid 0.08em #FFF;
          width:100%;
          height:470px;
          margin: 0 auto;
        }

        #opp_container .swiper-slide {
          width:250px;
          height:400px;
          margin: 20px;
          background: #fff;
          -webkit-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
             -moz-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
                  box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
        }

        #opp_container .swiper-button-prev,
        #opp_container .swiper-button-next {
            height: 20px;
            top: 98%;
        }

        .swiper-slide h1 {
          margin: 0;
          padding:0 0 10px 0;
          height: 10%;
          text-align:center;
          font-family: 'Lato', sans-serif; font-weight: 400; line-height: 58px;
        }
        .opp_name{
          font-size:20px;
          position: relative;
          margin-left: 10px;
          margin-top:15px;
          font-family: 'Signika', sans-serif; line-height: 35px;
        }

        .opp_usage{
          display:block;
          font-family: 'Lucida Sans', Arial, sans-serif;
          font-size: 14px;
          padding:0 20px;
          height:48%;
        }

        .opp_details {
          font-size:14px;
          font-family: 'Signika', sans-serif;
          display: block;
          position: absolute;
          bottom: 85px;
          left: 50px;
          width: 100px;
          margin: auto;
          margin-bottom: 5px;
          padding: 0 20px;
          text-align: center;
          text-decoration: none;
          font: bold 14px/20px Arial, sans-serif;
        }

        .opp_button {
          display: block;
          position: absolute;
          bottom: 50px;
          left: 50px;
          color: #fff;
          width: 100px;
          margin: auto;
          padding: 0 20px;
          text-align: center;
          text-decoration: none;
          font: bold 12px/35px Arial, sans-serif;
          -webkit-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
             -moz-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
                  box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
        }

        .opp_logo{
          background: #2A2A28;
          width:250px;
          height:50px;
        }

        .opp_logo img{
          width:220px;
          height:40px;
          display:block;
          margin: 0 auto;
          padding-top: 7px;
        }
        .opp_footer-logo{
          position:absolute;
          height:40px;
          width:100%;
          bottom: 0;
          border-top: solid 1px;
          border-color: #6C7A89;
          background: #DADFE1;
        }
        .opp_footer-logo img{
          height:40px;
          float:left;
        }
        .opp_footer-logo p{
          font-family: 'Lucida Sans', Arial, sans-serif;
          font-size: 12px;
          float:left;
          margin-top:15px;
          margin-left:10px;
        }
    </style>
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
