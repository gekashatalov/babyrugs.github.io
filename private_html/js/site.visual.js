$(document).ready(function (){
	burgerBtnToggler();
	productSizeSelectric();
	swiperSlider();
	timer();
	footerFormSend();
	animateScroll();
});
//
function burgerBtnToggler(){
	let button = $('.header-menu-burger');
	button.on('click', function(){
		$(this).find('.header-menu-btn').toggleClass('active');
		$('.header-menu-mobile').toggleClass('active');
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
//timer
function timer(){
	let timerHours = $('.timer-hours');
	let timerMinutes = $('.timer-minuts');
	let timerSeconds = $('.timer-seconds');
	let start = new Date();
	function pad(num) {
		return ("0" + parseInt(num)).substr(-2);
	}
	let now = new Date();
	let nowHours = now.getHours();
	if(nowHours >= 13){
		start.setHours(23, 60, 60);
	} else {
		start.setHours(12, 60, 60);
	}
	function tick() {
		let now = new Date();
		if (now > start) { // too late, go to tomorrow
			start.setHours(start.getHours() + 12);
		}
		let remain = ((start - now) / 1000);
		let hh = pad((remain / 60 / 60) % 60);
		let mm = pad((remain / 60) % 60);
		let ss = pad(remain % 60);
		timerHours.text(hh);
		timerMinutes.text(mm);
		timerSeconds.text(ss);
		// console.log(hh + ":" + mm + ":" + ss);
		setTimeout(tick, 1000);
	}
	tick();
}
//Отправка данных из формы на сервер
function footerFormSend(){
	$('.footer-form').on('submit', function(){
		$.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            window.location = "/thanks";
        });
        return false;
	})
}
//Плавный скролл к секции
function animateScroll() {
	$('.header-menu-item>a').on('click', scroll);
	$('.header-menu-mobile-item>a').on('click', scroll);
	$('.footer-menu-list>li>a').on('click', scroll);
	function scroll(){
		let getSectionID = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(getSectionID).offset().top
		}, {
			duration: 450,
			easing: "linear"
		});
	}
}