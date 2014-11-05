window.life.Canvas = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			id           : null,
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
		},
		_options
	);
	
	var _elem;
	var _ctx;

	// constructor

	function init(board_radius) {
		_.board_radius  = board_radius;
		_elem           = document.getElementById(_.id);
		_ctx            = _elem.getContext("2d");
		_.self_width    = _elem.width;
		_.self_height   = _elem.height;
		_.cell.width    = _.self_width / (_.board_radius * 2 + 1);
		_.cell.height   = _.self_height / (_.board_radius * 2 + 1);
		_.cell.radius   = (_.cell.width + _.cell.height) / 4 - 1;
		_.cell.offset_x = _.self_width / 2;
		_.cell.offset_y = _.self_height / 2;

		_controller.event(this, 'canvas.inited');
	}

	// private methods

	// public methods

	function context() {
		return _ctx;
	}

	function clear() {
		_ctx.save();
		_ctx.setTransform(1, 0, 0, 1, 0, 0);
		_ctx.clearRect(0, 0, _.self_width, _.self_height);
		_ctx.restore();
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
