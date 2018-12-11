
$(document).ready(() => {
    $('.inputs').find('.input').blur(function(){
        if($(this).val().length){
            $(this).parent().addClass('filled');
        }else{
            $(this).parent().removeClass('filled');
        }
    })
})