window.life.Ticker = function(
	_controller,
	_options
) {

	// private properties
	
	var _ = inherit(
		{
			interval   : null,
			tick       : null
		},
		_options,
		{
			tick: 0
		}
	);

	var _timer;

	// constructor
	
	function init() {
		_controller.event('ticker.inited');
	}

	// private methods
	
	// public methods

	function start() {
		var self = this;
		_timer = setInterval(function() {
			_.tick++;
			_controller.event(self, 'tick', {tick: _.tick});
		}, _.interval);
	}
	
	function stop() {
		clearInterval(_timer);
		_timer = null;
	}

	// interface

	return {
		init  : init,
		start : start,
		stop  : stop
	};

};

