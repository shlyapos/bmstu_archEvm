"use strict";

const fs = require("fs");
const fileName = "data.txt";

function checkVowel(string) {
    let consonantArray = "йцкнгшщзхъфвпрлджчсмтьб";

    for (let letter of string) {
        for (let consonant of consonantArray) {
            if (letter === consonant) {
                return false;
            }
        }
    }

    return true;
}

function main() {
    let error = null;

    if (fs.existsSync(fileName)) {
        let strArrayJSON = fs.readFileSync(fileName, "utf8");

        const strArray = JSON.parse(strArrayJSON);

        if (strArray) {
            for (let str of strArray) {
                if (checkVowel(str)) {
                    console.log(str);
                }
            }
        }
        else {
            error = "Wrong data";
        }
    }
    else {
        error = "File does not exist";
    }

    if (error) {
        console.log(error);
    }
}

main()