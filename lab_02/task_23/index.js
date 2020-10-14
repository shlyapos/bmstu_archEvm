"use strict";


const fs = require("fs");
const express = require("express");

const newPageName = "html_src/gen_page.html";


class PageHTML {
    initPageHead() {
        this.pageHead = '<head>\n\t<meta charset="UTF-8">\n\t<title>Сгенерированная страница</title></head>';
    }

    initPageFields(count, nameArray, queryAdress) {
        if (queryAdress[0] != '/') {
            queryAdress = '/' + queryAdress;
        }

        this.pageBody = '<body>\n\t<form method="GET" action="' + queryAdress + '">';

        for (let i = 0; i < count; i++) {
            const fieldName = nameArray[i];

            this.pageBody += '\n\t\t' + '<p>' + 'Field ' + (i + 1) + " " + fieldName + '</p>';
            this.pageBody += '\n\t\t' + '<input name="' + fieldName + '" spellcheck="false" autocomplete="off">'
        }

        this.pageBody += '\n\t\t<br>\n\t\t<br>\n\t\t<input type="submit" value="Отправить запрос">';
        this.pageBody += '\n\t</form>\n</body>';
    }

    pageSave(fileName) {
        const pageData = '<!DOCTYPE html>\n<html>\n' + this.pageHead + this.pageBody + '\n</html>';

        fs.writeFileSync(fileName, pageData);
        console.log(">>> HTML save successfully!");
    }
}


class Server {
    constructor(port=5015) {
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

        this.app.get("/startPage", this.getStartPage);
        this.app.get("/generate", this.generatePage);
    }

    getStartPage(request, response) {
        const nameString = "html_src/start_page.html";

        if (fs.existsSync(nameString)) {
            const contentString = fs.readFileSync(nameString, "utf8");
            response.end(contentString);
        }
        else {
            const contentString = fs.readFileSync("html_src/bad_page.html", "utf8");
            response.end(contentString);
        }
    }

    generatePage(request, response) {
        const queryAddress = request.query.adress;
        const nameString = request.query.names;

        if (nameString.length < 1 || queryAddress.length < 1) {
            const contentString = fs.readFileSync("html_src/wrong_data.html", "utf8");
			response.end(contentString);
        } 
        else {
            // Get names from string
            function parseNameArray(string) {
                let nameArray = [];
                let name = "";

                for (let ch of string) {
                    if (ch === ' ' && name.length > 0) {
                        nameArray.push(name);
                        name = "";
                    }
                    else {
                        name += ch;
                    }
                }

                if (name.length) {
                    nameArray.push(name);
                }

                return nameArray;
            }

            const fieldsName = parseNameArray(nameString);
            let pageHTML = new PageHTML();

            pageHTML.initPageHead();
            pageHTML.initPageFields(fieldsName.length, fieldsName, queryAddress);
            pageHTML.pageSave(newPageName);

            const contentString = fs.readFileSync(newPageName, "utf8");
            response.end(contentString);
        }
    }
}


function main() {
    let server = new Server(5015);
    server.startServer();
}


main()