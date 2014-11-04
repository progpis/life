window.life.Controller = function(
	__options
) {

	// private properties

	var _ = {
		options : null,
		comps   : {
			ticker            : null,
			board             : null,
			animalia          : null,
			canvas            : null,
			renderer          : null
		}
	};

	// constructor

	var self  = this;
	_.options = __options;

	// private methods

	function _on(type, event) {
		var self = this;
		switch(type){

			case 'tick' :
				_.comps.board.tick(event.tick);
				_.comps.animalia.tick(event.tick);
				_.comps.renderer.render();
				break;

			default :
				break;
		}
	}

	// public methods

	function init() {

		_.comps.ticker            = new life.Ticker           (this, _.options.ticker);
		_.comps.board             = new life.Board            (this, _.options.board);
		_.comps.animalia          = new life.Animalia         (this, _.options.animalia);
		_.comps.canvas            = new life.Canvas           (this, _.options.canvas);
		_.comps.renderer          = new life.Renderer         (this, _.options.renderer);

		_.comps.ticker.init();
		_.comps.board.init();
		_.comps.animalia.init(_.comps.board.radius(), _.options.breeds);
		_.comps.canvas.init(_.comps.board.radius());
		_.comps.renderer.init(_.comps.canvas, _.comps.board.radius());
	}

	function ticker() {
		return _.comps.ticker;
	}

	function board() {
		return _.comps.board;
	}

	function animalia() {
		return _.comps.animalia;
	}

	function canvas() {
		return _.comps.canvas;
	}

	function renderer() {
		return _.comps.renderer;
	}

	function start() {
		_.comps.renderer.render();
		_.comps.ticker.start();
	}

	function event(obj, type, event) {
		_on(type, extend({ self: obj}, event || {}));
	}

	function newCell(x, y, gen) {
		return new life.Cell(this, _.options.cell, x, y, gen);
	}

	function newCreatureAi(ai_class) {
		if ('function' !== typeof life[ai_class]) return false;
		return new life[ai_class](this, _.options.cell_ai);
	}

	function newBreed(breed_conf, i) {
		return new life.Breed(this, _.options.breed, breed_conf, i);
	}

	function newCreature(i) {
		return new life.Creature(this, _.options.creature, i);
	}

	function newCellRenderer() {
		return new life.CellRenderer(this, _.options.cell_renderer);
	}

	function newCreatureRenderer() {
		return new life.CreatureRenderer(this, _.options.creature_renderer);
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

