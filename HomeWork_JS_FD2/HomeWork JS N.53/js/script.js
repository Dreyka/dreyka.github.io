"use strict";

let drinkStorage = new LocStorage("drinkStorage");
let foodStorage = new LocStorage("foodStorage");

document.getElementById("AddDrink").addEventListener("click", add);
document.getElementById("SearchDrink").addEventListener("click", search);
document.getElementById("DeleteKeyDrink").addEventListener("click", deleteKey);
document.getElementById("ListKeysDrink").addEventListener("click", listKeys);
document.getElementById("TestDrink").addEventListener("click", test);

document.getElementById("AddFood").addEventListener("click", addFood);
document.getElementById("SearchFood").addEventListener("click", searchFood);
document.getElementById("DeleteKeyFood").addEventListener("click", deleteKeyFood);
document.getElementById("ListKeysFood").addEventListener("click", listKeysFood);
document.getElementById("TestFood").addEventListener("click", testFood);

function add() {
    let a = prompt("Введите название напитка");
    let b = confirm("Напиток является алкогольным, если Да то нажмите ОК, если Нет то нажмите Отмена");
    let c = prompt("Введите рецепт напитка");
    drinkStorage.addValue(a, [b, c]);
};

function addFood() {
    let a = prompt("Введите название блюда");
    let b = confirm("Блюдо является съедобным, если Да то нажмите ОК, если Нет то нажмите Отмена");
    let c = prompt("Введите рецепт блюда");
    foodStorage.addValue(a, [b, c]);
};

function search() {
    let a = prompt("Введите название напитка и мы проверим наличие");
    let drink = drinkStorage.getValue(a);
    if (drink) {
        let alco = (drink[0]) ? "Да" : "Нет";
        alert("напиток: " + a +
            "\nалкогольный: " + alco +
            "\nрецепт приготовления: " + drink[1]);
    } else {
        alert(a + " нет!");
    }
    ;
};

function searchFood() {
    let a = prompt("Введите название блюда и мы проверим наличие");
    let food = foodStorage.getValue(a);
    if (food) {
        let alco = (food[0]) ? "Да" : "Нет";
        alert("блюдо: " + a +
            "\nсъедобный: " + alco +
            "\nрецепт приготовления: " + food[1]);
    } else {
        alert(a + " нет!");
    }
    ;
};

function deleteKey() {
    let a = prompt("Введите название напитка и мы удалим его");
    if (drinkStorage.deleteValue(a)) {
        alert(a + " удален!");
    } else {
        alert(a + " удалять нечего!");
    }
    ;

};

function deleteKeyFood() {
    let a = prompt("Введите название напитка и мы удалим его");
    if (foodStorage.deleteValue(a)) {
        alert(a + " удален!");
    } else {
        alert(a + " удалять нечего!");
    }
    ;

};

function listKeys() {
    alert(drinkStorage.getKeys());
};

function listKeysFood() {
    alert(foodStorage.getKeys());
};

function test() {
    drinkStorage.addValue("Вода", [false, "H2O"])
        .addValue("Пиво", [true, "Вода, солод, дрожжи, хмель"])
        .addValue("Сок", [false, "Вода, сахар, фруктовый сок"])
        .addValue("Лонг айленд айс ти", [true, "Водка, джин, ром, текила, ликер, сироп, кола"]);
    console.log(drinkStorage.storage);
};

function testFood() {
    foodStorage.addValue("Курица", [false, "Филе курицы"])
        .addValue("Лазанья", [true, "Листы для лазаньи, Фарш мясной (говяжий) , Морковь , Томатная паста"])
        .addValue("Ризотто", [false, "Грибы, тонко нарезанные, Куриные грудки, филе, нарезанное кусочками, Перец черный молотый"])
        .addValue("Суши", [true, "Рис круглозерный (для суши), Огурец свежий, ром, Тунец свежий, Лосось свежий, Нори , Уксус рисовый"]);
    console.log(foodStorage.storage);
};


