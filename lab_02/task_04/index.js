  
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
/*
// Вывод путей до файлов 
function outputPaths(files) {
	files.forEach(file => console.log(file));
}

// Получение всех файлов с заданным расширением в директории (и её директориях)
function getFiles() {
	const fs = require("fs");
	const path = require('path');
	const readlineSync = require('readline-sync');
	
	const len = 10
	const extension = '.txt'
	let directory = readlineSync.question(' Enter directory: ');
	console.log();

	let files = [];
	
	// Поиск подходящих файлов в папке
	function parseDirectory(directory) {
		let array;
		if (fs.existsSync(directory)) {
			array = fs.readdirSync(directory);
		}
		else {
			console.error(" Directory is not found!");
			return false;
		}

		for (let filename of array) {
			let path = directory + '/' + filename;
			if (fs.statSync(path).isDirectory()) {
				parseDirectory(path);
			}
			else if (path.endsWith(extension)) {
				let content
				if (fs.existsSync(path)) {
					content = fs.readFileSync(path, "utf8");
				}
				else {
					console.error(" File is unavalible!");
					return false;
				}
				if (content.length <= len) {
					files.push(path);
				}
			}
		}
	}

	parseDirectory(directory);
	return files;
}

outputPaths(getFiles());
*/