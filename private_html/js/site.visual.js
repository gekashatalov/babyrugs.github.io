$(document).ready(function (){
    burgerBtnToggler();
    productSizeSelectric();
});
//
function burgerBtnToggler(){
    let button = $('.header-menu-burger');
    button.on('click', function(){
        $(this).find('.header-menu-btn').toggleClass('active');
    });
}
//initial custom select
function productSizeSelectric () {
	$('select.product-size').selectric();
}