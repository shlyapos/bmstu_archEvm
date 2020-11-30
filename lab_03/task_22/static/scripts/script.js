"use strict";

window.onload = function() {
    const loginField = document.getElementById("login");
    const passwordField = document.getElementById("password");

    const button = document.getElementById("get_btn");
    const status = document.getElementById("status");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();

        request.open("GET", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);

        request.onload = function() {
            callback(request.response);
        };
    };

    function getUserFromData(login, password) {
        const url = `/getUser?login=${login}&password=${password}`;
        let found;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            found = objectAnswer.found;

            if (!found) {
                status.innerHTML = "Login or password incorrect, please try again";
            }
            else {
                const hobbie = objectAnswer.hobbie;
                const age = objectAnswer.age;

                const accountUrl = `/account?login=${login}&hobbie=${hobbie}&age=${age}`;
                window.open(accountUrl);
            }
        });

        return found;
    }

    function authByCookies(stringAnswer) {
        console.log(stringAnswer);
        const objectAnswer = JSON.parse(stringAnswer);

        if (objectAnswer.exists) {
            const login = objectAnswer.login;
            const password = objectAnswer.password;

            getUserFromData(login, password);
        }
    }

    let url = "/api/delete";
    ajaxGet(url, function(stringAnswer) {});

    url = "/api/get";
    ajaxGet(url, authByCookies);

    button.onclick = function() {
        const login = loginField.value;
        const password = passwordField.value;
        
        const found = getUserFromData(login, password);

        if (!found) {
            url = `/api/save?login=${login}&password=${password}`;
            ajaxGet(url, function(stringAnswer){});
        }
    }
}