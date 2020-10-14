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

        this.app.get("/input_index", this.getStartPage);
        this.app.get("/out_element", this.getElement);
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

    getElement(request, response) {
		const index = parseInt(request.query.index);

		if (isNaN(index)) {
			const contentString = fs.readFileSync("html_src/nan_index.html", "utf8");
			response.end(contentString);
        } 
        else {
            const array = JSON.parse(fs.readFileSync("src/arr.txt", "utf8"));

			if (index < 0 || index >= array.length) {
				const contentString = fs.readFileSync("html_src/out_of_range_index.html", "utf8");
				response.end(contentString);
            } 
            else {
				const result = array[index];

                const answerJSON = JSON.stringify({ Result : result});
                response.end(answerJSON);
			}
		}
	}
}


function main() {
    let server = new LocalServer(5015);
    server.startServer();
}


main()