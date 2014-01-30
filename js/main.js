// JavaScript Document

/*  ==========================================================================
	http://kevin.vanzonneveld.net
	original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	input by: duncan
	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	bugfixed by: Nate
	input by: Brett Zamir (http://brett-zamir.me)
	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	improved by: Michael Grier
	bugfixed by: Brett Zamir (http://brett-zamir.me)
	note 1: The second argument, sort_flags is not implemented;
	note 1: also should be sorted (asort?) first according to docs
	example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
	returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
	example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
	returns 2: {a: 'green', 0: 'red', 1: 'blue'}
	*/
function array_unique(inputArr) {

	var key = '',
		tmp_arr2 = {},
		val = '';

	var __array_search = function (needle, haystack) {
		var fkey = '';
		for (fkey in haystack) {
			if (haystack.hasOwnProperty(fkey)) {
				if ((haystack[fkey] + '') === (needle + '')) {
					return fkey;
				}
			}
		}
		return false;
	};

	for (key in inputArr) {
		if (inputArr.hasOwnProperty(key)) {
			val = inputArr[key];
			if (false === __array_search(val, tmp_arr2)) {
				tmp_arr2[key] = val;
			}
		}
	}

	return tmp_arr2;
}

/*  ==========================================================================
	http://kevin.vanzonneveld.net
	original by: Webtoolkit.info (http://www.webtoolkit.info/)
	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	improved by: sowberry
	tweaked by: Jack
	bugfixed by: Onno Marsman
	improved by: Yves Sucaet
	bugfixed by: Onno Marsman
	bugfixed by: Ulrich
	bugfixed by: Rafal Kukawski
	improved by: kirilloid
	example 1: utf8_encode('Kevin van Zonneveld');
	returns 1: 'Kevin van Zonneveld'
*/
function utf8_encode(argString) { 

	if (argString === null || typeof argString === "undefined") {
		return "";
	}

	var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	var utftext = '',
	start, end, stringl = 0;

	start = end = 0;
	stringl = string.length;
	for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;

		if (c1 < 128) {
			end++;
		} else if (c1 > 127 && c1 < 2048) {
			enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
		} else {
			enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
		}
		if (enc !== null) {
			if (end > start) {
				utftext += string.slice(start, end);
			}
			utftext += enc;
			start = end = n + 1;
		}
	}

	if (end > start) {
		utftext += string.slice(start, stringl);
	}

	return utftext;
}

/*  ==========================================================================
	http://kevin.vanzonneveld.net
	original by: Webtoolkit.info (http://www.webtoolkit.info/)
	input by: Aman Gupta
	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	improved by: Norman "zEh" Fuchs
	bugfixed by: hitwork
	bugfixed by: Onno Marsman
	input by: Brett Zamir (http://brett-zamir.me)
	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	example 1: utf8_decode('Kevin van Zonneveld');
	returns 1: 'Kevin van Zonneveld'
*/
function utf8_decode(str_data) {

	var tmp_arr = [],
	i = 0,
	ac = 0,
	c1 = 0,
	c2 = 0,
	c3 = 0;

	str_data += '';

	while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if (c1 > 191 && c1 < 224) {
			c2 = str_data.charCodeAt(i + 1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}

	return tmp_arr.join('');
}

/*  ==========================================================================
	http://personal-de-jall.webcindario.com/articulos/pasar_variables.php
	input by  : José Antonio López Lorenzo
	example 1 : ?valor1&valor2
	returns 1 : ["valor1","valor2"]
	Devuelve un array con los valores introducidos en la URL
*/
function leerGET(){ 
	var cadGET = location.search.substr(1,location.search.length); 
	var arrGET = cadGET.split("&"); 
	return arrGET; 
}

/*  ==========================================================================
	http://www.etnassoft.com
	input by  : Carlos Benítez
	code 1    : return ret.join( '' );
	example 1 : normalize('Fábula de la cigüeña y el murciélago');
	returns 1 : Fabula de la ciguena y el murcielago
	code 2    : return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
	example 2 : normalize('Fábula de la cigüeña y el murciélago');
	returns 2 : fabula-de-la-ciguena-y-el-murcielago
*/
var normalize = (function() {
	var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
			to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
			mapping = {};
 
	for(var i = 0, j = from.length; i < j; i++ )
			mapping[ from.charAt( i ) ] = to.charAt( i );
 
	return function( str ) {
			var ret = [];
			for( var i = 0, j = str.length; i < j; i++ ) {
					var c = str.charAt( i );
					if( mapping.hasOwnProperty( str.charAt( i ) ) )
							ret.push( mapping[ c ] );
					else
							ret.push( c );
			}
			//return ret.join( '' );
			return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '_' ).toLowerCase();
	}
})();

/*  ==========================================================================
	Comprueba si un objeto esta vacio
*/
function isEmpty(objeto){
	for (var prop in objeto) { 
		if (objeto.hasOwnProperty(prop)) return false; 
	} 
	return true;
}

/*  ==========================================================================
	Validar si un numero 'n' es multiplo de otro 'v'
*/
function validar(n,v) {
	if( ( n % v ) == 0 )
		return true;
	else
		return false;
}

/*  ==========================================================================
	Retorna la cadena con el primer caracter de cada palabra en Mayusculas
*/
function primerMay(str) {
	var respuesta = '',
		trozos = str.split('_');
	
	for(var i in trozos) {
		var palabra = trozos[i].toLowerCase();
		palabra = palabra.substr(0, 1).toUpperCase() + palabra.substr(1);
		trozos[i] = palabra;
	}
	return trozos.join(' ');
}

/*  ==========================================================================
	TEXTOS
*/
var textos = new Array(
	{'es':'acabados','gb':'finishes','fr':'finitions'},
	{'es':'Español','gb':'English','fr':'Français'},
	{'es':'Combinar','gb':'Combine','fr':'Combiner'},
	{'es':'Materiales','gb':'Materials','fr':'Matériels'},
	{'es':'Idioma','gb':'Language','fr':'Langue'},
	{'es':'Atrás','gb':'Back','fr':'Arrière'}
);

/*  ==========================================================================
	DATOS MENU
*/
var materiales = new Array(
	{'es':'Laminado','gb':'Laminate','fr':'Mélamine'},
	{'es':'Estratificado','gb':'Stratified','fr':'Stratifié'},
	{'es':'Lacado','gb':'Lacquer','fr':'Lacquer'},
	{'es':'Chapado','gb':'Veneer','fr':'Plaqué'}
);

var acabados = new Array(
	{'es':'Brillo','gb':'Gloss','fr':'Lustre'},
	{'es':'Mate','gb':'Matt','fr':'Matt'},
	{'es':'Texturado','gb':'Textured','fr':'Textured'}
);

var menu = new Array(
	{'p':0,'m':0,'a':1},
	{'p':0,'m':0,'a':2},
	{'p':0,'m':1,'a':null},
	{'p':0,'m':2,'a':0},
	{'p':0,'m':2,'a':1},
	{'p':0,'m':3,'a':null}
);

//- CONSTRUYE EL MENU ----------------------------
function construyeMenu(valor,nivel) {
	var codi  = '',
		menu1 = new Array(),
		label = '',
		menuNivel = 0,
		menuValor = {},
		indexMenu = null;
	for(var i in menu)
	{
		if(nivel==1) {
			menuValor = menu[i].p;
			indexMenu = menu[i].m;
			menuNivel = materiales[indexMenu];
			listaMen  = $('#materials ul');
			franjaMen = $('#materials');
		}
		else if(nivel==2) {
			menuValor = menu[i].m;
			indexMenu = menu[i].a;
			menuNivel = acabados[indexMenu];
			listaMen  = $('#finishes ul');
			franjaMen = $('#finishes');
		}
		if(indexMenu != null) {
			if(menuValor == valor) { 
				if(idi=='gb') 
					label = menuNivel.gb;
				else if(idi=='fr') 
					label = menuNivel.fr;
				else
					label = menuNivel.es;
				menu1.push(label+'#'+indexMenu);
			}
		}
	}
	var menu2 = new Object(array_unique(menu1));
	
	if(!isEmpty(menu2)) {
		for(var i in menu2) {
			var trozos = menu2[i].split('#');
			codi += '<li id="#'+trozos[1]+'">'+trozos[0]+'</li>\n';
		}
		listaMen.html(codi);
		franjaMen.css('display','block');
		$('#colours').css('display','block');
	}
	else {
		franjaMen.css('display','none');
	}
};
