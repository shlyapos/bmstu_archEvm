"use strict";

const fs = require("fs");
const readLine = require("readline-sync");


function inputFilesName(count) {
    let fileArray = [];

    for (let i = 0; i < count; i++) {
        let fileName = readLine.question("Input file name: ");
        fileArray.push(fileName);
    }

    return fileArray;
}


function main() {
    let n = parseInt(readLine.question("Input file count: "));

    if (isNaN(n) || n < 0) {
        console.log("File number is wrong");
        return;
    }

    let fileArray = inputFilesName(n);

    let newFileName = readLine.question("Input name for new file: ");
    let newFileContent = "";

    for (let file of fileArray) {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, "utf-8");
            newFileContent += content;
        }
        else {
            console.log("Some files are not available");
            break;
        }
    }

    fs.writeFileSync(newFileName, newFileContent);
}


main()