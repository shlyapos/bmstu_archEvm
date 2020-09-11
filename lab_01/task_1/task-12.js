"use strict";

class Student {
    constructor(group, studNumb, marks) {
        this.group = group;
        this.studNumb = studNumb;
        this.marks = marks;
    }

    /* Getters */
    getGroup() {
        return this.group;
    }

    getStudNumber() {
        return this.studNumb;
    }

    getMarks() {
        return this.marks;
    }

    /* Setters */
    setGroup(newGroup) {
        this.group = newGroup;
    }

    setStudNumber(newStudNumber) {
        this.studNumb = newStudNumber;
    }

    setMarks(newMarks) {
        this.marks = newMarks;
    }
}

class StudentList {
    constructor() {
        this.list = [];
    }

    addToList(arg1, arg2, arg3) {
        let newStudent = null;

        if (arguments.length == 1) {
            newStudent = arg1;
        }
        else if (arguments.length == 3) {
            newStudent = new Student(arg1, arg2, arg3);
        }

        for (let i = 0; i < this.list.length; i ++) {
            if (newStudent.getStudNumber() === this.list[i].getStudNumber()) {
                return;
            }
        }

        this.list.push(newStudent);
    }

    readFromList(studNumb) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getStudNumber() === studNumb) {
                return this.list[i];
            }
        }
    }

    updateGroup(studNumb, newGroup) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getStudNumber() === studNumb) {
                this.list[i].setGroup(newGroup);
            }
        }
    }

    updateStudNumber(oldStudNumb, newStudNumb) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getStudNumber() === oldStudNumb) {
                this.list[i].setStudNumber(newStudNumb);
            }
        }
    }

    updateMarks(studNumb, newMarks) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getStudNumber() === studNumb) {
                this.list[i].setMarks(newMarks);
            }
        }
    }

    deleteFromList(studNumb) {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getStudNumber() === studNumb) {
                this.list.splice(i, 1);
            }
        }
    }

    takeAverageRating(studNumb) {
        let marks = this.readFromList(studNumb).getMarks();
        let sumMarks = 0;

        for (let i = 0; i < marks.length; i ++) {
            sumMarks += marks[i];
        }

        return sumMarks / marks.length;
    }

    takeByGroup(group) {
        let newList = new StudentList();

        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getGroup() === group) {
                newList.addToList(this.list[i]);
            }
        }

        return newList;
    }

    takeMaxCountMarks(group) {
        let maxCount = 0;
        let student = null;
        
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getGroup() === group && 
                this.list[i].getMarks().length > maxCount) {
                    maxCount = this.list[i].getMarks().length;
                    student = this.list[i];
                }
        }

        return student;
    }

    takeByZeroMarks() {
        for (let i = 0; i < this.list.length; i ++) {
            if (this.list[i].getMarks().length == 0) {
                return this.list[i];
            }
        }
    }

    outputList() {
        for (let i = 0; i < this.list.length; i ++) {
            console.log("Group", this.list[i].getGroup(),
                        "\tStud Nubmer", this.list[i].getStudNumber(),
                        "\tMarks", this.list[i].getMarks());
        }

        console.log("\n");
    }
}

let studentsGroup = new StudentList();


/* Add */
let student = new Student("IU7-32B", "18u321", [4, 3, 2, 1]);
studentsGroup.addToList(student);

studentsGroup.addToList("IU3-12V", "12u121", [3, 5, 5, 2]);
studentsGroup.addToList("IU3-32V", "12u221", [2, 4, 5, 2]);
studentsGroup.addToList("IU4-21A", "15u537", [5, 5, 4, 4]);
studentsGroup.addToList("IU4-21A", "15u534", [5, 4, 4, 4]);
studentsGroup.addToList("IU8-31A", "18u163", []);
studentsGroup.addToList("IU5-63A", "16u333", [5, 5, 2, 4]);
studentsGroup.addToList("IU4-21A", "13u233", [3, 3, 2, 4, 3]);

studentsGroup.outputList();

studentsGroup.addToList("IU4-63A", "16u333", [3, 1, 5, 2]);
studentsGroup.outputList();


/* Read */
let foundStudent = studentsGroup.readFromList("12u221");
console.log("Student 12u221 - ", foundStudent.getGroup(), 
                                 foundStudent.getStudNumber(), 
                                 foundStudent.getMarks(),
                                 "\n\n");


/* Update */
console.log("Update 18u321")
studentsGroup.updateGroup("18u321", "IU7-42B");
studentsGroup.updateMarks("18u321", [4, 5, 5, 3]);
studentsGroup.updateStudNumber("18u321", "16u312");

studentsGroup.outputList();


/* Delete */
console.log("Delete 16u312");
studentsGroup.deleteFromList("16u312");
studentsGroup.outputList();


/* Average rating */
console.log("Average rating for 16u333", studentsGroup.takeAverageRating("16u333"), "\n\n");


/* Students in group */
console.log("Students in IU4-21A");

let listByGroup = studentsGroup.takeByGroup("IU4-21A");
listByGroup.outputList();


/* Student with max marks count */
let studentWithMax = studentsGroup.takeMaxCountMarks("IU4-21A");
console.log("Student in IU4-21A with max count is:\n" + studentWithMax.getGroup(),
                                                        studentWithMax.getStudNumber(),
                                                        studentWithMax.getMarks(),
                                                        "\n\n");


/* Find useless student */
let uselessStudent = studentsGroup.takeByZeroMarks();
console.log("Student with zero marks:\n" + uselessStudent.getGroup(),
                                           uselessStudent.getStudNumber(),
                                           uselessStudent.getMarks(),
                                           "\n\n");