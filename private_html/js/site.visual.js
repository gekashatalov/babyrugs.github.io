$(document).ready(function (){
	burgerBtnToggler();
	productSizeSelectric();
	swiperSlider();
	timer();
	footerFormValidate();
	animateScroll();
	maskedPhone();
	informFancyBox();
	customScroll();
	buyProduct();
	wowAnimate();
	setMainMenuAnimateDelay ();
});
//Переключатель активности мобильной кнопки меню, и появление/скрытие самого меню
function burgerBtnToggler(){
	let button = $('.header-menu-burger');
	button.on('click', function(){
		$(this).find('.header-menu-btn').toggleClass('active');
		$('.header-menu-mobile').toggleClass('active');
	});
}
//initial custom select
function productSizeSelectric () {
	$('select.product-size').selectric().on('change', function(){
		let beforePrice = $(this).parents('.product-card').find('.before-price').toArray();
		let currentPrice = $(this).parents('.product-card').find('.curent-price').toArray();
		let selectedItem = $(this).parents('.product-card').find('.selectric-items>.selectric-scroll>ul>li.selected').data('index');
		beforePrice.forEach(element => {
			if($(element).data('index') == selectedItem){
				$(beforePrice).not(element).addClass('hidden');
				$(element).removeClass('hidden');
			}
		});
		currentPrice.forEach(element => {
			if($(element).data('index') == selectedItem){
				$(currentPrice).not(element).addClass('hidden');
				$(element).removeClass('hidden');
			}
		});
	});
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
		if (now > start) {
			start.setHours(start.getHours() + 12);
		}
		let remain = ((start - now) / 1000);
		let hh = pad((remain / 60 / 60) % 60);
		let mm = pad((remain / 60) % 60);
		let ss = pad(remain % 60);
		timerHours.text(hh);
		timerMinutes.text(mm);
		timerSeconds.text(ss);
		setTimeout(tick, 1000);
	}
	tick();
}
//Плавный скролл к секции
function animateScroll() {
	$('.header-menu-item>a').on('click', scroll);
	$('.header-menu-mobile-item>a').on('click', scroll);
	$('.footer-menu-list>li>a').on('click', scroll);
	$('.baner-block-description>a').on('click', scroll);
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
//Маска для ввода телефона
function maskedPhone(){
	let footerFormPhone = $('.footer-form>input[name=phone]');
	let popUpFormPhone = $('#form_buy form input[name=buy_phone]')
	footerFormPhone.mask("+38 (099) 999 99 99");
	popUpFormPhone.mask("+38 (099) 999 99 99");
}
//Валидация формы подвала
function footerFormValidate(){
	let form = $('.footer-form');
	form.validate({
		rules: {
			"phone": {
				required: true,
				minlength: 19,
			},
		},
		messages: {
			"phone": {
				required: "Введите номер телефона",
				minlength: "Номер должен быть в формате +38 (099) 999 99 99",
			}
		},
		submitHandler:	function(){
			$.ajax({
				type: "POST",
				url: "/mailFooter.php",
				data: form.serialize(),
				success: function() {
					$.fancybox.open({
						src: '#popup_thanks',
						opts: {
							smallBtn: false,
							baseClass: 'custom-fancybox',
							touch: false,
						}
					});
				}
			});
			return false;
		}
	});
}
//инициализация fancy-popup для информативных окошек
function informFancyBox(){
	$('.fancy-popup').fancybox({
		smallBtn: false,
		baseClass: 'custom-fancybox',
		touch: false,
	});
}
//кастомный скролл для popup
function customScroll() {
	$('.inform-content').mCustomScrollbar();
}
//Функция для открытия формы при заказе товара и отправка данных на сервер
function buyProduct(){
	let productCard = $('.product-card');
	productCard.on('click', '.btn-buy', function(){
		$.fancybox.open({
			src: '#form_buy',
			opts: {
				smallBtn: false,
				baseClass: 'custom-fancybox',
				touch: false,
			}
		});
		let productName = $(this).parents('.product-card').find('.product-name').text();
		let productSize = $(this).parents('.product-card').find('.selectric-items .selectric-scroll ul>li.selected').text();

		let form = $('#form_buy form');
		form.validate({
			rules: {
				"buy_phone": {
					required: true,
					minlength: 19,
				},
			},
			messages: {
				"buy_phone": {
					required: "Введите номер телефона",
					minlength: "Номер должен быть в формате +38 (099) 999 99 99"
				}
			},
			submitHandler:	function(e){
				let data = form.serialize() + "&productName=" + productName + "&productSize=" + productSize;
				$.ajax({
					type:"POST",
					url:"/mail.php",
					data: data,
					success: function() {
						window.location = "/thanks";
					}
				});
			}
		});
	});
}
//Инициализация wow плагина
function wowAnimate(){
	let wow = new WOW({
		offset:100,
		visibility: 'hidden',
		callback: function(box){
			if($(box).hasClass('animate')){
				$(box).addClass('animate-active');
			}
		}
	});
	wow.init();	
}
//Функция установки задержки анимации на главной странице
function setMainMenuAnimateDelay (){
	let productCard = $('.product-card');
	if(productCard.length != 0){
		if($(window).width() > 990){
			for(i = 0; i < productCard.length; i+=3){
				$(productCard[i]).attr('data-wow-delay', '0s');
				$(productCard[i+1]).attr('data-wow-delay', '0.1s');
				$(productCard[i+2]).attr('data-wow-delay', '0.2s');
			}
		}
		if($(window).width() <= 990 && $(window).width() > 680){
			for(i = 0; i < productCard.length; i+=2){
				$(productCard[i]).attr('data-wow-delay', '0s');
				$(productCard[i+1]).attr('data-wow-delay', '0.1s');
			}
		} else if($(window).width() <= 680){
			for(i = 0; i < productCard.length; i++){
				$(productCard[i]).attr('data-wow-delay', '0s');
			}
		}
	}
	let advantagesItem = $('.advantages-items-item');
	if(advantagesItem.length != 0){
		if($(window).width() > 990){
			for(i = 0; i < advantagesItem.length; i+=3){
				$(advantagesItem[i]).attr('data-wow-delay', '0s');
				$(advantagesItem[i+1]).attr('data-wow-delay', '0.1s');
				$(advantagesItem[i+2]).attr('data-wow-delay', '0.2s');
			}
		}
		if($(window).width() <= 990 && $(window).width() > 640){
			for(i = 0; i < advantagesItem.length; i+=2){
				$(advantagesItem[i]).attr('data-wow-delay', '0s');
				$(advantagesItem[i+1]).attr('data-wow-delay', '0.1s');
			}
		} else if($(window).width() <= 640){
			for(i = 0; i < advantagesItem.length; i++){
				$(advantagesItem[i]).attr('data-wow-delay', '0s');
			}
		}
	}
	let feedbackItem = $('.feedback');
	if(feedbackItem.length != 0){
		if($(window).width() > 990){
			for(i = 0; i < feedbackItem.length; i+=4){
				$(feedbackItem[i]).attr('data-wow-delay', '0s');
				$(feedbackItem[i+1]).attr('data-wow-delay', '0.1s');
				$(feedbackItem[i+2]).attr('data-wow-delay', '0.2s');
				$(feedbackItem[i+3]).attr('data-wow-delay', '0.3s');
			}
		}
		if($(window).width() <= 990){
			for(i = 0; i < feedbackItem.length; i+=2){
				$(feedbackItem[i]).attr('data-wow-delay', '0s');
				$(feedbackItem[i+1]).attr('data-wow-delay', '0.1s');
			}
		}
	}
}