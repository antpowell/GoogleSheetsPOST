/**
 * Created by SGT_POWELL on 2/19/2016.
 */

(function(){


    alert($('.button').attr('type'));
    $(".button").on('click', function(){
        alert($('.button').attr('type'));
        $('.mc-closeModal').css('display', 'block');

    });
})();