window.life.CreatureRenderer = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
		},
		_options
	);

	var _canvas;

	// constructor

	function init(canvas) {
		_canvas = canvas;
		_controller.event(this, 'creature_renderer.inited');
	}

	// private methods

	function _drawCircular(creature, max, current, color, radius_delta) {
		var props  = _canvas.cell();
		var cell_xy = creature.cell().xy();
		var x      = props.offset_x + cell_xy.x * props.width;
		var y      = props.offset_y + cell_xy.y * props.height;
		var r      = props.radius - (radius_delta || 0);
		var r2     = creature.sightRange() * 3 * props.radius;
		var ctx    = _canvas.context();

		ctx.beginPath();
		ctx.arc(x, y, r2, 0, 2*Math.PI);
		ctx.strokeStyle = '#999';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, r-1, 0, 2*Math.PI);
		ctx.strokeStyle = '#999';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, r,
			-0.5*Math.PI + (2*Math.PI - (2*Math.PI/max * current)),
			1.5*Math.PI
		);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	function _drawText(creature, text) {
		var props  = _canvas.cell();
		var cell_xy = creature.cell().xy();
		var x      = props.offset_x + cell_xy.x * props.width;
		var y      = props.offset_y + cell_xy.y * props.height;
		var ctx    = _canvas.context();

		ctx.font = "10px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = '#000';
		ctx.fillText(text, x, y+3);
	}

	// public methods

	function render(creature) {
		_drawCircular.call(this,
			creature,
			creature.energy.max(),
			creature.energy.current(),
			creature.breed().color()
		);
	}

	// interface

	return {
		init   : init,
		render : render
	}
};
