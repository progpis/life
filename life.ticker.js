window.life.Ticker = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			interval   : null,
			tick       : null,
			timer      : null
		},
		{
			interval   : 1000,
			tick       : 0
		},
		_options
	);

	// constructor

	function init() {
		_controller.event('ticker.inited');
	}

	// private methods

	// public methods

	function start() {
		var self = this;
		_.timer = setInterval(function() {
			_.tick++;
			_controller.event(self, 'tick', {tick: _.tick});
		}, _.interval);
	}

	function stop() {
		clearInterval(_.timer);
		_.timer = null;
	}

	// interface

	return {
		init  : init,
		start : start,
		stop  : stop
	};
};
