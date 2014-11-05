window.life.Cell = function(
	_controller,
	_options,
	_x,
	_y,
	_gen
) {

	// private properties

	var _ = inherit(
		{
			inited      : null,
			x           : null,
			y           : null,
			gen         : null,
			i           : null,
			food        : {
				max        : null,
				default    : null,
				rand       : null,
				grow_ticks : null,
				delta      : null,
				current    : null
			}
		},
		_options,
		{
			inited: false,
			x: _x,
			y: _y,
			gen: _gen
		}
	);

	// constructor

	function init(i) {
		if (_.inited) return;
		_.inited = true;

		_.i = i;
		_.food.current = parseInt(_initFood.call(this));

		_controller.event(_intf, 'cell.inited');
	}

	// private methods

	function _initFood() {
		var food;
		var self = this;
		var neighbours = getNeighbours(1)
		var total_food = 0;
		var count = 0;

		foreach(neighbours, function(cell) {
			if (cell.gen() >= _.gen) return;
			total_food += cell.currentFood();
			count++;
		});

		if (count > 0) {
			food = Math.floor(total_food / count) + rand(-_.food.rand, _.food.rand);
			if (food < 0) food = 0;
			if (food > _.food.max) food = _.food.max;
			return food;
		} else {
			return _.food.default;
		}
	}

	// public methods

	function provideFood(amount) {
		amount = parseInt(amount);
		if (_.food.current >= amount) {
			_.food.current = _.food.current - amount;
		} else {
			amount = _.food.current;
			_.food.current = 0;
		}
		return amount;
	}

	function tick(tick) {
	}

	function getNeighbours(radius) {
		return _controller.board().getCellNeighbours(_intf, radius);
	}

//	function neighbours(x, y, radius) {
//		var dx, dy, x1, y1;
//		var board = _controller.board();
//		var cells = [];
//		radius = radius || 1;
//		for (dx = -radius; dx <= radius; dx++) {
//			for (dy = -radius; dy <= radius; dy++) {
//				x1 = x + dx;
//				y1 = y + dy;
//				if (x === x1 && y === y1) continue;
//				if (!board.hasCell(x1, y1)) continue;
//				cells.push(board.cell(x1, y1));
//			}
//		}
//		return cells;
//	}

	function currentFood() {
		return _.food.current;
	}

	function maxFood() {
		return _.food.max;
	}

	function xy() {
		return {x: _.x, y: _.y};
	}

	function gen() {
		return _.gen;
	}

	function toString() {
		return 'Cell [i: ' + _.i + ', x: ' + _.x + ', y: ' + _.y + ', gen: ' + _.gen + ', food: ' + _.food.current + ']';
	}

	// interface

	var _intf = {
		init        : init,
		tick        : tick,
		xy          : xy,
		gen         : gen,
//		neighbours  : neighbours,
		provideFood : provideFood,
		currentFood : currentFood,
		maxFood     : maxFood,
		toString    : toString,
		getNeighbours: getNeighbours
	};

	return _intf;

};
