window.life.board = function(controller) {
	var board = this;

	var _radius = 1;
	var _root   = null;
	var _cells  = [];

	//

	function getGenerationCells(generation) {
		var i;
		var cells = [];
		for (i=0; i<_cells.length; i++) {
			if (_cells[i].getGeneration() != generation) continue;
			cells.push(_cells[i]);
		}
		return cells;
	}
	
	function connectSiblings(cell1, cell2) {
		if (!cell1 || !cell2) return;
		cell1.addSibling(cell2);
		cell2.addSibling(cell1);
	}

	function createRootCell() {
		_root = new life.cell(controller);
		_root.init();
		_cells.push(_root);
	}

	function createFirstGeneration() {
		var i, j, last_cell, cells, cell;
		last_cell = null;
		cells = [];
		for (j = 0; j < 6; j++) {
			cell = new life.cell(controller);
			cell.init(1);
			connectSiblings(cell, last_cell);
			cells.push(cell);
			_cells.push(cell);
			last_cell = cell;
		}
		connectSiblings(cells[0], cells[5]);
	}

	function createNextGeneration(generation) {
		var parents, i, j, parent, last_cell, cells, cell, total_ones, ones, c, mode;

		parents = getGenerationCells(generation - 1);
		last_cell = null;
		cells = [];

		total_ones = generation - 2;
		ones = 0;
		for (i = 0; i < parents.length; i++) {

			parent = parents[i];
			connectSiblings(parent, last_cell);

			if (ones < 1) {
				c = 2;
				ones = total_ones;
			} else {
				c = 1;
				ones--;
			}

			for (j = 0; j < c; j++) {
				cell = new life.cell(controller);
				cell.init(generation);
				connectSiblings(cell, last_cell);
				cells.push(cell);
				_cells.push(cell);
				last_cell = cell;
			}

		}

		connectSiblings(cells[0], last_cell);
		connectSiblings(parents[0], last_cell);
	}

	function createGeneration(generation) {
		switch(generation) {
			case 1  : createFirstGeneration();          break;
			default : createNextGeneration(generation); break;
		}
	}

	//

	board.init = function(radius) {
		_radius = radius || _radius;

		createRootCell();
		createGeneration(1);
		createGeneration(2);

//		var cell1 = new life.cell(controller);
//		cell1.init();
//		cell1.setParent(_root);
//		_root.addChild(cell1);
//		_cells.push(cell1);
//
//		var cell2 = new life.cell(controller);
//		cell2.init();
//		cell2.setParent(_root);
//		_root.addChild(cell2);
//		_cells.push(cell2);
//
//		cell1.addSibling(cell2);
//		cell2.addSibling(cell1);
	};

	board.tick = function(tick) {

	};

	board.getRadius = function() {
		return _radius;
	};

	board.getRootCell = function() {
		return _root;
	};

	board.getCells = function() {
		return _cells;
	}

};