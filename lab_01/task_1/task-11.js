"use strict";

class KidList {
    constructor() {
        this.list = [];
    }

    /* Добавление в список */
    addToList(surname, age) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].surname == surname) {
                return;
            }
        }
        
        let newKid = {surname : surname, age : age};
        this.list.push(newKid);
    }

    /* Чтение из списка */
    readFromList(surname) {
        for (let i = 0; i < this.list.length; i ++) {
            if (surname == this.list[i].surname) {
                return this.list[i];
            }
        }
    }

    /* Обновление фамилии в списке */
    updateSurname(oldSurname, newSurname) {
        for (let i = 0; i < this.list.length; i ++) {
            if (oldSurname == this.list[i].surname) {
                this.list[i].surname = newSurname;
            }
        }
    }

    /* Обновление возраста в списке */
    updateAge(oldSurname, newAge) {
        for (let i = 0; i < this.list.length; i ++) {
            if (oldSurname == this.list[i].surname) {
                this.list[i].age = newAge;
            }
        }
    }
    
    /* Удаление из списка */
    deleteFromList(surname) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].surname == surname) {
                this.list.splice(i, 1);
            }
        }
    }

    /* Вывод списка */
    outputList() {
        for (let i = 0; i < this.list.length; i ++) {
            console.log("Surname - ", this.list[i].surname, "\tAge - ", this.list[i].age);
        }

        console.log("\n");
    }

    /* Средний возраст детей */
    takeAverageAge() {
        let ageSum = 0;

        for (let i = 0; i < this.list.length; i ++) {
            ageSum += this.list[i].age;
        }

        return ageSum / this.list.length;
    }

    /* Поиск самого старшего ребёнка */
    takeOldestKidFromList() {
        let maxAge = 0;
        let maxIndex = -1;

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].age > maxAge) {
                maxAge = this.list[i].age;
                maxIndex = i;
            }
        }
        
        return this.list[maxIndex];
    }

    /* Получение списка детей с возрастом в заданном диапазоне */
    takeKidByAgeInRange(start, end) {
        let newList = new KidList();

        for (let i = 0; i < this.list.length; i ++) {
            if (start <= this.list[i].age && this.list[i].age <= end) {
                newList.addToList(this.list[i].surname, this.list[i].age);
            }
        }

        return newList;
    }

    /* Получсение списка детей, фамилии которых начинается на заданную букву*/
    takeKidByFirstLetter(letter) {
        let newList = new KidList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].surname.charAt(0) == letter) {
                newList.addToList(this.list[i].surname, this.list[i].age);
            }
        }

        return newList;
    }

    /* Получение списка детей, длина фамилий которых равна заданной длине */
    takeKidBySurnameLenght(length) {
        let newList = new KidList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].surname.length > length) {
                newList.addToList(this.list[i].surname, this.list[i].age);
            }
        }

        return newList;
    }

    /* Получение списка детей, фамилии которых начинаются с заглавной буквы */
    takeKidByUpperCase() {
        let newList = new KidList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].surname.charAt(0) >= "A" && 
                this.list[i].surname.charAt(0) <= "Z") {
                newList.addToList(this.list[i].surname, this.list[i].age);
            }
        }

        return newList;
    }
}


let kidList = new KidList();

// Add
kidList.addToList("Pavlov", 3);
kidList.addToList("Ivanov", 7);
kidList.addToList("Suchkov", 4);
kidList.addToList("Belochkin", 6);
kidList.addToList("smokov", 1);
kidList.addToList("pupkin", 3);
kidList.addToList("Petrov", 4);

console.log("Adding");
kidList.outputList();


// Read
let readKid = kidList.readFromList("Ivanov");
console.log("Kid is found - ", readKid.surname, readKid.age, "\n\n");


// Update
kidList.updateSurname("Petrov", "Smirnov");
kidList.updateAge("Smirnov", 10);

console.log("Update - from 'Petrov 4' to 'Smirnov 10'");
kidList.outputList();


// Delete
kidList.deleteFromList("Smirnov");
console.log("Delete - Smirnov");
kidList.outputList();


// Average age
console.log("Average age is ", kidList.takeAverageAge(), "\n\n");


// Age in range
console.log("Kids with age from 4 to 10");

let listByRange = kidList.takeKidByAgeInRange(4, 10);
listByRange.outputList();


// Surname start with letter
console.log("Surname that start with P");

let listByFirstLetter = kidList.takeKidByFirstLetter("P");
listByFirstLetter.outputList();


// Surname longer then...
console.log("Surname longer then 6");

let listSurnameLonger = kidList.takeKidBySurnameLenght(6);
listSurnameLonger.outputList();


// Surname start with uppercase
console.log("Surname start with uppercase")

let listSurnameUpperCase = kidList.takeKidByUpperCase();
listSurnameUpperCase.outputList();