"use strict";

class Triangle {
    /* Инициализация полей */
    initSides(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    /* Проверка существования треугольника */
    checkTriangle() {
        if (this.a > this.b + this.c || 
            this.b > this.a + this.c ||
            this.c > this.a + this.b) {
                return false;
            }

        return true;
    }

    /* Подсчёт периметра треугольника */
    takePerimeter() {
        return this.a + this.b + this.c;
    }

    /* Подсчёт площади треуголника */
    takeArea() {
        let p = this.takePerimeter() / 2;

        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    /* Проверка на прямоугольность треугольника */
    checkSquareness() {
        if (this.a**2 + this.b**2 == this.c**2 ||
            this.a**2 + this.c**2 == this.b**2 ||
            this.b**2 + this.c**2 == this.a**2) {
                return true;
            }

        return false;
    }
}


/* Not triangle */
let notTriangle = new Triangle();
notTriangle.initSides(3, 4, 0)
console.log("Not triangle is triangle? -", notTriangle.checkTriangle());
console.log("It sqare? - ", notTriangle.checkSquareness(), "\n");


/* Just triangle */
let justTriangle = new Triangle();
justTriangle.initSides(4, 4, 5);
console.log("Just triangle is triangle? -", justTriangle.checkTriangle());
console.log("It sqare? - ", justTriangle.checkSquareness(), "\n");

/* Squareness triangle */
let squareTriangle = new Triangle();
squareTriangle.initSides(3, 4, 5);
console.log("Square triangle is triangle? -", squareTriangle.checkTriangle());
console.log("It sqare? - ", squareTriangle.checkSquareness(), "\n");