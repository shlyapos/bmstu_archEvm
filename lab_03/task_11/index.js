"use strict";

const express = require("express");
const fs = require("fs");

const dataPath = "data/users.txt";

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

        this.app.post("/addUser", this.addUser);
        this.app.get("/getUser", this.getUser);
    }

    headerFormation(request, response, next) {
        response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	response.header("Access-Control-Allow-Origin", "*");
    	next();
    }

    addUser(request, response) {
        const email = request.query.email;
        const surname = request.query.surname;
        const phone = request.query.phone;

        const usersData = fs.readFileSync(dataPath, "utf8");
        let usersStorage = usersData.length ? new Map(JSON.parse(usersData)) : new Map();

        function findNumber(users, number) {
            for (let value of users.values()) {
                if (value.number == number) {
                    return true;
                }
            }

            return false;
        }

        const emailExists = usersStorage.has(email);
        const numberExists = !emailExists ? findNumber(usersStorage, phone) : true;

        if (!numberExists) {
            usersStorage.set(email, {"surname" : surname, "phone" : phone});
            fs.writeFileSync(dataPath, JSON.stringify([...usersStorage]));
            response.end(JSON.stringify({added : true}));
        }
        else {
            response.end(JSON.stringify({added : false}));
        }
    }

    getUser(request, response) {
		const email = request.query.email;

		const usersData = fs.readFileSync(dataPath, "utf8")
		let usersStorage = usersData.length ? new Map(JSON.parse(usersData)) : new Map();

		if (!usersStorage.has(email)) {
			response.end(JSON.stringify({found: false}));
		} else {
			const values = usersStorage.get(email);
			response.end(JSON.stringify({found: true, surname: values.surname, phone: values.phone}));
		}
	}
}

let server = new Server(5015);
server.start();
