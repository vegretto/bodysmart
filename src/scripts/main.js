$(document).ready(function () {

    /*--Overflow scroll glitch fix---*/

    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    /*--- MODALS ---*/

    let renderClickableBG = (isDark, elementToClose, renderParent=$('body'), blockScroll=true) => {
        renderParent.append('<div class="clickable-bg"></div>');
        if (blockScroll) {
            $('body').addClass('modal-opened').css('padding-right', scrollWidth);
        }
        if (isDark) {
            $('.clickable-bg').addClass('clickable-bg--dark').fadeOut(1).fadeIn(400);
        }
        $('.clickable-bg').on('click', function () {
            $(this).remove();
            if (elementToClose) {
                elementToClose.removeClass('opened');
                $('body').removeClass('modal-opened').css('padding-right', 0);
            }
        })
    }

    $(document).on('click', '.js-open-modal', function (e) {
        e.preventDefault();
        let modalToOpen = $(this).attr('data-modal');
        $(`#${modalToOpen}`).addClass('opened').fadeOut(1).fadeIn(400);
        $('body').addClass('modal-opened').css('padding-right', scrollWidth);
        renderClickableBG(true, $(`#${modalToOpen}`), $(`#${modalToOpen}`))
    })

    $(document).on('click', '.js-close-modal', function () {
        let modalToClose = $(this).parents('.modal');
        modalToClose.removeClass('opened');
        $('body').removeClass('modal-opened').css('padding-right', 0);
        modalToClose.find(('.clickable-bg')).remove();
    })



    /*--- MOBILE MENU ---*/

    $(document).on('click', '.js-open-mobile-menu', function () {
        $('.mobile-menu').addClass('opened');
    });

    $(document).on('click', '.js-close-mobile-menu', function () {
        $('.mobile-menu').removeClass('opened');
    });

    /*--- FORMS ---*/

    $(document).on('click', '.custom-radio-label', function () {
        $(this).parents('.fg-wrapper').find('.custom-radio-label').removeClass('checked');
        $(this).addClass('checked');
    });

    $(document).on('click', '.js-checkbox', function (e) {
        let isChecked = $(this).find('.input-common').prop('checked');
        $(this).toggleClass('checked').find('.custom-cb-badge').toggleClass('checked');
        $(this).find('.input-common').prop('checked', isChecked);
    });

    $('input[type="tel"]').each(function () {
        const dynamicMask = IMask($(this)[0], {
            mask: [
                {
                    mask: '+{7}(#00)000-00-00',
                    definitions: {
                        '#': /[12345690]/
                    }
                },
                {
                    mask: '{#}(000)000-00-00',
                    definitions: {
                        '#': /[8]/
                    }
                },{
                    mask: '{+#}(000)000-00-00',
                    definitions: {
                        '#': /[+7]/
                    }
                },
            ]
        })
    })


    /*--- SLIDERS ---*/

    const resultsSlider = new Swiper('.js-results-slider', {
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: '.slider-wrapper--results .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-wrapper--results .swiper-button--next',
            prevEl: '.slider-wrapper--results .swiper-button--prev',
        },
        breakpoints: {
            767: {
                loop: true,
            }
        }
    });

    const testimonialsSlider = new Swiper('.js-testimonials-slider', {
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 15,
        centeredSlides: true,
        navigation: {
            nextEl: '.slider-wrapper--testimonials .swiper-button--next',
            prevEl: '.slider-wrapper--testimonials .swiper-button--prev',
        },
        breakpoints: {
            767: {
                spaceBetween: 65,
            }
        }
    });

    $('.testimonials video').on('ended', function () {
        testimonialsSlider.slideNext();
        $(this).siblings('.play-btn').show();
        $('.testimonials-slider .swiper-slide-active video')[0].play();
        $('.testimonials-slider .swiper-slide-active .play-btn').hide();
    });


    const faqSlider = new Swiper('.js-faq-slider', {
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            nextEl: '.slider-wrapper--faq .swiper-button--next',
            prevEl: '.slider-wrapper--faq .swiper-button--prev',
        },
        pagination: {
            el: '.slider-wrapper--faq .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            767: {
                spaceBetween: 30,
            }
        }
    });

    const articlesSlider = new Swiper('.js-articles-slider', {
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 40,
        navigation: {
            nextEl: '.slider-wrapper--articles .swiper-button--next',
            prevEl: '.slider-wrapper--articles .swiper-button--prev',
        },
        breakpoints: {
            767: {
                spaceBetween: 70,
            }
        }
    });

    /*--- MISC ---*/

    $(document).on('click', '.js-play-video', function () {
        const video = $(this).find('video')[0];
        const playBtn = $(this).find('.play-btn');
        const pauseBtn = $(this).find('.pause-btn');

        if (video.paused) {
            $('.js-play-video video').each(function () {
                $(this)[0].pause();
                $(this).siblings('.play-btn').show();
                $(this).siblings('.pause-btn').css('visibility', 'hidden');
            })
            video.play();
            playBtn.hide();
            pauseBtn.css('visibility', 'visible');
        }
        else {
            video.pause();
            playBtn.show();
            pauseBtn.css('visibility', 'hidden');
        }
        testimonialsSlider.slideTo($(this).index());
    })

    let moveElement = (element, target, screenSize, append = true, after = false) => {
        if (screen.width < screenSize) {
            if (after) {
                for (let i = 0; i < $(element).length; i++) {
                    $(target).eq(i).after($(element).eq($(target).length === 1 ? 0 : i))
                }
            } else {
                if (append) {
                    for (let i = 0; i < $(element).length; i++) {
                        $(element).eq(i).appendTo($(target).eq($(target).length === 1 ? 0 : i))
                    }
                } else {
                    for (let i = 0; i < $(element).length; i++) {
                        $(element).eq(i).prependTo($(target).eq($(target).length === 1 ? 0 : i))
                    }
                }
            }
        }
    }

    moveElement('.main-nav', '.mobile-menu', 991);
    moveElement('.header .common-btn-wrapper', '.mobile-menu', 600);
    moveElement('.main-section__top-text', '.main-section__top-wrapper', 767);
    moveElement('.time-section .bg-wrapper', '.messages-items--top', 767, false, true);
    moveElement('.gift__img', '.gift__content-inner', 991);
    moveElement('.about-me__img', '.about-me__left', 767, false, true);

    let scrollTo = (target) => {
        $([document.documentElement, document.body]).animate({
            scrollTop: target.offset().top
        }, 1000);
    }

    $(document).on('click', '.js-scroll-to', function () {
        let target = $(this).attr('data-scroll');
        $('.mobile-menu').removeClass('opened');
        scrollTo($(target));
    })

    $(document).on('click', '.js-change-price', function () {
        $('.js-price span').text($(this).attr('data-price'));
    });
});


