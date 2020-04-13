"use strict";


function deepCopy(elem) {
    if (elem === null ||
        typeof (elem) === "number" ||
        typeof (elem) === "string" ||
        typeof (elem) === "boolean" ||
        typeof (elem) === "undefined") {
        return elem;
    }
    ;

    function objects(elem) {
        if (Array.isArray(elem)) {
            let newElem = elem.slice();
            for (let i = 0; i < newElem.length; i++) {
                if ((typeof (newElem[i]) === "object") && (newElem[i] !== null)) {
                    newElem[i] = objects(newElem[i]);
                }
                ;
            }
            ;
            return newElem;
        }
        ;
        if (typeof (elem) === "object" && elem !== null) {
            let newElem = {};
            for (let k in elem) {
                if ((typeof (elem[k]) === "object") && (elem[k] !== null)) {
                    newElem[k] = objects(elem[k]);
                    continue;
                }
                ;
                newElem[k] = elem[k];
            }
            ;
            return newElem;
        }
        ;
    };
    return objects(elem);
}

var h1 = {a: 5, b: {b1: 6, b2: 7}, c: [33, 22], d: null, e: undefined, f: Number.NaN};
var h2 = deepCopy(h1);
var a1 = [5, {b1: 6, b2: 7}, [33, 22], null, undefined, Number.NaN];
var a2 = deepCopy(a1);
var v1 = "sss";
var v2 = deepCopy(v1);
var z1 = null;
var z2 = deepCopy(z1);
var n1 = Number.NaN;
var n2 = deepCopy(n1);
console.log("h1===h2 будет false" + ((h1 === h2) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n h1.a===h2.a будет true" + ((h1.a === h2.a) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n h1.b===h2.b будет false" + ((h1.b === h2.b) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n h1.b.b1===h2.b.b1 будет true" + ((h1.b.b1 === h2.b.b1) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n h1.c===h2.c будет false" + ((h1.c === h2.c) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n h1.c[0]===h2.c[0] будет true" + ((h1.c[0] === h2.c[0]) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n h1.d===h2.d  будет true" + ((h1.d === h2.d) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n h1.e===h2.e  будет true" + ((h1.e === h2.e) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n isNaN(h2.f)   будет true" + ((isNaN(h2.f)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n h2.c instanceof Array   будет true" + ((h2.c instanceof Array) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n--------------------------------------------------------------------" +
    "\n a1===a2 будет false" + ((a1 === a2) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n typeof(a2)===typeof(a1)   будет true" + ((typeof (a2) === typeof (a1)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a1[0]===a2[0]   будет true" + ((a1[0] === a2[0]) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a1[1]===a2[1] false" + ((a1[1] === a2[1]) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n a1[1].b1===a2[1].b1   будет true" + ((a1[1].b1 === a2[1].b1) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a1[2]===a2[2] false" + ((a1[2] === a2[2]) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n a1[2][0]===a2[2][0]   будет true" + ((a1[2][0] === a2[2][0]) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a1[3]===a2[3]   будет true" + ((a1[3] === a2[3]) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a1[4]===a2[4]   будет true" + ((a1[4] === a2[4]) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n isNaN(a2[5])   будет true" + ((isNaN(a2[5])) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n a2[2] instanceof Array   будет true" + ((a2[2] instanceof Array) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n--------------------------------------------------------------------" +
    "\n typeof(v2)===typeof(v1)   будет true" + ((typeof (v2) === typeof (v1)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n v1===v2   будет true" + ((v1 === v2) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n--------------------------------------------------------------------" +
    "\n typeof(z2)===typeof(z1)   будет true" + ((typeof (z2) === typeof (z1)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n z1===z2   будет true" + ((z1 === z2) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n--------------------------------------------------------------------" +
    "\n typeof(n2)===typeof(n1)   будет true" + ((typeof (n2) === typeof (n1)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n isNaN(n2)   будет true" + ((isNaN(n2)) ? "  --> Правильно!" : "  --> ! ОШИБКА !")
);