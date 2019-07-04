//======================================================================
// th.euclid.js
//
// www.timohoogland.com © 2019
//
// sources used for writing this code:
// https://github.com/brianhouse/bjorklund
// http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf
//======================================================================

autowatch = 1;
inlets = 1;
outlets = 1;

var pattern, counts, remainders;

function euclid(){
	var args = arrayfromargs(arguments);

	var steps = Math.max(1, Math.floor(args[0]));
	var beats = Math.min(steps, Math.floor(args[1]));
	var rotate = Math.floor(args[2]);

	pattern = [];
	counts = [];
	remainders = [];
	var level = 0;
	var divisor = steps - beats;

	if (beats <= 0){
		for (var i = 0; i < steps; i++){
			pattern[i] = 0;
		}
		outlet(0, pattern);
	} else {
		remainders.push(beats);

		while (remainders[level] > 1){
			// post("startbeats", beats, "steps", steps, "divisor", divisor, "level", level, "\n");
			counts.push(Math.floor(divisor / remainders[level]));
	        remainders.push(divisor % remainders[level]);

			divisor = remainders[level];
	        level++;
		}

		// post("counts", counts, "\n");
		// post("remainders", remainders, "\n");
	    counts.push(divisor);
	    euclidBuild(level);

		// rotate the list to have a 1 at the start
		var offset = getIndex(1, pattern);
		var outList = [];

		// additional rotation specified by argument
		for (var i = 0; i < steps; i++){
			outList[i] = pattern[mod((i + offset - rotate), steps)]
		}
		outlet(0, outList);
	}
}//euclid()

function euclidBuild(l){
	var level = l;

	if (level == -1){
			pattern.push(0);
	} else if (level == -2){
			pattern.push(1);
	} else {
		for (var i = 0; i < counts[level]; i++){
			euclidBuild(level-1);
		}
		if (remainders[level] != 0){
			euclidBuild(level-2);
		}
	}
}//build()

function mod(value, mod){
	// a modulus function that works on negative numbers 
	return ((value % mod) + mod) % mod;
}//mod()

function getIndex(v, arr){
	// a getIndex value as replacement of indexOf()
	// for older max versions with ES5
	for (var i = 0; i < arr.length; i++){
		if (arr[i] == v){
			return i;
		}
	}
}//getIndex()

//======================================================================
// Copyright (C) 2019 Timo Hoogland
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this program.  If not,
// see <https://www.gnu.org/licenses/>.
//======================================================================
