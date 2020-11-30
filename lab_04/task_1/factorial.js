"use strict";

function factorial() {
	let value = process.argv[2];
	let result = value;
	if (parseInt(value)&& value > 0) {
		while (value > 2) {
			value -= 1;
			result *= value;
		}

		console.log(result);
	}
}

factorial();