$('.language').click(function () {
    $('.language__list').toggleClass('language__list--active');
});
$('.language__list-item').click(function () {
    $('.language__list').removeClass('language__list--active');
});

$('.currency').click(function () {
    $('.currency__list').toggleClass('currency__list--active');
});
$('.currency__list-item').click(function () {
    $('.currency__list').removeClass('currency__list--active');
});