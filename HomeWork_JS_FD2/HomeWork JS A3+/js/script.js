(function () {
        function pal(valueStr) {
            valueStr = valueStr.toLowerCase().trim();
            let symbol = {" ": 1, ",": 1, ".": 1, ":": 1, ";": 1, "ь": 1, "ъ": 1, "!": 1, "?": 1};
            let clearWord = "";
            for (let i = 0; i < valueStr.length; i++) {
                let v = valueStr[i];
                if (v === "ё") {
                    clearWord = clearWord + "е";
                } else if (!(v in symbol)) {
                    clearWord = clearWord + v;
                }
                ;
            }
            ;
            for (let i = 0; i < (clearWord.length - 1) / 2; i++) {
                if (clearWord[i] !== clearWord[clearWord.length - (i + 1)]) return false;
            }
            ;
            return true;
        }
        ;
        let word = prompt("Введите слово");
        console.log("*" + pal(word) + "*");
    }

)();
