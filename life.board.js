window.life.Board = function(
	__controller,
	__options
) {

	// private properties

	var _ = {
		controller : null,
		radius     : null,
		cells      : null
	};

	// private methods

	function _createCells(radius) {
		var x, y;
		var gen     = 0;
		var i       = 0;
		var max_gen = 0;

		_.cells = [];

		for (x = -radius; x <= radius; x++) {
			_.cells[x] = [];
			for (y = -radius; y <= radius; y++) {
				gen = Math.abs(x) + Math.abs(y);
				max_gen = (gen > max_gen ? gen : max_gen);
				_.cells[x][y] = _.controller.newCell(x, y, gen);
			}
		}

		for (gen = 0; gen <= max_gen; gen++) {
			foreach2(_.cells, function(cell) {
				if (cell.gen() > gen) return;
				cell.init(i++);
			});
		}
	}

	// public methods

	function init() {
		_createCells.call(this, _.radius);
		_.controller.event(this, 'board.inited');
	}

	function radius() {
		return _.radius;
	}

	function cells() {
		return _.cells;
	}

	function hasCell(x, y) {
		return (
			undefined !== _.cells[x] && undefined !== _.cells[x][y]
		);
	}

	function cell(x, y) {
		if (!hasCell(x, y)) return null;
		return _.cells[x][y];
	}

	function tick(tick) {
		foreach2(_.cells, function(cell) {
			cell.tick(tick);
		});
	}

	// constructor

	_.controller = __controller;
	_.radius     = __options.radius;

	// interface

	return {
		init    : init,
		radius  : radius,
		hasCell : hasCell,
		cell    : cell,
		cells   : cells,
		tick    : tick
	};
};
