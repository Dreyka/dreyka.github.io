function del(valueStr) {
    while (valueStr.indexOf(" ", 0) != -1) {
        valueStr = valueStr.replace(" ", "");
    }
    while (valueStr.indexOf(" ", valueStr.length) != -1) {
        valueStr = velueStr.substr(0, valueStr.length - 1);
    }
    return valueStr;
};

let word = prompt("Введите слова");
alert("*" + del(word) + "*");