;(function(window, undefined) {

	// private properties

	var _ = {
		controller : null,
		interval   : null,
		timer      : null,
		tick       : null
	};

	// private methods

	// public methods

	function init() {
		_.controller.event('ticker.inited');
	}

	function start() {
		var self = this;
		_.timer = setInterval(function() {
			_.tick++;
			_.controller.event(self, 'tick', {tick: _.tick});
		}, _.interval);
	}

	function stop() {
		clearInterval(_.timer);
		_.timer = null;
	}

	// constructor

	var Ticker = function(controller, options) {
		_.controller = controller;
		_.interval   = options.interval;
		_.tick       = 0;
	};

	extend(Ticker.prototype, {
		init  : init,
		start : start,
		stop  : stop
	});

	window.life.Ticker = Ticker;

})(window);
