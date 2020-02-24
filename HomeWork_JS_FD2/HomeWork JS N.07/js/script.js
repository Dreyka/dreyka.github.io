function numberV(words) {
    words = words.toLowerCase();
    let vovels = {"а": 1, "ё": 1, "у": 1, "е": 1, "ы": 1, "о": 1, "э": 1, "я": 1, "и": 1, "ю": 1};
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        if (words.charAt(i) in vovels) count++;
    }
    ;
    return count;
};

let word = prompt("Введите слова");
console.log("Итого " + numberV(word));
