window.life.CreatureAi = function(
	_controller,
    _options
) {

	// private properties

	var _ = inherit(
		{
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
		_options
	);

	var _creature;

	// constructor

	function init(creature, state) {
		_creature = creature;
		_.dna = creature.breed().copyDna();
		_.state = state;
		_controller.event(this, 'creature_ai.inited');
	}

	// private methods

	function _eat() {
		if (_.state.energy.current >= _.dna.energy.max) return;
		_creature.eat();
	}

	function _seekFood() {
		var food;
		var best_cell = null;
		var max_food = _creature.cell().currentFood();
		var xy = _creature.cell().xy();
		var neighbours = _creature.cell().neighbours(xy.x, xy.y);
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
		_creature.moveTo(best_cell);
	}

	// public methods

	function tick(tick) {

		_eat();

		if (_creature.cell().currentFood() <= _.dna.food.seek_threshold) _seekFood();

	}

	// interface

	return {
		init : init,
		tick : tick
	};

};