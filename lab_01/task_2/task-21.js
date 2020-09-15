"use strict";

class Point {
    /* Инициализации полей */
    initPoint(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    /* Вывод полей */
    output() {
        console.log(this.name, this.x, this.y);
    }
}

class Section {
    constructor() {
        this.start = new Point();
        this.end = new Point();
    }

    /* Инициализация полей */
    initSection(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }

    /* Вывод полей */
    output() {
        console.log(this.name, "\nStart:");
        this.start.output();
        console.log("End:");
        this.end.output();
    }

    /* Расчёт длинны */
    takeLenght() {
        return Math.sqrt((this.start.x - this.end.x)**2 + 
                         (this.start.y - this.end.y)**2);
    }
}


/* Point */
let pnt = new Point();

pnt.initPoint("A", 10, 3);
pnt.output();
console.log("\n");


/* Section */
let st = new Point();
st.initPoint("A", 10, 3); 

let en = new Point();
en.initPoint("B", -2, 2);

let sec = new Section();
sec.initSection("AB", st, en);
sec.output();


/* Lenght */
console.log("\nLenght: ", sec.takeLenght());