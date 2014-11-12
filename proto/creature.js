window.life.creature = function(controller) {
	var creature = this;

	var _dna   = null;
	var _cell  = null;
	var _ai    = null;
	var _state = null;

	creature.init         = function(cell, dna, ai) {};
	creature.tick         = function(tick) {};
	creature.getHostCell  = function() {};
	creature.getNearCells = function() {};
	creature.getEnergy    = function() {};
	creature.getFood      = function() {};
	creature.move         = function(direction) {};
	creature.feed         = function(amount) {};
};