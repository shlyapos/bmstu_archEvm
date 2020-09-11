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

    readFromList(name) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                return this.list[i];
            }
        }
    }

    updateName(oldName, newName) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === oldName) {
                this.list[i].setName(newName);
            }
        }
    }

    updateX(name, newX) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list[i].setX(newX);
            }
        }
    }

    updateY(name, newY) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list[i].setY(newY);
            }
        }
    }

    deleteFromList(name) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getName() === name) {
                this.list.splice(i, 1);
            }
        }
    }

    outputList() {
        for (let i = 0; i < this.list.length; i ++) {
            console.log("Name:", this.list[i].getName(),
                        "\tX:", this.list[i].getX(),
                        "\tY:", this.list[i].getY(),);
        }

        console.log("\n");
    }

    takeTwoDistant(point1, point2) {
        return Math.sqrt((point2.getX() - point1.getX())**2 + 
                         (point2.getY() - point1.getY())**2);
    }

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

    takePointHigherX() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getY() > 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    takePointLowerX() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getY() < 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    takePointLeftY() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getX() < 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    takePointRightY() {
        let resList = new PointList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getX() > 0) {
                resList.addToList(this.list[i]);
            }
        }

        return resList;
    }

    takePointRectZone(v1, v2, v3, v4) {
        }
    }
}


let pointList = new PointList();


/* Add */
pointList.addToList("A", 5, 5);
pointList.addToList("B", 5, 0);
pointList.addToList("C", 3, 0);
pointList.addToList("D", 3, 3);
pointList.addToList("S", 0, 0);

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


pointList.addToList("T", -4, -2);
pointList.addToList("F", -2, 3);


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


/* Check rectangular zone */
let rectZoneList = pointList.takePointRectZone();