"use strict";

class Point {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    /* Getter */
    getName() {
        return this.name;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    /* Setter */
    setName(newName) {
        this.name = newName;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }
}

class PointList {
    constructor() {
        this.list = [];
    }

    /* Добавление точки в список */
    addToList(arg1, arg2, arg3) {
        let newPoint = null;

        if (arguments.length == 1) {
            newPoint = arg1;
        }
        else if (arguments.length == 3) {
            newPoint = new Point(arg1, arg2, arg3);
        }

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === newPoint.getName()) {
                return;
            }
        }

        this.list.push(newPoint);
    }

    /* Чтение из списка */
    readFromList(name) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                return this.list[i];
            }
        }
    }

    /* Обновление имени у точки */
    updateName(oldName, newName) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === oldName) {
                this.list[i].setName(newName);
            }
        }
    }

    /* Обновление координаты x точки */
    updateX(name, newX) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list[i].setX(newX);
            }
        }
    }

    /* Обновление координаты y точки */
    updateY(name, newY) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list[i].setY(newY);
            }
        }
    }

    /* Удаление из списка */
    deleteFromList(name) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list.splice(i, 1);
            }
        }
    }

    /* Вывод списка */
    outputList() {
        for (let i = 0; i < this.list.length; i ++) {
            console.log("Name:", this.list[i].getName(),
                        "\tX:", this.list[i].getX(),
                        "\tY:", this.list[i].getY(),);
        }

        console.log("\n");
    }

    /* Просчёт расстояния между двумя точками */
    takeTwoDistant(point1, point2) {
        return Math.sqrt((point2.getX() - point1.getX())**2 + 
                         (point2.getY() - point1.getY())**2);
    }

    /* Поиск максимального расстояния между точками */
    takeTwoMaxDistantPoint() {
        let maxLenght = 0;
        let curLenght = 0;

        let p1, p2;

        for (let i = 0; i < this.list.length; i ++) {
            for (let j = i + 1; j < this.list.length - 1; j ++) {
                curLenght = this.takeTwoDistant(this.list[i], this.list[j]);

                if (curLenght > maxLenght) {
                    p1 = this.list[i];
                    p2 = this.list[j];

                    maxLenght = curLenght;
                }
            }
        }

        return [p1, p2];
    }

    /* Получение списка точек, дистанция от заданной точки которых не больше заданного числа */
    takePointOnSpicificDist(point, c) {
        let resList = new PointList();
        let dis = 0;

        for (let i = 0; i < this.list.length; i ++) {
            dis = this.takeTwoDistant(point, this.list[i]);

            if (dis < c) {
                resList.addToList(this.list[i]);
                // resList.push(this.list[i]);
            }
        }

        return resList;
    }

    /* Получение списка точек выше оси X */
    takePointHigherX() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getY() > 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    /* Получение списка точек ниже оси X */
    takePointLowerX() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getY() < 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    /* Получение списка точек левее оси Y */
    takePointLeftY() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getX() < 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    /* Получение списка точек правее оси Y */
    takePointRightY() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getX() > 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    /* Получение списка точек внутри заданного прямоуголника */
    takePointRectZone(v1, v2, v3, v4) {
        let resList = new PointList();

        let x = [v1.getX(), v2.getX(), v3.getX(), v4.getX()];
        let y = [v1.getY(), v2.getY(), v3.getY(), v4.getY()];

        for (let point of this.list) {
            if (point.getY() > v1.getY() &&
                point.getY() < v3.getY() &&
                point.getX() > v1.getX() &&
                point.getX() < v4.getX()) {
                resList.addToList(point);
            }
        }
        
        return resList;
    }
}


let pointList = new PointList();


/* Add */
pointList.addToList("A", 5, 5);
pointList.addToList("B", 5, 0);
pointList.addToList("C", 3, 0);
pointList.addToList("D", 3, 3);
pointList.addToList("S", 0, 0);
pointList.addToList("T", -4, -2);
pointList.addToList("F", -2, 3);

pointList.outputList();


/* Read */
let pC = pointList.readFromList("C");
console.log("Found C - ", pC.getName(), pC.getX(), pC.getY(), "\n\n");


/* Update */
console.log("Update point D");
pointList.updateName("D", "d");
pointList.updateX("d", 2);
pointList.updateY("d", 2);

pointList.outputList();


/* Delete */
console.log("Delete point d");
pointList.deleteFromList("d");
pointList.outputList();


/* Two point with max distant */
let pointMaxDistant = pointList.takeTwoMaxDistantPoint();
console.log("Points with max distant is", pointMaxDistant[0].getName(), 
            "and", pointMaxDistant[1].getName(), "\n\n");


/* Point at a spicific distance */
let pointStart = new Point("P", 0, 0);
let pointDistant = pointList.takePointOnSpicificDist(pointStart, 5);

console.log("Less then 5 is:")
pointDistant.outputList();


/* Higher/Lower/Right/Left */
console.log("Higher then x:")
let higherList = pointList.takePointHigherX();
higherList.outputList();

console.log("Lower then x:")
let lowerList = pointList.takePointLowerX();
lowerList.outputList();

console.log("Right then y:")
let rightList = pointList.takePointRightY();
rightList.outputList();

console.log("Left then y:")
let leftList = pointList.takePointLeftY();
leftList.outputList();


pointList.addToList("KK", 2, 2);
pointList.addToList("P", 10, -10);


/* Check rectangular zone */
console.log("For rectangular - A(1; -4), B(1; 5), C(5, 5), D(5, -4):");

let a = new Point("A", 1, -4);
let b = new Point("B", 1, 5);
let c = new Point("C", 5, 5);
let d = new Point("D", 5, -4);

let rectZoneList = pointList.takePointRectZone(a, b, c, d);

rectZoneList.outputList();