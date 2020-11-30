"use strict";

const execSync = require('child_process').execSync;

function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

let string = '';

for (let i = 2; i < process.argv.length; i++) {
	const fact_command = `node factorial.js ${process.argv[i]}`;
	const fact = useCmd(fact_command);
	string += fact;
}

console.log(string);
