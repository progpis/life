window.life.ticker = function(controller) {
	var ticker = this;

	var _interval = 1000;
	var _tick = 0;
	var _timer;

	function _init(interval) {
		_interval = interval || _interval;
	}

	function _start() {
		_timer = setInterval(function() {
			_tick++;
			controller.event({ obj: ticker, type: 'tick', tick: _tick });
		}, _interval);
	}

	function _stop() {
		clearInterval(_timer);
		_timer = null;
	}

	function _setInterval(interval) {
		_interval = interval;
	}

	//

	ticker.init        = _init;
	ticker.start       = _start;
	ticker.stop        = _stop;
	ticker.setInterval = _setInterval;
};