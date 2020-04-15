"use strict";


function deepComp(elem1, elem2) {

    // если типы elem1 и elem2 не равны сразу возвращаем false
    if ((typeof (elem1) !== typeof (elem2)) ||
        (typeof (elem1) === "object" && elem1 !== null && !Array.isArray(elem1) && Array.isArray(elem2)) ||
        (typeof (elem2) === "object" && elem2 !== null && !Array.isArray(elem2) && Array.isArray(elem1))) {
        return false;
    }
    ;

    // проверяем на NaN
    if (isNaN(elem1) && typeof (elem1) === "number" && isNaN(elem2) && typeof (elem2) === "number") return true;

    // если elem1 и elem2 массивы
    if (Array.isArray(elem1) && Array.isArray(elem2)) {
        if (elem1.length === elem2.length) {
            for (let i = 0; i < elem1.length; i++) {
                if (deepComp(elem1[i], elem2[i])) continue;
                return false;
            }
            ;
            return true;
        } else {
            return false;
        }
        ;
    }
    ;

    // если elem1 и elem2 хэши
    if (typeof (elem1) === "object" && elem1 !== null && typeof (elem2) === "object" && elem2 !== null) {
        let elem1Keys = Object.keys(elem1);
        let elem2Keys = Object.keys(elem2);
        if (elem1Keys.length === elem2Keys.length) {
            for (let k in elem1) {
                if (!(k in elem2)) return false;
                if (deepComp(elem1[k], elem2[k])) continue;
                return false;
            }
            ;
            return true;
        } else {
            return false;
        }
        ;
    }
    ;

    //сравниваем числа, строки, логические константы, null, undefined
    return elem1 === elem2;
}

var H1 = {a: 5, b: {b1: 6, b2: 7}};
var H2 = {b: {b1: 6, b2: 7}, a: 5};
var H3 = {a: 5, b: {b1: 6}};
var H4 = {a: 5, b: {b1: 66, b2: 7}};
var H5 = {a: 5, b: {b1: 6, b2: 7, b3: 8}};
var H6 = {a: null, b: undefined, c: Number.NaN};
var H7 = {c: Number.NaN, b: undefined, a: null};
var H8 = {a: 5, b: 6};
var H9 = {c: 5, d: 6};
var H10 = {a: 5};
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];
console.log(Object.keys(A1));

console.log("deepComp(H1,H2) будет true" + ((deepComp(H1, H2)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n deepComp(H1,H3) будет false" + ((deepComp(H1, H3)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(H1,H4) будет false" + ((deepComp(H1, H4)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(H1,H5) будет false" + ((deepComp(H1, H5)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(H6,H7) будет true" + ((deepComp(H6, H7)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n deepComp(H8,H9) будет false" + ((deepComp(H8, H9)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(H8,H10) будет false" + ((deepComp(H8, H10)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(null,H10) будет false" + ((deepComp(null, H10)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(H10,null) будет false" + ((deepComp(H10, null)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(null,null) будет true" + ((deepComp(null, null)) ? "  --> Правильно!" : "  --> ! ОШИБКА !") +
    "\n deepComp(null,undefined) будет false" + ((deepComp(null, undefined)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(5,\"5\") будет false" + ((deepComp(5, "5")) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(5,H1) будет false" + ((deepComp(5, H1)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(A1,H1) будет false" + ((deepComp(A1, H1)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp(A2,A3) будет false" + ((deepComp(A2, A3)) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp( {a:5,b:undefined}, {a:5,c:undefined} ) будет false" + ((deepComp({a: 5, b: undefined}, {
        a: 5,
        c: undefined
    })) ? "  --> ! ОШИБКА !" : "  --> Правильно!") +
    "\n deepComp( [5,7], {0:5,1:7} ) будет false" + ((deepComp([5, 7], {
        0: 5,
        1: 7
    })) ? "  --> ! ОШИБКА !" : "  --> Правильно!")
);