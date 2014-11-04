window.life.Renderer = function(
	__controller,
	__options
	) {

	// private properties

	var _ = {
		controller        : null,
		canvas            : null,
		board_radius      : null,
		cell_renderer     : null,
		creature_renderer : null
	};

	// constructor

	_.controller = __controller;

	// private methods

	function _initRenderers() {
		_.cell_renderer     = _.controller.newCellRenderer();
		_.creature_renderer = _.controller.newCreatureRenderer();

		_.cell_renderer.init(_.canvas, _.board_radius);
		_.creature_renderer.init (_.canvas, _.board_radius);
	}

	function _renderCells() {
		foreach2(_.controller.board().cells(), function(cell) {
			_.cell_renderer.render(cell);
		});

	}

	function _renderCreatures() {
		foreach(_.controller.animalia().breeds(), function(breed) {
			foreach(breed.creatures(), function(creature) {
				_.creature_renderer.render(creature);
			});
		});
	}

	// public methods

	function init(canvas, board_radius) {
		_.canvas = canvas;
		_.board_radius = board_radius;
		_initRenderers();
		_.controller.event('renderer.inited');
	}

	function render() {
		_.canvas.clear();
		_renderCells();
		_renderCreatures();
	}

	// interface

	return {
		init   : init,
		render : render
	};
};