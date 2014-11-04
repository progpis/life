;(function(window, undefined) {

window.inherit = function() {
	var target = {};
	var s, i;
	for (s = 0; s<arguments.length; s++) {
		for (i in arguments[s]) {
			if (!arguments[s].hasOwnProperty(i)) continue;
			if ('object' === typeof arguments[s][i]) {
				target[i] = window.inherit(arguments[s][i]);
			} else {
				target[i] = arguments[s][i];
			}
		}
	}
	return target;
};

window.extend = function(target, source) {
	target = target || {};
	for (var prop in source) {
		if (typeof source[prop] === 'object') {
			target[prop] = window.extend(target[prop], source[prop]);
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
};

window.clone = function(source) {
	return window.extend({}, source);
};

window.foreach = function(list, callback) {
	var count = 0;
	var i;
	for (i in list) {
		if (!list.hasOwnProperty(i)) continue;
		'function' === typeof callback && callback(list[i], i);
		count++;
	}
	return count;
};

window.foreach2 = function(list, callback) {
	var i, j;
	list = list || [];
	for (i in list) {
		if (!list.hasOwnProperty(i)) continue;
		list[i] = list[i] || [];
		for (j in list[i]) {
			if (!list[i].hasOwnProperty(j)) continue;
			callback(list[i][j], i, j);
		}
	}
};

window.rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.life = {};

})(window);
