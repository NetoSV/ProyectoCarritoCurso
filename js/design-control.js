$(document).ready( function(){

	$('#menu_button').click(function(){
		mostrarMenu(true);
		
	} );

	$(window).resize(function() {

		ajustarImagen();

		$('#main-carousel-indicator span').click(function(){

			

			var posicion= 0;
			posicion = $('#main-carousel-indicator span').index( $(this) );
			moverCarousel( posicion );
			clearInterval( iniciarAnimacion );


		});

		var incremento = 0;
		var iniciarAnimacion = setInterval(function(){			
			var limite = $('#carousel .main_block').length - 1;

			incremento++;

			if( incremento > limite ) {
				incremento = 0;
			}

			moverCarousel(incremento);

		}, 5000);

		jQuery('.parallax_img').parallax();


	});

	ajustarImagen();

	setTimeout( function() {
 		ajustarImagen();
	}, 500)

});

function mostrarMenu(estado){
	 var menu = $('#menu');

	 if(estado){
	 	menu.animate({
	 		'left' : '0px',
	 	});

	 }else{

	 	menu.animate({
	 		'left' : '-320px',
	 	});


	 }

}

function ajustarImagen(){

	$('img[ajustable]').each(function(){

		var imgAncho =parseInt($(this).get(0).naturalWidth);
		var imgAlto = parseInt($(this).get(0).nagturalHeight);
		var ancho = parseInt($(this).parent().outerWidth());
		var alto = parseInt($(this).parent().outerHeight());

		var proporcion = ancho / alto;
		var imgProporcion = imgAncho / imgAlto;

		if ( imgProporcion > proporcion ) {
			$(this).addClass('h_100').removeClass('w_100');
		} else{
			$(this).addClass('w_100').removeClass('h_100');


		}


	});

}

function moverCarousel( posicion ) {

	var carousel = $('#carousel');
	var elemento = carousel.find('.main_block').eq(posicion);
	var indicator = $('#main-carousel-indicator i');

	carousel.animate({

		'left': -elemento.position().left, 

	});

	indicator.animate({

		'left': $('#main-carousel-indicator span').eq( posicion ).position().left,

	});

}

function ocultarBusqueda( estado ){
	if (estado) {
		$('#search-bar').fadeIn();
	}else {
		$('#search-bar').fadeOut();

	}
}

function popup( estado, id_popup ) {
	if (estado) {
		$(id_popup).fadeIn();


	}else {
		$(id_popup).fadeOut();

	}
}





(function($) {

	$.fn.parallax = function(){
		return this.each( function() {
			var _this = $(this);
			var offset_top = _this.offset().top;
			var parent_offset_top = _this.parent().offset().top;
			var parent_height = _this.parent().outerHeight();
			var window_height = $(window).height();
			var elem_size = $(window).height();

			if ( parent_height > window_height - 100 ) {
				elem_size = parseFloat(parent_height) * 1.15;
			}
			var diferencia = elem_size - parent_height;

			_this.parent().css({
				'position': 'relative',
				'overflow': 'hidden',

			});

			_this.css({

				'height': elem_size,
				'position': 'absolute',
				'top': -(diferencia/2),

			});

			var min_top = parent_offset_top - window_height;
			var max_top = (parent_offset_top + parent_height + window_height);

			var x1 = 0, x2 = 0, y1 = 0, y2 = 0, y = 0, m = 0; x = 0;

			y2 = -(diferencia/2);
			y1 = parent_height * 0.7;
			x2 = parent_offset_top - ( (window_height - parent_height)/2);
			x1 = max_top;

			m = (y2 - y1)/(x2 - x1);
			$(window).scroll( function(){

				x = $(window).scrollTop();

				if (x >= min_top && x <=max_top){

					y = (m * (x - x1) + y1);

					_this.css({
						'top': y,
					});

				}
			});

		});
	}


})(jQuery);