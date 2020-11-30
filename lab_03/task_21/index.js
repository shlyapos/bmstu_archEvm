"use strict";

const express = require("express");
const fs = require("fs");

const dataPath = "data/games.txt";

class Server {
    constructor(port = 5015) {
        this.port = port;
        this.app = express();
        this.staticPath = __dirname + "/static";
    }

    start() {
        try {
            this.app.listen(this.port);
            console.log("Server started on port " + this.port);
        }
        catch {
            console.log("Server startup error");
            throw new Error("Server start error");
        }

        this.app.use(this.headerFormation);
        this.app.use(express.static(this.staticPath));
        this.app.set("view engine", "hbs");

        this.app.get("/getGames", this.getGames);
    }

    headerFormation(request, response, next) {
        response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	response.header("Access-Control-Allow-Origin", "*");
    	next();
    }

    getGames(request, response) {
        const age = request.query.age;

        const gamesData = fs.readFileSync(dataPath, "utf8");
        const gamesStorage = JSON.parse(gamesData);

        const infoObject = {
            description: "Games for " + age,
            games: gamesStorage.filter((game) => {return game.age <= age})
        };

        response.render("pageGames.hbs", infoObject);
    }
}

let server = new Server(5015);
server.start();
