<offers>
  <div>
      <h1> {opts.title} </h1>
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

    /* Pass dummy array to Riot */
    this.items = opts.items;

    change_color(id, title_color, logo_color, btn_text_color, primary_color, secondary_color) {

      var id_tag = "#" + id;
      console.log(id_tag);
      //Change title color
      $(id_tag + '.type').css('color',title_color);

      //Change Logo color
      $(id_tag + '.logo').css('background',logo_color);

      //Change button text change_color
      $(id_tag + '.button').css('color',btn_text_color);

      // Create css for gradient button
      var primary_color_1 = { "background" : primary_color,
                              "background" : "-webkit-gradient(linear,left top,left bottom,from("+ primary_color +"),to(" + secondary_color +"))",
                              "background" : "-webkit-linear-gradient("+ primary_color +","+ secondary_color +")",
                              "background" : "-moz-linear-gradient("+ primary_color +","+ secondary_color +")",
                              "background" : " -o-linear-gradient("+ primary_color +","+ secondary_color +")",
                              "background" : "linear-gradient("+ primary_color +","+ secondary_color +")"};
      $(id_tag + '.color').css(primary_color_1);
    }

    render_swiper() {

        var width = window.innerWidth;
        var height = window.innerHeight;

        $('.message').hide();
        if(height <= 420)
        {
          $('.card_table').css('height',"250px");
          $('.container').hide();
          $('.button_span').hide();
          $('.message').show();
        }
        else {
          $('.card_table').css('height',"400px");
          $('.container').show();
          $('.button_span').show();
          $('.message').hide();
        }

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
          spaceBetween: 5,

        });
        }

        if(width>=1000&&width<=1700) {

        var swiper3 = new Swiper('.swiper3', {
          pagination: '.swiper-pagination',
          slidesPerView:4,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 5,

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
    this.change_color("0","#379392","#353866","white","#CE6D39","#F17F42");

    //Hide all up buttons initially
    $(".up").addClass('hiding');

    //array for card heights
    var container_height = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);


            $(".up").click(function () {
              //Get id of current card
              var button_id = $(this).attr("id");
              var array_id = button_id;
              button_id = "#" + button_id;

              //Animation for up
              $(button_id + '.container').animate({scrollTop: '-=140'}, "fast");

              //When pressing up container scrolls up
              container_height[array_id] -=140;

              //Check height of container
              var check_height=$(button_id + '.container').height();
              check_height += container_height[array_id];

              //if the height is the same value as container, we hide the up button as we ar at the top
              if(check_height<=145){
                 $(button_id + ".up").addClass('hiding');
               }

              //show down button if there is any content left
              if ($(button_id + '.content').height() >  check_height) {

                   $(button_id + ".down").show();

                 }
            });

            $(".down").click(function () {
              // Get id of current card
              var button_id = $(this).attr("id");
              var array_id = button_id;
              button_id = "#" + button_id;

              //When pressing down container scrolls lower
              container_height[array_id] +=140;

              //Animation for down
              $(button_id + '.container').animate({scrollTop: '+=140'}, "fast");

              //Up button is now made visible
              $(button_id + ".up").removeClass("hiding");

              //Check if there is still content left, if not, hide down button as we've reached end of overflowing text

              if ($(button_id + '.content').height() <  $(button_id + '.container').height()+container_height[array_id]+5) {
                   $(button_id + ".down").hide();
                 }
            });

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
