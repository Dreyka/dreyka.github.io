function numberForEach(words) {
    let wordsMass = words.toLowerCase().split("");
    let vovels = {"а": 1, "ё": 1, "у": 1, "е": 1, "ы": 1, "о": 1, "э": 1, "я": 1, "и": 1, "ю": 1};
    let count = 0;
    wordsMass.forEach((v, i, a) => (wordsMass[i] in vovels) ? count++ : count);
    return count;
};

function numberFilter(words) {
    let wordsMass = words.toLowerCase().split("");
    let vovels = {"а": 1, "ё": 1, "у": 1, "е": 1, "ы": 1, "о": 1, "э": 1, "я": 1, "и": 1, "ю": 1};
    return wordsMass.filter((v, i, a) => wordsMass[i] in vovels).length;
};

function numberReduce(words) {
    let wordsMass = words.toLowerCase().split("");
    let vovels = {"а": 1, "ё": 1, "у": 1, "е": 1, "ы": 1, "о": 1, "э": 1, "я": 1, "и": 1, "ю": 1};
    return wordsMass.reduce(((count, v, i, a) => (wordsMass[i] in vovels) ? ++count : count), 0);
};

let word = prompt("Введите слова");
console.log("Итого forEach " + numberForEach(word));
console.log("Итого filter " + numberFilter(word));
console.log("Итого reduce " + numberReduce(word));
