let errors = ["`", "~", "!", " ", "@", "/", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "[", "{", "]", "}", ";", ":", "?", ",", ".", "<", ">", "|", " ", "'", '"', "\\"];
let errorsLn = errors.length;

function errFun(valueStr) {
    let valueStrM = valueStr.split("");
    let valueStrLn = valueStrM.length;
    for (var i = 0; i < errorsLn; i++) {
        for (var a = 0; a < valueStrLn; a++) {
            if (valueStrM[a] === errors[i]) {
                return false;
            }
        }
    }
};

let name = prompt("Введите ваше имя");
console.log(errFun(name));
while (errFun(name) === false) {
    name = prompt("Введите имя привильно!");
}
let surname = prompt("Введите вашу фамилию");
while (errFun(surname) === false) {
    surname = prompt("Введите фамилию правильно!");
}
let patronymic = prompt("Введите ваше отчество");
while (errFun(patronymic) === false) {
    patronymic = prompt("Введите отчество правильно!");
}
let sex = confirm("Если ваш пол - женский нажмите Да, если мужской нажмите Отмена"),
    age = Number(prompt("Введите ваш возраст")), pension;
while (!isFinite(age) || (age <= 0)) {
    age = Number(prompt("Введиде только положительное число лет"));
}
pension = ((sex === true && (age >= 55)) || (sex === false && (age >= 65))) ? pension = "да" : pension = "нет";
sex = (sex === true) ? sex = "женский" : sex = "мужской";
alert("ваше ФИО: " + name + " " + surname + " " + patronymic + "\nваш возраст в годах: " + age + "\nваш возраст в днях: " + (age * 365) + "\nчерез 5 лет вам будет: " + (age + 5) + "\nваш пол: " + sex + "\nвы на пенсии: " + pension);
