window.life.Creature = function(
	__controller,
	__options,
	__i
) {

	// private properties

	var _ = {
		controller : null,
		i          : null,
		alive      : null,
		breed      : null,
		cell       : null,
		ai         : null,
		dna        : clone(life.struct.dna),
		state      : clone(life.struct.state)
	};

	// constructor

	_.controller = __controller;
	_.i          = __i;

	function init(breed, cell, ai_class) {
		_.breed                = breed;
		_.cell                 = cell;

		_.dna                  = _.breed.copyDna();
		_.state.alive          = true;
		_.state.energy.current = _.dna.energy.default;

		_.ai = _.controller.newCreatureAi(ai_class);
		_.ai.init(this, _.state);

		_.controller.event('creature.inited');
	}

	// private methods

	function _consumeEnergy() {
		_.state.energy.current -= _.dna.energy.consumption;
		if (_.state.energy.current < 1) {
			_.state.alive = false;
		}
	}

	function _considerMoving() {
		if (_.cell.currentFood() < 10) {
			var dx = rand(-1, 1);
			var dy = rand(-1, 1);
			var cell_xy = _.cell.xy();
			if (_.controller.board().hasCell(cell_xy.x+dx, cell_xy.y+dy)) {
				_.cell = _.controller.board().cell(cell_xy.x+dx, cell_xy.y+dy);
			}
		}
	}

	// public methods

	function tick(tick) {
		_consumeEnergy();
		if (!_.state.alive) {
			die();
			return;
		}

		_.ai.tick(tick);
	}

	function breed() {
		return _.breed;
	}

	function cell() {
		return _.cell;
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
		if (_.controller.board().hasCell(xy.x, xy.y)) {
			_.cell = _.controller.board().cell(xy.x, xy.y);
		}
	}

	function die() {
		_.state.alive = false;
		_.breed.killCreature(_.i);
		return !_.state.alive;
	}

	function eat() {
		var food = _.cell.provideFood(2);
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

