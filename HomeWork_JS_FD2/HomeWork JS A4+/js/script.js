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

            function rec(v) {
                let vL = v.length;
                if (vL <= 1) return true;
                if (v[0] !== v[vL - 1]) return false;
                v = v.slice(1, (vL - 1));
                return rec(v);
            }

            return rec(clearWord);
        }
        ;
        let word = prompt("Введите слово");
        console.log("*" + pal(word) + "*");
    }

)();
