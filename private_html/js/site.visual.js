$(document).ready(function (){
    burgerBtnToggler();
});
function burgerBtnToggler(){
    let button = $('.header-menu-burger');
    button.on('click', function(){
        $(this).find('.header-menu-btn').toggleClass('active');
    });
}