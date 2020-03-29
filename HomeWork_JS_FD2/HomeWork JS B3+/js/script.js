let mass = [];
let mathValue = {"(": true, ")": true, "+": true, "-": true, "*": true, "/": true};

// Функция sk для 0 элемента (из mathValue)
function sk(sim, str, i) {
    mass.push(sim);
    return str.slice(1);
};
// Функция skNum для всех остальных элементов (из mathValue)
function skNum(sim, str, i) {
    mass.push(str.slice(0, i), sim);
    return str.slice(i + 1);
};

// let str = "(0.6783+(9.003*(4-7))";
let str = "0.6783+9.003*4-7+9*4.5/10";

// Циклом пробегаем по каждому символу и если символ соответствует хэшу mathValue "режим строку"
for (let i = 0; i < str.length;) {
    if (str[i] in mathValue) {
        if (i === 0) {
            str = sk(str[i], str, i);
            // console.log(str, i);
            i = 0;
            continue;
        }
        ;
        str = skNum(str[i], str, i);
        // console.log(str, i);
        i = 0;
        continue;
    }
    ;

    // Добавляем последнее число в наш массив
    if (i === (str.length - 1) && !(str[i] in mathValue)) {
        mass.push(str);
    }
    i++;
}
console.log(mass);

// Функция calc может выполнять арифметические операции (кроме скобок)
function calc(mass, m=0) {
    let summ;
    for (let i = 0; i < mass.length;) {
        if (mass[i] === "*") {
            summ = Number(mass[i - 1]) * Number(mass[i + 1]);
            mass.splice(i - 1, 3, summ);
            i = i;
            // console.log(mass);
            continue;
        }
        ;
        if (mass[i] === "/") {
            summ = Number(mass[i - 1]) / Number(mass[i + 1]);
            mass.splice(i - 1, 3, summ);
            i = i;
            // console.log(mass);
            continue;
        }
        ;
        i++;
    }
    ;
    for (let i = 0; i < mass.length;) {
        if (mass[i] === "+") {
            summ = Number(mass[i - 1]) + Number(mass[i + 1]);
            mass.splice(i - 1, 3, summ);
            i = i;
            // console.log(mass);
            continue;
        }
        ;
        if (mass[i] === "-") {
            summ = Number(mass[i - 1]) - Number(mass[i + 1]);
            mass.splice(i - 1, 3, summ);
            i = i;
            // console.log(mass);
            continue;
        }
        ;
        i++;
    }
    ;
    return Number(mass[0]);
};

console.log("Значение выражения  0.6783+9.003*4-7+9*4.5/10  через нашу функцию calc   "+calc(mass));
console.log("Значение выражения  0.6783+9.003*4-7+9*4.5/10  через нашу функцию eval   "+eval("0.6783+9.003*4-7+9*4.5/10"));