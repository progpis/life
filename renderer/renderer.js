window.life.Renderer = function(
	_controller,
	_options
	) {

	// private properties

	var _ = inherit(
		{
			board_radius      : null,
			cell_renderer     : null,
			creature_renderer : null
		},
		_options
	);

	var _canvas;

	// constructor

	function init(canvas, board_radius) {
		_canvas = canvas;
		_.board_radius = board_radius;
		_initRenderers();
		_controller.event('renderer.inited');
	}

	// private methods

	function _initRenderers() {
		_.cell_renderer     = _controller.newCellRenderer();
		_.creature_renderer = _controller.newCreatureRenderer();

		_.cell_renderer.init(_canvas, _.board_radius);
		_.creature_renderer.init (_canvas, _.board_radius);
	}

	function _renderCells() {
		foreach2(_controller.board().cells(), function(cell) {
			_.cell_renderer.render(cell);
		});

	}

	function _renderCreatures() {
		foreach(_controller.animalia().breeds(), function(breed) {
			foreach(breed.creatures(), function(creature) {
				_.creature_renderer.render(creature);
			});
		});
	}

	// public methods

	function render() {
		_canvas.clear();
		_renderCells();
		_renderCreatures();
	}

	// interface

	return {
		init   : init,
		render : render
	};
};