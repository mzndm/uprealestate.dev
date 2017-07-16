$('.language').click(function () {
    $('.language__list').toggleClass('language__list--active');
});

$('.currency').click(function () {
    $('.currency__list').toggleClass('currency__list--active');
});

$('.menu__button').click(function () {
    $('.menu').slideToggle();
    $(this).toggleClass('menu__button--active')
});

