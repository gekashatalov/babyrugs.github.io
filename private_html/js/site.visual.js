$(document).ready(function (){
	burgerBtnToggler();
	productSizeSelectric();
	swiperSlider();
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
//initial swiper-slider
function swiperSlider(){
	const swiper = new Swiper('.slider-container', {
		slidesPerView:'auto',
		speed: 400,
		spaceBetween: 8,
		watchSlidesVisibility : true,
		breakpoints: {
			320 : {
				spaceBetween: 8,
			},
			641 : {
				spaceBetween: 16,
			},
			1025: {
				spaceBetween: 45,
			}
		}
	});
}