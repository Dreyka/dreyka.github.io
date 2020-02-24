// function del(valueStr) {
//     while (valueStr.indexOf(" ", 0) != -1) {
//         valueStr = valueStr.replace(" ", "");
//     }
//     while (valueStr.indexOf(" ", valueStr.length) != -1) {
//         valueStr = velueStr.substr(0, valueStr.length - 1);
//     }
//     return valueStr;
// };
(function () {
    function del(valueStr) {
        while (valueStr[0] === " " || valueStr[valueStr.length - 1] === " ") {
            let a = valueStr[0];
            let b = valueStr[valueStr.length - 1];
            // console.log(a, b);
            if (a === " " && b !== " ") {
                valueStr = valueStr.substr(1, valueStr.length - 1);
                // console.log(valueStr);
            } else if (a === " " && b === " ") {
                valueStr = valueStr.substr(1, valueStr.length - 2);
                // console.log(valueStr);
            } else if (a !== " " && b === " ") {
                valueStr = valueStr.substr(0, valueStr.length - 2);
                // console.log(valueStr);
            }
        }
        return valueStr;
    };
    let word = prompt("Введите слова");
    console.log("*" + del(word) + "*");
    alert("*" + del(word) + "*");
})();
