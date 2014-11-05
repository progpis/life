window.life.Controller = function(_options) {

	// private properties

	var _ = inherit(
		{
			ticker            : null,
			board             : null,
			animalia          : null,
			breed             : null,
			breeds            : null,
			creature          : null,
			canvas            : null,
			renderer          : null,
			cell_renderer     : null,
			creature_renderer : null,
			creature_ai       : null
		},
		_options
	);

	var _ticker;
	var _board;
	var _animalia;
	var _canvas;
	var _renderer;

	// constructor

	var self  = this;

	function init() {
		_ticker   = new life.Ticker   (this, _.ticker);
		_board    = new life.Board    (this, _.board);
		_animalia = new life.Animalia (this, _.animalia);
		_canvas   = new life.Canvas   (this, _.canvas);
		_renderer = new life.Renderer (this, _.renderer);

		_ticker.init();
		_board.init();
		_animalia.init(_board.radius(), _.breeds);
		_canvas.init(_board.radius());
		_renderer.init(_canvas, _board.radius());
	}

	// private methods

	function _on(type, event) {
		var self = this;
		switch(type){

			case 'tick' :
				_board.tick(event.tick);
				_animalia.tick(event.tick);
				_renderer.render();
				break;

			default :
				break;
		}
	}

	// public methods

	function ticker() {
		return _ticker;
	}

	function board() {
		return _board;
	}

	function animalia() {
		return _animalia;
	}

	function canvas() {
		return _canvas;
	}

	function renderer() {
		return _renderer;
	}

	function start() {
		_renderer.render();
		_ticker.start();
	}

	function event(obj, type, event) {
		_on(type, extend({ self: obj}, event || {}));
	}

	function newCell(x, y, gen) {
		return new life.Cell(this, _.cell, x, y, gen);
	}

	function newCreatureAi(ai_class) {
		if ('function' !== typeof life[ai_class]) return false;
		return new life[ai_class](this, _.creature_ai);
	}

	function newBreed(breed_conf, i) {
		return new life.Breed(this, _.breed, breed_conf, i);
	}

	function newCreature(i) {
		return new life.Creature(this, _.creature, i);
	}

	function newCellRenderer() {
		return new life.CellRenderer(this, _.cell_renderer);
	}

	function newCreatureRenderer() {
		return new life.CreatureRenderer(this, _.creature_renderer);
	}

	return {

		ticker               : ticker,
		board                : board,
		animalia             : animalia,
		canvas               : canvas,
		renderer             : renderer,

		init                 : init,
		start                : start,
		event                : event,

		newCell              : newCell,
		newBreed             : newBreed,
		newCreature          : newCreature,
		newCreatureAi        : newCreatureAi,
		newCellRenderer      : newCellRenderer,
		newCreatureRenderer  : newCreatureRenderer

	};

};

