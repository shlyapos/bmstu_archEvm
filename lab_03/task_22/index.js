"use strict";

const fs = require("fs");

const express = require("express");
const hbs = require("hbs");
const cookieSession = require("cookie-session");

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

        this.app.use(cookieSession({
            name: "session",
            keys: ['hhh', 'qqq', 'vvv'],
            maxAge: 25 * 60 * 60 * 1000
        }));

        this.app.set("view engine", "hbs");
        this.app.set("views", "static/views");

        this.app.get("/api/save", this.saveCookie);
        this.app.get("/api/get", this.getCookie);
        this.app.get("/api/delete", this.deleteCookie);

        this.app.get("/getUser", this.getUser);
        this.app.get("/account", this.getAccount);
        this.app.get("/logIn", this.getAuth);
    }

    headerFormation(request, response, next) {
        response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	next();
    }

    // Cookies
    saveCookie(request, response) {
        const login = request.query.login;
        const password = request.query.password;

        if (!login) {
            return response.end("Login is not set!");
        }

        if (!password) {
            return response.end("Password is not set!");
        }

        request.session.login = login;
        request.session.password = password;

        response.end("Cookie set succesfully!");
    }

    getCookie(request, response) {
        if (!request.session.login || !request.session.password) {
            return response.end(JSON.stringify({"exists" : false}));
        }

        const login = request.session.login;
        const password = request.session.password;

        response.end(JSON.stringify({
            "exists": true,
            "login": login,
            "password": password
        }));
    }

    deleteCookie(request, response) {
		request.session = null;
		response.end(" Cookie deleted succesfully!");
    }
    

    // Other methods
    getUser(request, response) {
        const login = request.query.login;
        const password = request.query.password;

        const usersData = fs.readFileSync(dataPath, "utf8");
        const usersStorage = new Map(JSON.parse(usersData));

        if (!usersStorage.has(login) || (usersStorage.has(login) && usersStorage.get(login).password != password)) {
            response.end(JSON.stringify({found: false}));
        }
        else {
            const value = usersStorage.get(login);
            response.end(JSON.stringify({found: true, hobbie: value.hobbie, age: value.age}));
        }
    }

    getAccount(request, response) {
        const login = request.query.login;
		const hobbie = request.query.hobbie;
		const age = request.query.age;

		const infoObject = {
			login: login,
			hobbie: hobbie,
			age: age
        };
        
		response.render("account.hbs", infoObject);
    }

    getAuth(request, response) {
		response.end(fs.readFileSync("static/html/log_in.html", "utf8"));
	}
}

let server = new Server(5015);
server.start();
