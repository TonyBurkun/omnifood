$(document).ready(function () {

   // For the sticky navigation
   $('.section-features--js').waypoint(function (direction) {
       if (direction == 'down'){
           $('nav').addClass('sticky');
       }else{
           $('nav').removeClass('sticky');
       }
   }, {
       offset: '60px;'
   });


//    For scroll on buttons

    $('.scroll-to-plans--js').on('click', function () {
        $('html, body').animate({scrollTop: $('.section-plans--js').offset().top}, 1000);
    });

    $('.scroll-to-start--js').on('click', function () {
        $('html, body').animate({scrollTop: $('.section-features--js').offset().top}, 1000);
    });

//     Navigation scroll
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

//    Animation on scroll

    $('.wp-1--js').waypoint(function (direction) {
        $('.wp-1--js').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });

    $('.wp-2--js').waypoint(function (direction) {
        $('.wp-2--js').addClass('animated fadeInUp');
    }, {
        offset: '50%'
    });

    $('.wp-3--js').waypoint(function (direction) {
        $('.wp-3--js').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });

    $('.wp-4--js').waypoint(function (direction) {
        $('.wp-4--js').addClass('animated pulse');
    }, {
        offset: '50%'
    });

//    Mobile navigation
    $('.nav-icon--js').click(function () {
        var nav = $('.main-nav--js');
        var icon = $('.nav-icon--js i');
        nav.slideToggle(200);
        if(icon.hasClass('ion-navicon-round')){
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        }else{
            icon.removeClass('ion-close-round');
            icon.addClass('ion-navicon-round');
        }


//Maps
    new GMaps({
        div: '.map',
        lat: -12.043333,
        lng: -77.028333
    });

    });

});