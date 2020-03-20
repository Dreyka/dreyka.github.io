"use strict";
var formDef1 =
    [
        {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
        {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
        {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
        {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                text: 'бытовая техника',
                value: 3
            }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
        },
        {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
        {label: 'Описание сайта:', kind: 'memo', name: 'description'},
        {label: 'Опубликовать:', kind: 'submit'},
    ];

var formDef2 =
    [
        {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
        {label: 'Имя:', kind: 'longtext', name: 'firstname'},
        {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
        {label: 'Возраст:', kind: 'number', name: 'age'},
        {label: 'Зарегистрироваться:', kind: 'submit'},
    ];

function form(mass) {
    let newTagForm = document.createElement("form");
    newTagForm.setAttribute("action", "https://fe.it-academy.by/TestForm.php");
    newTagForm.setAttribute("method", "post");
    let bodyPar = document.getElementById('Forms');

// Функция addOption для построения select option

    function addOption(mass, elem) {
        let option;
        for (let i = 0; i < mass.length; i++) {
            for (let k in mass[i]) {
                if (k === "text") {
                    option = document.createElement("option");
                    option.appendChild(document.createTextNode(mass[i][k]));
                    elem.appendChild(option);
                }
                if (k === "value") {
                    option.setAttribute("name", mass[i][k]);
                }
            }
        }
    }

// Функция addRadio для построения input(radio) и span

    function addRadio(mass, elem, name) {
        let radio;
        for (let i = 0; i < mass.length; i++) {
            for (let k in mass[i]) {
                if (k === "text") {
                    radio = document.createElement("input");
                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", name);
                    elem.appendChild(radio);
                    let span = document.createElement("span");
                    elem.appendChild(span);
                    span.appendChild(document.createTextNode(mass[i][k]));
                }
                if (k === "value") {
                    radio.setAttribute("value", mass[i][k]);
                }
            }
        }
    }

    for (let i = 0; i < mass.length; i++) {
        let label;
        let elem;
        for (let k in mass[i]) {
            if (k === "label" && mass[i].kind === 'submit') {
                label = document.createElement("input");
                label.setAttribute("type", "submit");
                label.setAttribute("value", mass[i][k]);
                newTagForm.appendChild(label);
                continue;
            }
            ;
            if (k === "label") {
                label = document.createElement("label");
                label.appendChild(document.createTextNode(mass[i][k]));
                newTagForm.appendChild(label);
                continue;
            }
            ;
            if (k === "kind") {
                if (mass[i][k] === 'longtext') {
                    elem = document.createElement("input");
                    label.appendChild(elem);
                    elem.setAttribute("type", "text");
                    continue;
                }
                ;
                if (mass[i][k] === 'shorttext') {
                    elem = document.createElement("input");
                    label.appendChild(elem);
                    elem.setAttribute("type", "text");
                    elem.setAttribute("class", "shorttext");
                    continue;
                }
                ;
                if (mass[i][k] === 'number') {
                    elem = document.createElement("input");
                    label.appendChild(elem);
                    elem.setAttribute("type", "number");
                    continue;
                }
                ;
                if (mass[i][k] === 'combo') {
                    elem = document.createElement("select");
                    label.appendChild(elem);
                    continue;
                }
                ;
                if (mass[i][k] === 'radio') {
                    elem = label;
                    continue;
                }
                ;
                if (mass[i][k] === 'check') {
                    elem = document.createElement("input");
                    label.appendChild(elem);
                    elem.setAttribute("type", "checkbox");
                    continue;
                }
                ;
                if (mass[i][k] === 'memo') {
                    elem = document.createElement("textarea");
                    label.appendChild(elem);
                    continue;
                }
                ;
            }
            ;
            if (k === "variants") {
                if (mass[i].kind === 'combo') {
                    addOption(mass[i][k], elem);
                    continue;
                }
                ;
                if (mass[i].kind === 'radio') {
                    let name = mass[i].name;
                    addRadio(mass[i][k], label, name);
                    continue;
                }
                ;
            }
            ;
            if (k === "name") {
                elem.setAttribute("name", mass[i][k]);
                continue;
            }
            ;

        }
    }
    bodyPar.appendChild(newTagForm);
}

form(formDef1);
form(formDef2);