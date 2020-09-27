"use strict";

const fs = require("fs");
const readLine = require("readline-sync");

void function main() {
    let error = null;

    let fileFormat = readLine.question("Input format: ");
    let directory = readLine.question("Input directory: ");

    if (fs.existsSync(directory)) {
        const fileArray = fs.readdirSync(directory);

        if (fileArray.length > 0) {
            for (let file of fileArray) {
                const filePath = directory + '/' + file;

                if (file.endsWith(fileFormat) && fs.existsSync(filePath)) {
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    console.log('\n' + filePath + '\n', fileContent);
                }
            }
        }
        else {
            error = "Folder is empty";
        }
    }
    else {
        error = "Directory does not exist";
    }

    if (error) {
        console.log(error);
    }
}

main()