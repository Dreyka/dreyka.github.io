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
            let i = 0;
            function rec(v) {
                if (v[i] !== v[v.length - (i + 1)]) return false;
                i++;
                if (i >= (v.length - 1) / 2) return true;
                return rec(v);
            }

            return rec(clearWord);
        }
        ;
        let word = prompt("Введите слово");
        console.log("*" + pal(word) + "*");
    }

)();
