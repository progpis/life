window.life.Canvas = function(
	__controller,
	__options
) {

	// private properties

	var _ = {
		controller   : null,
		id           : null,
		elem         : null,
		ctx          : null,
		board_radius : null,
		self_width   : null,
		self_height  : null,
		cell         : {
			width    : null,
			height   : null,
			radius   : null,
			offset_x : null,
			offset_y : null
		}
	};

	// constructor

	_.controller = __controller;
	_.id         = __options.id;

	// private methods

	// public methods

	function init(board_radius) {
		_.board_radius  = board_radius;
		_.elem          = document.getElementById(_.id);
		_.ctx           = _.elem.getContext("2d");
		_.self_width    = _.elem.width;
		_.self_height   = _.elem.height;
		_.cell.width    = _.self_width / (_.board_radius * 2 + 1);
		_.cell.height   = _.self_height / (_.board_radius * 2 + 1);
		_.cell.radius   = (_.cell.width + _.cell.height) / 4 - 1;
		_.cell.offset_x = _.self_width / 2;
		_.cell.offset_y = _.self_height / 2;

		_.controller.event(this, 'canvas.inited');
	}

	function context() {
		return _.ctx;
	}

	function clear() {
		_.ctx.save();
		_.ctx.setTransform(1, 0, 0, 1, 0, 0);
		_.ctx.clearRect(0, 0, _.self_width, _.self_height);
		_.ctx.restore();
	}

	function cell() {
		return _.cell;
	}

	function toString() {
		return 'Canvas [id: '+ _.id+']';
	}

	// interface

	return {
		init    : init,
		context : context,
		clear   : clear,
		cell    : cell
	};

};
