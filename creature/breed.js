window.life.Breed = function(
	_controller,
	_options,
	_breed_conf,
	_i
) {

	// private properties

	var _ = inherit(
		{
			i                      : null,
			color                  : null,
			pop                    : null,
			start_x                : null,
			start_y                : null,
			dna: {
				energy             : {
					default        : null,
					max            : null,
					consumption    : null
				},
				sight              : {
					range          : null
				},
				food: {
					seek_threshold : null
				}
			},
			ai_class               : null
		}, {
			dna: {
				energy: {
					default: 10,
					max: 10,
					consumption: 1
				},
				sight: {
					range: 1
				},
				food: {
					seek_threshold : 30
				}
			}
		},
		_options,
		_breed_conf
	);
	
	var _creatures;

	// constructor

	function init(x, y) {
		_.i = _i;
		_.start_x = x;
		_.start_y = y;

		_createCreatures.call(this);
		_initCreatures.call(this);

		_controller.event('breed.inited');
	}

	// private methods

	function _createCreatures() {
		var i;
		_creatures = {};
		for (i = 1; i <= _.pop; i++) {
			_creatures[i] = _controller.newCreature(i);
		}
	}

	function _initCreatures() {
		var x, y, cell;
		var self = this;
		var j = 0;
		foreach(_creatures, function(creature, i) {
			cell = _controller.board().cell(_.start_x, _.start_y);
			if (null === cell) return;
			creature.init(self, cell, inherit(_.dna), _.ai_class);
		});
	}

	// public methods

	function copyDna() {
		return extend({}, _.dna);
	}

	function creatures() {
		return _creatures;
	}

	function creature(i) {
		return _creatures[i];
	}

	function killCreature(i) {
		delete _creatures[i];
	}

	function color() {
		return _.color;
	}

	function tick(tick) {
		foreach(_creatures, function(creature) {
			creature.tick(tick);
		});
	}

	// interface

	return {
		init              : init,
		creature          : creature,
		creatures         : creatures,
		killCreature      : killCreature,
		color             : color,
		tick              : tick,
		copyDna           : copyDna
	};

};
