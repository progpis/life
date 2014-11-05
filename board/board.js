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
		_createCells.call(_intf, _.radius);
		_controller.event(_intf, 'board.inited');
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

	function getCellNeighbours(cell, radius) {
		var dx, dy, x1, y1;
		var cells = [];
		radius = radius || 1;
		var xy = cell.xy();
		var board_radius = _.radius;
		for (dx = -radius; dx <= radius; dx++) {
			for (dy = -radius; dy <= radius; dy++) {
				x1 = xy.x + dx;
				y1 = xy.y + dy;
				if (xy.x === x1 && xy.y === y1) continue;

				if (x1 > board_radius)  x1 = -board_radius + (x1 - board_radius) - 1;
				if (y1 > board_radius)  y1 = -board_radius + (y1 - board_radius) - 1;
				if (x1 < -board_radius) x1 =  board_radius - (board_radius - x1) + 1;
				if (y1 < -board_radius) y1 =  board_radius - (board_radius - y1) + 1;

				if (!hasCell(x1, y1)) continue;
				cells.push(_cells[x1][y1]);
			}
		}
		return cells;
	}

	function getCellNeighbour(cell, dx, dy) {
		var board_radius = _.radius;
		var xy = cell.xy();
		x1 = xy.x + dx;
		y1 = xy.y + dy;
		if (x1 > board_radius)  x1 = -board_radius + (x1 - board_radius) - 1;
		if (y1 > board_radius)  y1 = -board_radius + (y1 - board_radius) - 1;
		if (x1 < -board_radius) x1 =  board_radius - (board_radius - x1) + 1;
		if (y1 < -board_radius) y1 =  board_radius - (board_radius - y1) + 1;
		return _cells[x1][y1];
	}


	//

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

	var _intf = {
		init              : init,
		getCellNeighbour  : getCellNeighbour,
		getCellNeighbours : getCellNeighbours,

		radius  : radius,
		hasCell : hasCell,
		cell    : cell,
		cells   : cells,
		tick    : tick
	};

	return _intf;
};
