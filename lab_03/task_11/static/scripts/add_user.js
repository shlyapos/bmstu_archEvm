"use strict";

function checkValidEmail(email) {
    const regularEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
    return email.match(regularEmail);
}

function checkValidSurname(surname) {
    const regularSurname = /^([A-ЯЁ]{1}[а-яё]{1,23})$/
    return surname.match(regularSurname);
}

function checkValidPhone(phone) {
    const regularPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
    return phone.match(regularPhone);
}


window.onload = function() {
    const emailField = document.getElementById("email");
    const surnameField = document.getElementById("surname");
    const phoneField = document.getElementById("phone");

    const addButton = document.getElementById("addButton");
    const statusLabel = document.getElementById("status");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();
    
        request.open("POST", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);
    
        request.onload = function() {
            callback(request.response);
        }
    }

    addButton.onclick = function() {
        const email = emailField.value;
        const surname = surnameField.value;
        const phone = phoneField.value;

        let statusString = "";
        let validInfo = true;

        if (!checkValidEmail(email)) {
            statusString += 'Wrong <font color="red">email</font><br>';
            validInfo = false;
        }

        if (!checkValidSurname(surname)) {
            statusString += 'Wrong <font color="green">surname</font><br>';
            validInfo = false;
        }

        if (!checkValidPhone(phone)) {
            statusString += 'Wrong <font color="blue">phone number</font><br>';
            validInfo = false;
        }

        if (!validInfo) {
            statusLabel.innerHTML = "Enter wrong data: <br>" + statusString;
        }
        else {
            const url = "/addUser?email=" + email + "&surname=" + surname + "&phone=" + phone;
            ajaxGet(url, function(stringAnswer) {
                const objectAnswer = JSON.parse(stringAnswer);
                const added = objectAnswer.added;

                statusLabel.innerHTML = added ? `User with mail <font color="red">${email}</font> and phone number <font color="blue">${phone}</font> has been successfully added` :
                                                `User with mail <font color="red">${email}</font> and phone number <font color="blue">${phone}</font> already exists`;
            });
        }
    }
}