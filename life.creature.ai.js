window.life.CreatureAi = function(
	__controller,
    __options
) {

	// private properties

	var _ = {
		controller : null,
		creature   : null,
		dna        : extend({}, life.struct.dna),
		state      : extend({}, life.struct.state)
	};

	// constructor

	_.controller = __controller;

	function init(creature, state) {
		_.creature = creature;
		_.dna = creature.breed().copyDna();
		_.state = state;
		_.controller.event(this, 'creature_ai.inited');
	}

	// private methods

	function _eat() {
		if (_.state.energy.current >= _.dna.energy.max) return;
		_.creature.eat();
	}

	function _seekFood() {
		var food;
		var best_cell = null;
		var max_food = _.creature.cell().currentFood();
		var xy = _.creature.cell().xy();
		var neighbours = _.creature.cell().neighbours(xy.x, xy.y);
		var br = false;
		foreach(neighbours, function(cell) {
			if (br) return;
			food = cell.currentFood();
			if (food > max_food) {
				max_food = food;
				best_cell = cell;
				if (1 == rand(1,10)) br = true;
			}
		});
		if (null === best_cell) {
			best_cell = neighbours[rand(0, neighbours.length-1)];
		}
		_.creature.moveTo(best_cell);
	}

	// public methods

	function tick(tick) {

		_eat();

		if (_.creature.cell().currentFood() <= _.dna.food.seek_threshold) _seekFood();

	}

	// interface

	return {
		init : init,
		tick : tick
	};

};