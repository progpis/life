window.life.cell = function(controller) {
	var cell = this;

	var _id = controller.getNextCellId();
	var _parent;
	var _children = [];
	var _siblings = [];

	function _init() {

	}

	function _tick(tick) {

	}

	function _getId() {
		return _id;
	}

	function _setParent(parent) {
		_parent = parent;
	}

	function _getParent() {
		return _parent;
	}

	function _addChild(child) {
		_children.push(child);
	}

	function _getChildren() {
		return _children;
	}

	function _addSibling(sibling) {
		_siblings.push(sibling);
	}

	function _getSiblings() {
		return _siblings;
	}

	cell.init          = _init;
	cell.tick          = _tick;
	cell.getId         = _getId;

	cell.setParent     = _setParent;
	cell.getParent     = _getParent;
	cell.addChild      = _addChild;
	cell.getChildren   = _getChildren;
	cell.addSibling    = _addSibling;
	cell.getSiblings   = _getSiblings;

	cell.hasNeighbour  = function(cell) {};
	cell.getNeighbours = function() {};
	cell.getFood       = function() {};
	cell.provideFood   = function(amount) {};

};