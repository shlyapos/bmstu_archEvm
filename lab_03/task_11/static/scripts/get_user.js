"use strict";

window.onload = function() {
    const emailField = document.getElementById("email");

    const getButton = document.getElementById("getButton");
    const resultLabel = document.getElementById("result");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();

        request.open("GET", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);

        request.onload = function() {
            callback(request.response);
        }
    }

    getButton.onclick = function() {
        const email = emailField.value;
        const url = "/getUser?email=" + email;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            
            const found = objectAnswer.found;
            const surname = objectAnswer.surname;
            const phone = objectAnswer.phone;

            resultLabel.innerHTML = found ? `User with email <font color="red">${email}</font> was found: <br>
                                             Surname - <font color="green">${surname}</font>;<br>
                                             Phone   - <font color="blue">${phone}</font>;` :
                                            `User with email <font color="red">${email}</font> not found`
        });
    }
}