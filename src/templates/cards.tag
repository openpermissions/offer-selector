<offer-card>
    <div class="card_table">
        <div class="logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
            <img src={item.logo}></img>
        </div>
        <h1 style={parent.cssStyleRules(item.secondary_color)} class="name" id={item.id}>{item.name}</h1>
        <raw class="usage" content="{item.description}"></raw>
        <a class ="details" style={parent.cssStyleRules(item.secondary_color)} href={parent.formatDetailsUrl(item.repositoryId, item.id)}>More Details</a>
        <a target="_blank" href="{paymentUrl}" style={parent.cssStyleRules('#fff', primary_color)} class="button" id={id}> Buy for {parent.formatMoney(price.value, price.unit)}</a>
        <div class="footer-logo">
            <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
    </div>
</offer-card>

<organisation-card>
    <div class="card_table">
        <div class="logo" style={parent.cssStyleRules(undefined, item.primary_color)} id={item.id}>
            <img src={item.logo}></img>
        </div>
        <h1 style={parent.cssStyleRules(item.secondary_color)} class="name" id={item.id}>{item.name}</h1>
        <raw class="usage" content="{item.description}"></raw>
        <a if={item.link} href={item.link} style={parent.cssStyleRules('#fff', item.primary_color)}  class="button" id={item.id}> Go to Site</a>
        <div class="footer-logo">
            <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
    </div>
</organisation-card>

<cards>
    <div class="all">
        <div class="swiper-container swiper" id="container">
            <div class="swiper-wrapper" id="wrapper">
                <div each={item in this.items} class="swiper-slide">
                    <offer-card if={parent.type=='offer'} item={item}/>
                    <organisation-card if={parent.type=='licensor'} item={item}/>
                    <organisation-card if={parent.type=='link'} item={item}/>
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

    <style>
        .all{
          border-top: solid 0.08em #FFF;
          border-bottom: solid 0.08em #FFF;
          width:100%;
          height:470px;
          margin: 0 auto;
        }
        /* Container class for swiper */
        .swiper-container {
            width: 100%;
            height: 100%;
            margin: 0 auto;
        }
        /* Container class for swiper slider */
        .swiper-slide {
            width: 100%;
            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }

        /* Media queries for different screen sizes to stop showing the Swiper classes in case someone **really** wants to resize the window continuosly */
        @media screen and (max-width: 320px)
        {

            .swiper-button-prev {
                margin-left: -6px;
            }
            .swiper-button-next {
                margin-right: -6px;
            }
        }

        /* Class for the card */
        .card_table {
          position:relative;
          width:250px;
          height:400px;
          background: #fff;

          -webkit-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
             -moz-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
                  box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
        }
        /* Centered version for Swiper */
        .card_table#mobile{
            margin:0 auto;

        }
        /* Responsive version for Desktop */
        .card_table#desk {
          float:left;
          margin-top:50px;
          margin-left:50px;
          margin-bottom:50px;
        }
        .button_span {
           float: right;
           position: relative;
           left: -50%; /* or right 50% */
           text-align: left;
           border: none;
           background-color:white;
        }

        .details {
          font-size:14px;
          font-family: 'Signika', sans-serif;
        }

        .card_table h1 {
          margin: 0;
          padding:0 0 10px 0;
          height: 10%;
          text-align:center;
          font-family: 'Lato', sans-serif; font-weight: 400; line-height: 58px;
        }
        .name{
          font-size:20px;
          position: relative;
          margin-left: 10px;
          margin-top:15px;
          font-family: 'Signika', sans-serif; line-height: 35px;
        }

        .usage{
          display:block;
          font-family: 'Lucida Sans', Arial, sans-serif;
          font-size: 14px;
          padding:0 20px;
          height:48%;
        }

        .details {
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

        .button {
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

        .logo{
          background: #2A2A28;
          width:250px;
          height:50px;
        }

        .logo img{
          width:220px;
          height:40px;
          display:block;
          margin: 0 auto;
          padding-top: 7px;
        }
        .footer-logo{
          position:absolute;
          height:40px;
          width:100%;
          bottom: 0;
          border-top: solid 1px;
          border-color: #6C7A89;
          background: #DADFE1;
        }
        .footer-logo img{
          height:40px;
          float:left;
        }
        .footer-logo p{
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
