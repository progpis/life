window.life.renderer = function(controller) {
	var renderer = this;

	var _canvas = {};
	var _board;
	var _fauna;

	function _init(canvas_id, board, fauna) {

		_canvas.id     = canvas_id;
		_canvas.e      = document.getElementById(canvas_id);
		_canvas.ctx    = _canvas.e.getContext("2d");
		_canvas.width  = _canvas.e.width;
		_canvas.height = _canvas.e.height;
		_canvas.center = {
			x: Math.floor(_canvas.width/2),
			y: Math.floor(_canvas.height/2)
		};

		var board_radius = board.getRadius();
		var r = _canvas.width / (board_radius*2+1) / 2;
		var q = Math.sqrt(r*r - (r*r/4));
		_canvas.cell = {
			r: r,
			q: q
		};

		_board = board;
		_fauna = fauna;
	}

	function _tick(tick) {
		_clearCanvas();
		_renderBoard();
	}

	function _clearCanvas() {
		_canvas.ctx.save();
		_canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
		_canvas.ctx.clearRect(0, 0, _canvas.width, _canvas.height);
		_canvas.ctx.restore();
	}

	//

	function _renderBoard() {
		_drawBoardGuides();

		var root = _board.getRootCell();
		_renderCells(_canvas.center.x, _canvas.center.y);
	}

	function _getWalk() {
		return [
			{ x:                   0, y: -2*_canvas.cell.q },
			{ x:  1.5*_canvas.cell.r, y:   -_canvas.cell.q },
			{ x:  1.5*_canvas.cell.r, y:    _canvas.cell.q },
			{ x:                   0, y:  2*_canvas.cell.q },
			{ x: -1.5*_canvas.cell.r, y:    _canvas.cell.q },
			{ x: -1.5*_canvas.cell.r, y:   -_canvas.cell.q }
		];
	}

	function _renderCells(x, y) {






		rec = rec || 0;
		_renderCell(x, y, cell);
		var children = cell.getChildren();

		console.log(rec, cell.getId(), children.length);

		var walk = _getWalk();
		var i;
		for (i=0; i<children.length; i++) {
			_renderCells(x + walk[i].x, y + walk[i].y, children[i], rec + 1);
		}
	}

	function _renderCell(x, y, cell) {
		_drawHex(x, y, _canvas.cell.r, _canvas.cell.q);
		_drawText(x, y, cell.getId());
	}

	function _drawBoardGuides(n) {
		var i;
		n = n || 8;
		for (i=1; i<n; i++) {
			_drawLine(_canvas.width/n*i, 0, _canvas.width/n*i, _canvas.height, '#ccc');
			_drawLine(0, _canvas.height/n*i, _canvas.width, _canvas.height/n*i, '#ccc');
		}
	}

	//

	function _drawHex(x, y, r, q, color, background) {
		_canvas.ctx.beginPath();
		_canvas.ctx.moveTo(Math.floor( x-r/2 )+0.5, Math.floor( y-q )+0.5);
		_canvas.ctx.lineTo(Math.floor( x+r/2 )+0.5, Math.floor( y-q )+0.5);
		_canvas.ctx.lineTo(Math.floor( x+r   )+0.5, Math.floor( y   )+0.5);
		_canvas.ctx.lineTo(Math.floor( x+r/2 )+0.5, Math.floor( y+q )+0.5);
		_canvas.ctx.lineTo(Math.floor( x-r/2 )+0.5, Math.floor( y+q )+0.5);
		_canvas.ctx.lineTo(Math.floor( x-r   )+0.5, Math.floor( y   )+0.5);
		_canvas.ctx.closePath();
		_canvas.ctx.strokeStyle = color || '#000';
		if (background) {
			_canvas.ctx.fillStyle = background;
			_canvas.ctx.fill();
		}
		_canvas.ctx.stroke();
	}

	function _drawCircle(x, y, r, color) {
		_canvas.ctx.beginPath();
		_canvas.ctx.arc(Math.floor(x), Math.floor(y), r, 0, 2*Math.PI);
		_canvas.ctx.strokeStyle = color || '#000';
		_canvas.ctx.stroke();
	}

	function _drawLine(x1, y1, x2, y2, color) {
		_canvas.ctx.moveTo(Math.floor(x1)+0.5, Math.floor(y1)+0.5);
		_canvas.ctx.lineTo(Math.floor(x2)+0.5, Math.floor(y2)+0.5);
		_canvas.ctx.strokeStyle = color || '#000';
		_canvas.ctx.stroke();
	}

	function _drawText(x, y, s) {
		_canvas.ctx.font = "10px Arial";
		_canvas.ctx.fillText(s, x, y);
	}

	//

	renderer.init        = _init;
	renderer.tick        = _tick;
	renderer.clearCanvas = _clearCanvas;
};