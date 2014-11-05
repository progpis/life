window.life.Creature = function(
	_controller,
	_options,
	_i
) {

	// private properties

	var _ = inherit(
		{
			i                      : null,
			dna                    : {
				energy             : {
					default        : null,
					max            : null,
					consumption    : null
				},
				sight              : {
					range          : null
				},
				food               : {
					seek_threshold : null
				}
			},
			state                  : {
				alive              : null,
				energy             : {
					current        : null
				}
			}
		},
		_options,
		{
			i: _i
		}
	);
	
	var _breed;
	var _cell;
	var _ai;

	// constructor

	function init(breed, cell, dna, ai_class) {
		_breed                = breed;
		_cell                 = cell;

		_.dna                  = dna;
		_.state.alive          = true;
		_.state.energy.current = _.dna.energy.default;

		_ai = _controller.newCreatureAi(ai_class);
		_ai.init(this, _.state);

		_controller.event('creature.inited');
	}

	// private methods

	function _consumeEnergy() {
		_.state.energy.current -= _.dna.energy.consumption;
		if (_.state.energy.current < 1) {
			_.state.alive = false;
		}
	}

//	function _considerMoving() {
//		if (_cell.currentFood() < 10) {
//			var dx = rand(-1, 1);
//			var dy = rand(-1, 1);
//			var cell_xy = _cell.xy();
//			if (_controller.board().hasCell(cell_xy.x+dx, cell_xy.y+dy)) {
//				_cell = _controller.board().cell(cell_xy.x+dx, cell_xy.y+dy);
//			}
//		}
//	}

	// public methods

	function tick(tick) {
		_consumeEnergy();
		if (!_.state.alive) {
			die();
			return;
		}

		_ai.tick(tick);
	}

	function breed() {
		return _breed;
	}

	function cell() {
		return _cell;
	}

	function energyMax() {
		return _.dna.energy.max;
	}

	function energyCurrent() {
		return _.state.energy.current;
	}

	function sightRange() {
		return _.dna.sight.range;
	}

	function state() {
		return _.state;
	}

	function moveTo(cell) {
		var xy = cell.xy();
		if (_controller.board().hasCell(xy.x, xy.y)) {
			_cell = _controller.board().cell(xy.x, xy.y);
		}
	}

	function die() {
		_.state.alive = false;
		_breed.killCreature(_.i);
		return !_.state.alive;
	}

	function eat() {
		var food = _cell.provideFood(2);
		incEnergy(food);
		return food;
	}

	function incEnergy(food) {
		var orig = _.state.energy.current;
		_.state.energy.current += food;
		if (_.state.energy.current > _.dna.energy.max) {
			_.state.energy.current = _.dna.energy.max;
		}
		return _.state.energy.current - orig;
	}

	// interface

	return {
		init          : init,
		tick          : tick,
		breed         : breed,
		cell          : cell,
//		state         : state,
		energy        : {
			max       : energyMax,
			current   : energyCurrent
		},
		sightRange    : sightRange,
		moveTo        : moveTo,
		die           : die,
		eat           : eat,
		incEnergy     : incEnergy
	};
};

