window.life.Animalia = function(
	__controller,
	__options
) {

	// private properties

	var _ = {
		controller   : null,
		board_radius : null,
		count        : null,
		breeds       : null
	};

	// private methods

	function _createBreeds(breeds_list) {
		var x, y;
		var i = 1;
		_.breeds = {};
		foreach(breeds_list, function(breed_conf) {
			_.breeds[i] = _.controller.newBreed(breed_conf, i);
			i++;
		});
	}

	function _initBreeds() {
		var x, y, pos;
		foreach(_.breeds, function(breed, i) {
			pos = _breedStartingPosition(_.board_radius, _.count, i);
			pos[0] = Math.floor(pos[0]);
			pos[1] = Math.floor(pos[1]);
			breed.init(pos[0], pos[1]);
		});
	}

	function _breedStartingPosition(r, n, i) {
		n = parseInt(n);
		i = parseInt(i);
		var matrix = [
			[ [0, 0] ],
			[ [-r/3, -r/3], [r/3, r/3] ],
			[ [-r/2, -r/2], [r/2, r/2], [0, 0] ],
			[ [-r/2, -r/2], [r/2, r/2], [-r/2, r/2], [r/2, -r/2] ],
			[ [-r/2, -r/2], [r/2, r/2], [-r/2, r/2], [r/2, -r/2], [0, 0] ],
			[ [-r/2, -r/3], [0,-r/3], [r/2, -r/3], [-r/2, r/3], [0,r/3], [r/2, r/3] ]
		];
		return matrix[n-1][i-1];
	}

	// public methods

	function init(board_radius, breeds_list) {
		_.board_radius = board_radius;
		_.count = foreach(breeds_list);

		_createBreeds.call(this, breeds_list);
		_initBreeds.call(this);

		_.controller.event('animalia.inited');
	}

	function breeds() {
		return _.breeds;
	}

	function tick(tick) {
		foreach(_.breeds, function(breed) {
			breed.tick(tick);
		});
	}

	// controller

	_.controller = __controller;
	_.board_radius = null;
	_.count        = null;
	_.breeds       = null;

	// interface

	return {
		init   : init,
		breeds : breeds,
		tick   : tick
	};
};


