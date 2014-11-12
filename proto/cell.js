window.life.cell = function(controller) {
	var cell = this;

	var _id = controller.getNextCellId();
	var _parent;
	var _children = [];

	function _init() {

	}

	function _tick(tick) {

	}

	function _getId() {
		return _id;
	}

	function _setParent(parent) {
		_parent = parent;
		parent.addChild(cell);
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

	cell.init          = _init;
	cell.tick          = _tick;
	cell.getId         = _getId;

	cell.setParent     = _setParent;
	cell.getParent     = _getParent;
	cell.addChild      = _addChild;
	cell.getChildren   = _getChildren;

	cell.hasNeighbour  = function(cell) {};
	cell.getNeighbours = function() {};
	cell.getFood       = function() {};
	cell.provideFood   = function(amount) {};

};