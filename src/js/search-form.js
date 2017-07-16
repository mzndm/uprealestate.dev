// Select
$('.search__select').click(function(){
    
    var dropBlock = $(this).parent().find('.search__drop');

    if( dropBlock.is(':hidden') ) {
        dropBlock.slideDown();

        $(this).addClass('search__select--active');

        $('.search__options').click(function(){

            var selectResult = $(this).html();

            $(this).parent().parent().find('.search__result').val(selectResult);
            $(this).parent().parent().find('.search__select').removeClass('search__select--active').html(selectResult);
            dropBlock.slideUp();
        });

    } else {
        $(this).removeClass('search__select--active');
        dropBlock.slideUp();
    }

});