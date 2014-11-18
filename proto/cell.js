window.life.cell = function(controller) {
	var cell = this;

	var _id         = controller.getNextCellId();
	var _generation = null;
	var _siblings   = [];

	//

	cell.init = function(generation) {
		_generation = generation || 0;
	};

	cell.tick = function(tick) {

	};

	cell.getId = function() {
		return _id;
	};

	cell.getGeneration = function() {
		return _generation;
	};

	cell.addSibling = function(sibling) {
		_siblings.push(sibling);
	};

	cell.getSiblings = function() {
		return _siblings;
	};

	cell.hasNeighbour  = function(cell) {

	};

	cell.getNeighbours = function() {

	};

	cell.getFood       = function() {

	};

	cell.provideFood   = function(amount) {

	};

};