"use strict";


const fs = require("fs");
const express = require("express");


class LocalServer {
    constructor(port) {
        this.port = port;
        this.app = express();
    }

    startServer() {
        try {
            this.app.listen(this.port);
            console.log("Server started on port ", this.port);
        }
        catch {
            console.log("Server startup error");
            throw new Error("Server start error");
        }

        this.app.get("/input_numbers", this.getStartPage);
        this.app.get("/find_maximum", this.getMaxNumber);
    }

    getStartPage(request, response) {
        const nameString = request.query.p;

        if (fs.existsSync(nameString)) {
            const contentString = fs.readFileSync(nameString, "utf8");
            response.end(contentString);
        }
        else {
            const contentString = fs.readFileSync("html_source/bad_page.html", "utf8");
            response.end(contentString);
        }
    }

    getMaxNumber(request, response) {
        const number1 = parseInt(request.query.a);
        const number2 = parseInt(request.query.b);
        const number3 = parseInt(request.query.c);

        if (isNaN(number1) || isNaN(number2) || isNaN(number3)) {
            const contentString = fs.readFileSync("html_source/nan_numbers.html");
            response.end(contentString);
        }
        else {
            const maxNumber = Math.max(number1, number2, number3);

            const answerJSON = JSON.stringify({ result : maxNumber });
            response.end(answerJSON);
        }
    }
}


function main() {
    let server = new LocalServer(5015);
    server.startServer();
}


main()