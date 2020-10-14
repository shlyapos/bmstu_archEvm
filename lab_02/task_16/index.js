"use strict";


function shoveObject(object) {
    let newObject = { data : object };
    return newObject;
}


function main() {
    let result = 0;
    let obj = { data : "Бесконечность не предел" };

    while (true) {
        try {
            let objJson = JSON.stringify(obj);
        }
        catch {
            console.log("Maximum possible nesting level = ", result);
            break;
        }

        result ++;
        obj = shoveObject(obj);
    }
}


main()