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

		var cell1 = new life.cell(controller);
		cell1.init();
		cell1.setParent(_root);
		_root.addChild(cell1);
		_cells.push(cell1);

		var cell2 = new life.cell(controller);
		cell2.init();
		cell2.setParent(_root);
		_root.addChild(cell2);
		_cells.push(cell2);

		cell1.addSibling(cell2);
		cell2.addSibling(cell1);
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