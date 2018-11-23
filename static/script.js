
$(document).ready(() => {
    let scrolled = $('body').scrollTop() > 0;
    if(scrolled){
        $('body').addClass('scrolled');
    }else{
        $('body').removeClass('scrolled');
    }
    
    $(window).scroll(() => {
        if($(window).scrollTop() > 0){
            if(!scrolled){
                scrolled = true
            }
        }else{
            if(scrolled){
                scrolled = false;
            }
        }

        if(scrolled){
            $('body').addClass('scrolled');
        }else{
            $('body').removeClass('scrolled');
        }
    });


    let product_top_swiper = new Swiper('.products-top-swiper', {
        slidesPerView: 1,
        centeredSlides: true,
        initialSlide: 1,
    });
})
