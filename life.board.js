window.life.Board = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			radius : null
		},
		_options
	);

	var _cells;

	// constructor

	function init() {
		_createCells.call(this, _.radius);
		_controller.event(this, 'board.inited');
	}

	// private methods

	function _createCells(radius) {
		var x, y;
		var gen     = 0;
		var i       = 0;
		var max_gen = 0;

		_cells = [];

		for (x = -radius; x <= radius; x++) {
			_cells[x] = [];
			for (y = -radius; y <= radius; y++) {
				gen = Math.abs(x) + Math.abs(y);
				max_gen = (gen > max_gen ? gen : max_gen);
				_cells[x][y] = _controller.newCell(x, y, gen);
			}
		}

		for (gen = 0; gen <= max_gen; gen++) {
			foreach2(_cells, function(cell) {
				if (cell.gen() > gen) return;
				cell.init(i++);
			});
		}
	}

	// public methods

	function radius() {
		return _.radius;
	}

	function cells() {
		return _cells;
	}

	function hasCell(x, y) {
		return (
			undefined !== _cells[x] && undefined !== _cells[x][y]
		);
	}

	function cell(x, y) {
		if (!hasCell(x, y)) return null;
		return _cells[x][y];
	}

	function tick(tick) {
		foreach2(_cells, function(cell) {
			cell.tick(tick);
		});
	}

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
