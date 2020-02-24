(function () {
    function del(valueStr) {
        let countPre = 0;
        for (let i = 0; valueStr[i] === " "; i++) {
            countPre++;
        }
        let countPost = 0;
        for (let i = valueStr.length - 1; valueStr[i] === " "; i--) {
            countPost++;
        }
        return valueStr = valueStr.substr(countPre, valueStr.length - (countPost + countPre));
    };
    let word = prompt("Введите слова");
    console.log("*" + del(word) + "*");
    alert("*" + del(word) + "*");
})();
