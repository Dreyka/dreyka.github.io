"use strict";

let mmm = new Map();
mmm.set(["noname"], {points: 110, dif: "hard"});
mmm.set(["noname"], {points: 110, dif: "hard"});
console.log(mmm);
let mmmJSON = JSON.stringify(mmm);
console.log(mmmJSON);
console.log(JSON.parse(mmmJSON));
let mass = [{name: "noname", points: 110, dif: "hard"}, {name: "Andrei", points: 1230, dif: "hard"}];
let massJSON = JSON.stringify(mass);
console.log(massJSON);
console.log(JSON.parse(massJSON));

// Константы
let options = {
    //Параметры отображения игровых очков
    points: {
        color: "#ffffff",
        fontWeight: "bold",
        fontFamily: "Roboto",
        size: 0.015,// размер шрифта - в относительных единицах (будем брать относительно ширины игрового поля)
        x: 0.8,
        y: 0.025
    },
    // Параметры самолета
    plane: {
        width: 0.05, // ширина - в относительных единицах (будем брать относительно ширины игрового поля)
        height: 0.05, // высота - в относительных единицах (будем брать относительно ширины игрового поля)
        speedX: 0.0035,
        speedY: 0.0035,
        health: 50,
        fireSpeed: 10, // скорострельность (задержка между выстрелами, чем больше значение тем медленнее стреляем)
        // Параметры левой пули самолета
        bulletLeft: {
            width: 0.07, // ширина - в относительных единицах (будем брать относительно ширины самолета)
            height: 0.2, // высота - в относительных единицах (будем брать относительно высоты самолета)
            speedY: 0.003, // Скорость пули(только по оси Y)
            damage: 3,  // Урон пули
            x: 0.25, // Место вылета пули (относительно ширины самолета)
            y: 0.2 // Место вылета пули (относительно высоты самолета)
        },
        // Параметры правой пули самолета
        bulletRight: {
            width: 0.07, // ширина - в относительных единицах (будем брать относительно ширины самолета)
            height: 0.2, // высота - в относительных единицах (будем брать относительно высоты самолета)
            speedY: 0.003, // Скорость пули
            damage: 3, // Урон пули
            x: 0.75, // Место вылета пули (относительно ширины самолета)
            y: 0.2 // Место вылета пули (относительно высоты самолета)
        },
        planeDamage: {
            damageSize: 0.003, // Максимальный размер столкновения - в относительных единицах (будем брать относительно ширины игрового поля)
            damageSizeStart: 0, // Начальный размер столкновения
            damageSpeedLowSize: 0.2, // Скорость изменения столкновения
        },
        view: {
            image: "img/plane.svg"
        },
        fireView: {
            color: "#59cdff"
        },
        damagedScreen: {
            opacity: 1,
            opacitySpeed: 0.01,
            gradSize: 0.7, // размер градиента - в относительных единицах (будем брать относительно ширины игрового поля)
            view: {
                color: "rgba(255,0,0,",
            }
        },
        lineHealth: {
            width: 0.15,
            height: 0.02,
            x: 0.80,
            y: 0.05,
            view: {
                color: "rgba(255,0,0,0.65)",
                colorBackground: "rgba(130,130,130,0.65)"
            }
        }
    },
    // Параметры маленького НЛО
    ufoSmall: {
        width: 0.03, // ширина - в относительных единицах (будем брать относительно ширины игрового поля)
        height: 0.013, // высота - в относительных единицах (будем брать относительно ширины игрового поля)
        speedMinX: -10, // Минимальная скорость по оси X (скорость задается случайно через randomDiap, в относительных единицах (будем брать относительно ширины игрового поля))
        speedMaxX: 10, // Максимальная скорость по оси X (скорость задается случайно через randomDiap)
        speedY: 0.0003, // Скорость по оси Y - в относительных единицах (будем брать относительно ширины игрового поля)
        health: 10,
        points: 100,
        fireSpeed: 2000, // скорострельность (задержка между выстрелами, чем больше значение тем медленнее стреляем)
        // Параметры левой пули самолета
        bullet: {
            width: 0.1, // ширина - в относительных единицах (будем брать относительно ширины НЛО)
            height: 0.40, // высота - в относительных единицах (будем брать относительно высоты НЛО)
            speedY: 0.0017, // Скорость пули(только по оси Y)
            damage: 3,  // Урон пули
            x: 0.5, // Место вылета пули (относительно ширины НЛО)
            y: 1, // Место вылета пули (относительно высоты НЛО)
            view: "red",
        },
        damageSize: 0.003, // Максимальный размер столкновения - в относительных единицах (будем брать относительно ширины игрового поля)
        damageSizeStart: 0, // Начальный размер столкновения
        damageSpeedLowSize: 0.2, // Скорость изменения столкновения
        view: {
            image: "img/ufoSmall.svg"
        },
        explosion: {
            damageSize: 1, // Максимальный размер столкновения - в относительных единицах (будем брать относительно ширины игрового поля)
            damageSizeStart: 0.5, // Начальный размер столкновения
            damageSpeedLowSize: 1.5, // Скорость изменения столкновения
            view: {
                color1: "#ffffff",
                color2: "#ffe600",
                color3: "#ff9400",
                color4: "rgba(255,30,0,0.71)",
            }
        }

    },
    star: {
        size: 2, // Размер звезды максимальный (устанавливаем через Matt.random)
        speedY: 0.1, // Скорость звезды максимальная (устанавливаем через Matt.random)
        amount: {
            display1: [1200, 600],
            display2: [900, 450],
            display3: [600, 300],
            display4: 200
        },  // Число звезд на экране
        view: {
            color: "#ffffff",
        }
    }
}

//Функции для записи на сервер
function ins() {
    let mass = [{name: "noname", points: 110, dif: "hard"}, {name: "Andrei", points: 1230, dif: "hard"}];
    let massJSON = JSON.stringify(mass);
    let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let tableBody = null;
    let searchParams = new URLSearchParams();
    searchParams.append("f", "INSERT");
    searchParams.append("n", "BULYHA_GAME_UFO_SCORE");
    searchParams.append("v", massJSON);
    fetch(ajaxLink, {method: "post", body: searchParams})
        .then(response => response.json())
.catch(error => alert("Возникла неисправность!"));
}
function insDiffOpt() {
    let mass = null;
    let massJSON = JSON.stringify(mass);
    let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let tableBody = null;
    let searchParams = new URLSearchParams();
    searchParams.append("f", "INSERT");
    searchParams.append("n", "BULYHA_GAME_UFO_HARD");
    searchParams.append("v", massJSON);
    fetch(ajaxLink, {method: "post", body: searchParams})
        .then(response => response.json())
.catch(error => alert("Возникла неисправность!"));
}
function qwe() {
    let mass = [{name: "noname", points: 110, dif: "hard"}, {name: "Andrei", points: 1230, dif: "hard"}];
    let massJSON = JSON.stringify(mass);
    let searchParamsLOCKGET = new URLSearchParams();
    let searchParamsUPDATE = new URLSearchParams();
    let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let password = Math.random();
    searchParamsLOCKGET.append("f", "LOCKGET");
    searchParamsLOCKGET.append("n", "BULYHA_GAME_UFO_SCORE");
    searchParamsLOCKGET.append("p", password);
    searchParamsUPDATE.append("f", "UPDATE");
    searchParamsUPDATE.append("n", "BULYHA_GAME_UFO_SCORE");
    searchParamsUPDATE.append("p", password);
    searchParamsUPDATE.append("v", massJSON);

    function comparePoints(a, b) {
        return a.points - b.points;
    };
    fetch(ajaxLink, {method: "post", body: searchParamsLOCKGET})
        .then(response => response.json())
.then(data => {
        console.log(data)
    // score = JSON.parse(data.result);
    // score.push({name: player, points: self.ufo.Points.points, dif: diffGame});
    // score.sort(comparePoints);
    return fetch(ajaxLink, {method: "post", body: searchParamsUPDATE})
}).then(response => switchToMainPage())
.catch(error => alert("Возникла неисправность!"));
}


