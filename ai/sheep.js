window.life.AiSheep = function(
	_controller,
	_options
) {

	// private properties

	var _ = inherit(
		{
			creature   : null,
			dna        : life.struct.dna,
			state      : life.struct.state
		},
		_options
	);

	// constructor

	function init(creature, state) {
		_.creature = creature;
		_.dna = creature.breed().copyDna();
		_.state = state;
		_.controller.event(this, 'ai_sheep.inited');
	}

	// private methods

	// public methods

	// interface

	return {

	};
};