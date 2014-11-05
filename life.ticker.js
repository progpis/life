window.life.Ticker = function(
	_controller,
<<<<<<< HEAD
    _options
) {
=======
	_options
) {

>>>>>>> FETCH_HEAD
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

<<<<<<< HEAD
	// constructor
	
	function init() {
		_controller.event('ticker.inited');
	}

	// private methods
	
	// public methods

=======
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

>>>>>>> FETCH_HEAD
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
<<<<<<< HEAD
	
=======

	// interface

>>>>>>> FETCH_HEAD
	return {
		init  : init,
		start : start,
		stop  : stop
	};
<<<<<<< HEAD
	
};
=======
};
>>>>>>> FETCH_HEAD
