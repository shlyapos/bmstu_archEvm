"use strict";

let number = 0;

function outputByTick() {
    number ++;
    console.log(number);

    if (number >= 20) {
        number = 0;
    }

    if (number <= 10) {
        setTimeout(outputByTick, 2000);
    }
    else if (number <= 20) {
        setTimeout(outputByTick, 1000);
    }
}

outputByTick();