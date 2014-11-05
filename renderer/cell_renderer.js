window.life.CellRenderer = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			background      : {
				color       : {
					min     : null,
					max     : null
				}
			},
			show            : {
				food_number : true
			},
			board_radius    : null
		},
		_options
	);
	
	var _canvas = null;

	// constructor

	function init(canvas, board_radius) {
		_canvas = canvas;
		_.board_radius = board_radius;
		_controller.event(this, 'cell_renderer.inited');
	}

	// private methods

	function _drawCell(cell) {
		var props   = _canvas.cell();
		var cell_xy = cell.xy();
		var x       = props.offset_x + cell_xy.x * props.width - props.width/2;
		var y       = props.offset_y + cell_xy.y * props.height - props.height/2;
		var ctx     = _canvas.context();
		var bg_col  = _backgroundColor(cell);

		ctx.fillStyle = bg_col;
		ctx.strokeStyle = '#003300';
		ctx.fillRect(x, y, props.width, props.height);
		ctx.strokeRect(x, y, props.width, props.height);
	}

	function _drawText(cell, text) {
		var props   = _canvas.cell();
		var cell_xy = cell.xy();
		var x       = props.offset_x + cell_xy.x * props.width;
		var y       = props.offset_y + cell_xy.y * props.height;
		var ctx     = _canvas.context();

		ctx.font = "10px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#6c6';
		ctx.fillText(text, x, y+3);
	}

	function _backgroundColor(cell) {
		var col_min  = _.background.color.min;
		var col_max  = _.background.color.max;
		var food_max = cell.maxFood();
		var food_cur = cell.currentFood();
		var color    = Math.floor((col_max-col_min) * food_cur / food_max + col_min);
		return '#00'+ (color.toString(16)) +'00';
	}

	// public methods

	function render(cell) {
		_drawCell.call(this, cell);
		_.show.food_number && _drawText.call(this, cell, cell.currentFood());
	}

	// interface

	return {
		init   : init,
		render : render
	};
};


