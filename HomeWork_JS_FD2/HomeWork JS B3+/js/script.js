
let str=["(45-93)/(76+5*(4.79-7*0.1))+45-6.7", "(0.6783+(9.003*(4-7)))", "0.6783+9.003*4-7+9*4.5/10", "2*(-11+3)"]
function calculator(str) {
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

    // Циклом пробегаем по каждому символу строки и если символ соответствует хэшу mathValue то по этому символу "режим строку"
    for (let i = 0; i < str.length;) {
        if (str[i] in mathValue) {
            if (i === 0) {
                str = sk(str[i], str, i);
                i = 0;
                continue;
            }
            ;
            str = skNum(str[i], str, i);
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

    // Выводим получившийся массив
    console.log(mass);

    // При помощи функции priority выполняем операции со скобками
    function priority(mass, m) {

        // Функция calc может выполнять арифметические операции (кроме скобок)
        function calc(mass) {
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
                if (mass[i] === "-" && i === 0) {
                    summ = 0 - Number(mass[i + 1]);
                    mass.splice(i, 2, summ);
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

        let posSkLeft = m;
        let posSkRight;
        for (i = posSkLeft; i < mass.length; i++) {
            if (mass[i] === "(") {
                posSkLeft = i;
                priority(mass, m = (posSkLeft + 1));
            }
            if (mass[i] === ")") {
                posSkRight = i;
                let massFrag = mass.slice(posSkLeft, posSkRight);
                // console.log(massFrag);
                mass.splice(posSkLeft - 1, posSkRight - (posSkLeft - 1) + 1, calc(massFrag));
                // console.log(mass);
            }
        }
        if (!(mass.indexOf("(") === (-1))) {
            priority(mass, m = 0);
        }
        return calc(mass);
    }

    return priority(mass, m = 0);
}

for (let i= 0; i<str.length;i++){
    console.log("Значение выражения "+ str[i] +" через нашу функцию calc   " + calculator(str[i]));
    console.log("Значение выражения "+ str[i] +" через нашу функцию eval   " + eval(str[i])+
        "\n---------------------------------------------------------------------------------------");
}
