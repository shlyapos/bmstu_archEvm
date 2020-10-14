"use strict";

const fs = require('fs');

const treeFile = "tree.txt";


function randInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}


function generateBranch() {
	const symbols = "qwertyuiopasdfghjklzxcvbnm";
	
	let branch = randInt(0, 2);

	let index = randInt(0, symbols.length - 1);
    let tree = { "value" : symbols[index] };
    
    if (branch >= 1) {
        tree["left"] = generateBranch();
	}
	
    if (branch == 2) {
        tree["right"] = generateBranch();
    }

    return tree;
}


function generateTree() {
	const string = JSON.stringify(generateBranch(), null, '  ');
	fs.writeFileSync(treeFile, string);
}


function parseTree() {
	let out = false;

	let content;
	let tree;

	if (fs.existsSync(treeFile)){
		content = fs.readFileSync(treeFile, "utf8");

		try {
			tree = JSON.parse(content);
			out = tree;
		}
		catch (error) {
			console.error("Exist file");
		}
	}
	else {
		console.error("File not found");
	}

	return out;
}


function getMaxTrace(tree) {

		if (!tree)
			return "";

		if (!tree["left"] && !tree["right"])
			return tree["value"];

		let left = getMaxTrace(tree["left"]);
        let right = getMaxTrace(tree["right"]);
        
		return tree["value"] + ((left.length > right.length) ? left : right);
}


function main() {
	generateTree();
    
    let tree = parseTree();
    
    if (tree) {
        let maxTrace = getMaxTrace(tree)
        
		console.log("Tree: ");
        console.log(tree);
        
		console.log("Trace: " + maxTrace);
		console.log("Max depth: " + maxTrace.length);
	}
}

main();