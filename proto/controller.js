window.life.controller = function() {
	var controller = this;

	var _registry = {};

	var _ticker = new life.ticker(controller);
	var _board  = new life.board(controller);
	var _fauna  = new life.fauna(controller);
	var _renderer = new life.renderer(controller);

	function _init() {

		_registry.cellId = 0;

		_ticker.init();
		_board.init();
		_fauna.init();
		_renderer.init('canvas', _board, _fauna);

//		_ticker.start();

		controller.event({ obj: controller, type: 'tick', tick: 0});
	}

	function _event(event) {
		console.log(event.type);
		switch(event.type) {
			case 'tick' :
				controller.tick(event.tick);
				break;
		}
	}

	function _tick(tick) {
		_board.tick(tick);
		_fauna.tick(tick);
		_renderer.tick(tick);
	}

	function _getNextCellId()
	{
		return _registry.cellId++;
	}

	//

	controller.init          = _init;
	controller.event         = _event;
	controller.tick          = _tick;
	controller.getNextCellId = _getNextCellId;
};