  
"use strict";

const fs = require("fs");
const readLine = require("readline-sync");

const contentLength = 10;
const fileFormat = ".txt";

function directoryProcessing(path) {
    let fileArray = []

    if (fs.existsSync(path)) {
        fileArray = fs.readdirSync(path);

        for (let object of fileArray) {
            let fullFilePath = path + '/' + object;

            if (fs.statSync(fullFilePath).isDirectory()) {
                directoryProcessing(fullFilePath);
            }
            else if (fullFilePath.endsWith(fileFormat)) {
                if (fs.existsSync(fullFilePath)) {
                    let fileContent = fs.readFileSync(fullFilePath, "utf-8");

                    if (fileContent.length <= contentLength) {
                        console.log("\nFile - " + fullFilePath, "\n" + fileContent, "\n");
                    }
                }
                else {
                    console.log("File ", fullFilePath, " is not available");
                }
            }
        }
    }
    else {
        console.log("Directory does not exist");
    }
}


function main() {
    let directoryStart = readLine.question("Input directory: ");
    directoryProcessing(directoryStart);
}


main()