"use strict";


const fs = require("fs");
const express = require("express");


class Server {
    constructor(port = 5015) {
        this.port = port;
        this.app = express();
    }

    startServer() {
        try {
            this.app.listen(this.port);
            console.log("Server started on port " + this.port);
        }
        catch {
            console.log("Server startup error");
            throw new Error("Server start error");
        }

        this.app.get("/input_number", this.getStartPage);
        this.app.get("/out_array", this.outArray);
    }

    getStartPage(request, response) {
        const nameString = request.query.p;

        if (fs.existsSync(nameString)) {
            const contentString = fs.readFileSync(nameString, "utf8");
            response.end(contentString);
        }
        else {
            const contentString = fs.readFileSync("html_src/bad_page.html", "utf8");
            response.end(contentString);
        }
    }

    static getArrayByRange(A, B, C) {
        const array = [];

        for (let number = A; number <= B; number++) {
            if (!(number % C)) {
                array.push(number);
            }
        }

        return array;
    }

    outArray(request, response) {
        const A = parseInt(request.query.a);
        const B = parseInt(request.query.b);
        const C = parseInt(request.query.c);

        if (isNaN(A) || isNaN(B) || isNaN(C)) {
            const contentString = fs.readFileSync("html_src/nan_numbers.html", "utf8");
			response.end(contentString); 
        }
        else if (A > B) {
            const contentString = fs.readFileSync("html_src/wrong_range.html", "utf8");
			response.end(contentString);
        }
        else {
            const numberArray = Server.getArrayByRange(A, B, C);

            const answerJSON = JSON.stringify(numberArray);
            response.end(answerJSON);
        }
    }
}

let server = new Server(5015);
server.startServer();