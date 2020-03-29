"use strict";

// Функция-обработчик ruleClearText проверяет пустое поле, если поле пустое то выводим сообщение.
function ruleClearText(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let nameError = "warningRuleClearText";

    if (value.length === 0) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Поле должно быть заполнено!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleLongText20 проверяет число символов в строке, если число символов больше 20 выводим сообщение.
function ruleLongText20(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let nameError = "warningRuleLongText20";

    if (value.length > 20) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Текст не может быть больше 20 символов!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleBadSymbol недопустимые символы в строке, если такие символы есть выводим сообщение.
function ruleBadSymbol(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let badSymbol = {"?": 1, "/": 1, "!": 1, "#": 1, "$": 1, "%": 1, "^": 1, "(": 1, ")": 1, "`": 1};
    let nameError = "warningRuleBadSymbol";

    for (let i = 0; i < value.length; i++) {
        if (value.charAt(i) in badSymbol) {
            if (parent.getElementsByClassName(nameError).length === 0) {
                err = document.createElement("span");
                err.appendChild(document.createTextNode("Текст не может содержать символы: ?/!#$%^"));
                err.className = nameError;
                parent.appendChild(err);
                return;
            }
            ;
            return;
        }
        ;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleInteger проверяет дробное число или нет, если дробное выводим сообщение.
function ruleInteger(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = Number(this.value.trim());
    let nameError = "warningRuleInteger";

    function isInteger(value) {
        return (value ^ 0) === value;
    }

    if (!isInteger(value)) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Число должно быть целым!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleNegativeNumber проверяет отрицательные числа, если отрицательное выводим сообщение.
function ruleNegativeNumber(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = Number(this.value.trim());
    let nameError = "warningNegativeNumber";

    function isInteger(value) {
        return (value ^ 0) === value;
    }

    if (value < 1) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Число должно быть больше 0!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleMail проверяет есть ли @, если нет выводим сообщение.
function ruleMail(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let nameError = "warningMail";


    if (value.indexOf("@") === -1) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Введите почту правильно!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleMail проверяет есть ли www., если нет выводим сообщение.
function ruleURL(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let nameError = "warningURL";


    if (value.indexOf("www.") === -1) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Введите ссылку сайта правильно(сайт должен начинаться на www.)!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleShortText30 проверяет число символов в строке, если число символов менее 30 выводим сообщение.
function ruleShortText30(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value.trim();
    let nameError = "warningRuleShortText30";

    if (value.length < 30) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Текст слишком короткий!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик checkboxReviews проверяет выбран ли checkbox, если нет выводим сообщение.
function checkboxReviews(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.checked;
    let nameError = "warningCheckboxReviews";

    if (!value) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Лучше разрешить отзывы)"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleRadio проверяет пустое значение radio-группы , если да выводим сообщение.
function ruleRadio(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let infoWebsite = document.forms.infoWEB;
    let placingRadio = infoWebsite.elements.placing;
    let value = placingRadio.value;
    let nameError = "warningRuleRadio";

    if (value === "") {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Выберите размещение"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик ruleMail проверяет есть ли www., если нет выводим сообщение.
function ruleSelect(EO) {
    EO = EO || window.event;

    let err;
    let parent = this.parentNode;
    let value = this.value;
    let nameError = "warningRuleSelect";

    if (!(value ==="3")) {
        if (parent.getElementsByClassName(nameError).length === 0) {
            err = document.createElement("span");
            err.appendChild(document.createTextNode("Здоровье главнее всего!"));
            err.className = nameError;
            parent.appendChild(err);
            return;
        }
        ;
        return;
    }
    ;
    let rem = parent.getElementsByClassName(nameError);
    if (rem.length > 0) parent.removeChild(rem[0]);
}

// Функция-обработчик validForm проверяет все поля.
// Создаем свое событие new CustomEvent("valid", {bubbles: true}), вызываем свое событие через dispatchEvent
// и потом ловим это событие через addEventListener (по какой-то причине addEventListener работает нормально когда
// в коде он расположен выше чем dispatchEvent).
// После отработки нашего события смотрим есть ли сообщение о ошибке и если есть "фокусируемся".
// В самом конце проверяем всю форму на наличие сообщений об ошибке, если есть ошибки запрещаем отправку формы на сервер.
function validForm(EO) {
    let valid = new CustomEvent("valid", {bubbles: true});

    let infoWebsite = document.forms.infoWEB;
    let developer = document.getElementById("Developer");
    let nameWebsite = document.getElementById("NameWebsite");
    let webURL = document.getElementById("WebURL");
    let dateStart = document.getElementById("DateStart");
    let visitors = document.getElementById("Visitors");
    let mail = document.getElementById("Mail");
    let heading = document.getElementById("Heading");
    let placing1 = document.getElementById("Placing1");
    let placing2 = document.getElementById("Placing2");
    let placing3 = document.getElementById("Placing3");
    let reviews = document.getElementById("Reviews");
    let description = document.getElementById("Description");

    description.addEventListener("valid", ruleShortText30, false);
    description.dispatchEvent(valid);
    if (description.parentNode.querySelectorAll('span[class^="warning"]').length > 0) description.focus();

    reviews.addEventListener("valid", checkboxReviews, false);
    reviews.dispatchEvent(valid);
    if (reviews.parentNode.querySelectorAll('span[class^="warning"]').length > 0) reviews.focus();

    placing1.addEventListener("valid", ruleRadio, false);
    placing2.addEventListener("valid", ruleRadio, false);
    placing3.addEventListener("valid", ruleRadio, false);
    placing1.dispatchEvent(valid);
    placing2.dispatchEvent(valid);
    placing3.dispatchEvent(valid);
    if (placing1.parentNode.querySelectorAll('span[class^="warning"]').length > 0) placing1.focus();

    heading.addEventListener("valid", ruleSelect, false);
    heading.dispatchEvent(valid);
    if (heading.parentNode.querySelectorAll('span[class^="warning"]').length > 0) heading.focus();

    mail.addEventListener("valid", ruleClearText, false);
    mail.addEventListener("valid", ruleMail, false);
    mail.dispatchEvent(valid);
    if (mail.parentNode.querySelectorAll('span[class^="warning"]').length > 0) mail.focus();

    visitors.addEventListener("valid", ruleClearText, false);
    visitors.addEventListener("valid", ruleInteger, false);
    visitors.addEventListener("valid", ruleNegativeNumber, false);
    visitors.dispatchEvent(valid);
    if (visitors.parentNode.querySelectorAll('span[class^="warning"]').length > 0) visitors.focus();

    dateStart.addEventListener("valid", ruleClearText, false);
    dateStart.dispatchEvent(valid);
    if (dateStart.parentNode.querySelectorAll('span[class^="warning"]').length > 0) dateStart.focus();

    webURL.addEventListener("valid", ruleClearText, false);
    webURL.addEventListener("valid", ruleURL, false);
    webURL.dispatchEvent(valid);
    if (webURL.parentNode.querySelectorAll('span[class^="warning"]').length > 0) webURL.focus();

    nameWebsite.addEventListener("valid", ruleClearText, false);
    nameWebsite.addEventListener("valid", ruleBadSymbol, false);
    nameWebsite.dispatchEvent(valid);
    if (nameWebsite.parentNode.querySelectorAll('span[class^="warning"]').length > 0) nameWebsite.focus();


    developer.addEventListener("valid", ruleClearText, false);
    developer.addEventListener("valid", ruleBadSymbol, false);
    developer.addEventListener("valid", ruleLongText20, false);
    developer.dispatchEvent(valid);
    if (developer.parentNode.querySelectorAll('span[class^="warning"]').length > 0) developer.focus();


    if (infoWebsite.querySelectorAll('span[class^="warning"]').length > 0) EO.preventDefault();
}

let infoWebsite = document.forms.infoWEB;
let developer = document.getElementById("Developer");
let nameWebsite = document.getElementById("NameWebsite");
let webURL = document.getElementById("WebURL");
let dateStart = document.getElementById("DateStart");
let visitors = document.getElementById("Visitors");
let mail = document.getElementById("Mail");
let heading = document.getElementById("Heading");
let placing1 = document.getElementById("Placing1");
let placing2 = document.getElementById("Placing2");
let placing3 = document.getElementById("Placing3");
let reviews = document.getElementById("Reviews");
let description = document.getElementById("Description");
let submit = document.getElementById("SubmitForm");

developer.addEventListener("blur", ruleClearText, false);
developer.addEventListener("blur", ruleBadSymbol, false);
developer.addEventListener("blur", ruleLongText20, false);

nameWebsite.addEventListener("blur", ruleClearText, false);
nameWebsite.addEventListener("blur", ruleBadSymbol, false);

webURL.addEventListener("blur", ruleClearText, false);
webURL.addEventListener("blur", ruleURL, false);

dateStart.addEventListener("blur", ruleClearText, false);

visitors.addEventListener("blur", ruleClearText, false);
visitors.addEventListener("blur", ruleInteger, false);
visitors.addEventListener("blur", ruleNegativeNumber, false);

mail.addEventListener("blur", ruleClearText, false);
mail.addEventListener("blur", ruleMail, false);

heading.addEventListener("input", ruleSelect, false);

placing1.addEventListener("input", ruleRadio, false);
placing2.addEventListener("input", ruleRadio, false);
placing3.addEventListener("input", ruleRadio, false);

reviews.addEventListener("input", checkboxReviews, false);

description.addEventListener("blur", ruleShortText30, false);

submit.addEventListener("click", validForm, false);

