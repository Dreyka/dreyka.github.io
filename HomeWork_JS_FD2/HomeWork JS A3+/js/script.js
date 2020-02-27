(function () {
    function pal(valueStr) {
        valueStr = valueStr.toLowerCase().trim();
        let symbol = {" ": 1, ",": 1, ".": 1, ":": 1, ";": 1, "ь": 1, "ъ": 1, "!": 1, "?": 1};
        for (let i = 0; i < valueStr.length; i++) {
            let v = valueStr[i];
            if (v === "ё") valueStr = valueStr.replace(v, "е");
            if (v in symbol) {
                valueStr = valueStr.replace(v, "");
                i--;
            }
            ;
        }
        ;
        for (let i = 0; i < valueStr.length / 2; i++) {
            if (valueStr[i] !== valueStr[valueStr.length - (i + 1)]) return "Слово не палиндром!";
        }
        ;
        return "Палиндром!";
    };
    let word = prompt("Введите слово");
    console.log("*" + pal(word) + "*");
})();
