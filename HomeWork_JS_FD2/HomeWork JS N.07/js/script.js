function numberV(words) {
    words = words.toLowerCase();
    let vovels = ["а", "ё", "у", "е", "ы", "о", "э", "я", "и", "ю"];
    let count = 0;
    for (let i = 0; i < vovels.length; i++) {
        let b = words.indexOf(vovels[i]);
        while (b > (-1)) {
            count++;
            words = words.replace(vovels[i], "");
            b = words.indexOf(vovels[i]);
        }
    }
    ;
    return count;
};

let word = prompt("Введите слова");
console.log("Итого " + numberV(word));
