"use strict";

const readLine = require("readline-sync");
const fs = require("fs");

const fileName = "result.txt";
let strArray = [];

let n = parseInt(readLine.question("Input N: "));

if (isNaN(n) || n < 0) {
    console.log("Wrong N");
    return;
}

for (let i = 0; i < n; i ++) {
    let strTemp = readLine.question("Input string: ");

    if ((strTemp.length % 2) == 0) {
        strArray.push(strTemp);
    }
}

const arrayJson = JSON.stringify(strArray);
fs.writeFileSync(fileName, arrayJson);