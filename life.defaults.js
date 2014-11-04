window.life.defaults = (function() {

	var creature = {

		dna: {
			energy             : {
				default        : null,
				max            : null,
				consumption    : null,
				current        : null
			},
			sight              : {
				range          : null
			},
			food: {
				seek_threshold : null
			}
		},

		state: {
			alive          : null,
			energy         : {
				current    : null
			},
			pref_direction : null
		}

	};

	return {

		board : {
			controller : null,
			radius     : null,
			cells      : null
		},

		animalia: {
			controller   : null,
			board_radius : null,
			count        : null,
			breeds       : null
		},

		breed: {
			controller          : null,
			i                   : null,
			color               : null,
			pop                 : null,
			start_x             : null,
			start_y             : null,
			creatures           : null,
			dna                 : creature.dna,
			ai_class            : null
		},

		creature: {
			controller : null,
			i          : null,
			alive      : null,
			breed      : null,
			cell       : null,
			ai         : null,
			dna        : creature.dna,
			state      : creature.state
		},

		creature_ai : {
			controller : null,
			creature   : null,
			dna        : creature.dna,
			state      : creature.state
		}

	}
})();