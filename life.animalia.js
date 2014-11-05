window.life.Animalia = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			board_radius : null,
			count        : null
		},
		_options
	);
	
	var _breeds;

	// controller

	function init(board_radius, breeds_list) {
		_.board_radius = board_radius;
		_.count = foreach(breeds_list);

		_createBreeds.call(this, breeds_list);
		_initBreeds.call(this);

		_controller.event('animalia.inited');
	}

	// private methods

	function _createBreeds(breeds_list) {
		var x, y;
		var i = 1;
		_breeds = {};
		foreach(breeds_list, function(breed_conf) {
			_breeds[i] = _controller.newBreed(breed_conf, i);
			i++;
		});
	}

	function _initBreeds() {
		var x, y, pos;
		foreach(_breeds, function(breed, i) {
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

	function breeds() {
		return _breeds;
	}

	function tick(tick) {
		foreach(_breeds, function(breed) {
			breed.tick(tick);
		});
	}

	// interface

	return {
		init   : init,
		breeds : breeds,
		tick   : tick
	};
};


