window.life.board = function(controller) {
	var board = this;

	var _radius = 1;
	var _root;
	var _cells = [];

	function _init(radius) {
		_radius = radius || _radius;

		_root = new life.cell(controller);
		_root.init();
		_cells.push(_root);

		var cell = new life.cell(controller);
		cell.init();
		cell.setParent(_root);
		_cells.push(cell);

		var cell = new life.cell(controller);
		cell.init();
		cell.setParent(_root);
		_cells.push(cell);

	}

	function _tick(tick) {

	}

	function _getRadius() {
		return _radius;
	}

	function _getRootCell() {
		return _root;
	}

	function _getCells() {
		return _cells;
	}

	//

	board.init        = _init;
	board.tick        = _tick;
	board.getRadius   = _getRadius;
	board.getRootCell = _getRootCell;
	board.getCells    = _getCells;

};