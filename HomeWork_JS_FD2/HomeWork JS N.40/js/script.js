"use strict";

// В хэше clock параметры часов (циферблата, стрелок) и далее передаем этот хэш объкту класса Clock
let clock = {
    "numberOfHours": 12,
    "canvasObjAttr": {
        "width": 400,
        "height": 400,
    },
    "clockFace": {
        x: 200,
        y: 200,
        r: 200,
        fillStyle: "#fcca66",
    },
    "clockNumbers": {
        r: 25,
        delta: 0.9, // смещение цифр относительно окружности циферблата
        fillStyle: "#48b382",
    },
    "clockNumberstext": {
        fillStyle: "black",
        font: "normal 30px Arial",
        textAlign: "center",
        textBaseline: "middle",
    },
    "secondHand": {
        strokeStyle: "black",
        lineWidth: 2,
        delta: 0.9,//размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.15, // смещение стрелки относительно центра циферблата

        lineCap: "round",
    },
    "minuteHand": {
        strokeStyle: "black",
        lineWidth: 4,
        delta: 0.8,//размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.1,// смещение стрелки относительно центра циферблата
        lineCap: "round",
    },
    "hourHand": {
        strokeStyle: "black",
        lineWidth: 6,
        delta: 0.7, //размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.05,// смещение стрелки относительно центра циферблата
        lineCap: "round",
    },
    "digitalClock": {
        fillStyle: "black",
        font: "normal 30px Arial",
        textAlign: "center",
        textBaseline: "middle",
        deltaY: 0.5,// смещение цифровых часов по вертикали относительно центра циферблата
    }
};

function Clock(clock, parLink) {
    let self = this;
    let clockPar = clock;
    let parent = parLink;
    let soon = new Date();

//Приватный метод для присвоения атрибутов (прописаны в хэше clock)
    function constructorAttribute(hash, elemLink) {
        for (let k in hash) {
            elemLink.setAttribute(k, hash[k])
        }
        ;
    };

//Создаем программно тэг canvas и прописываем атрибуты (при помощи приватного метода constructorAttribute)
    let clockFace = document.createElement("canvas");
    constructorAttribute(clockPar.canvasObjAttr, clockFace);
    let context = clockFace.getContext("2d");
    parent.appendChild(clockFace);

//Функция для прорисовки часов (полностью)
    function createClockCanvas() {

// Рисуем циферблат
        context.fillStyle = clockPar.clockFace.fillStyle;
        context.beginPath();
        context.arc(clockPar.clockFace.x, clockPar.clockFace.y, clockPar.clockFace.r, 0, Math.PI * 2, false);
        context.fill();

//Циклом рисуем номера для часов
        for (let i = 1; i <= clockPar.numberOfHours; i++) {
            let position = {};
            position.x = clockPar.clockFace.x + (clockPar.clockFace.x - clockPar.clockNumbers.r) * clockPar.clockNumbers.delta * Math.sin(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
            position.y = clockPar.clockFace.y + (clockPar.clockFace.y - clockPar.clockNumbers.r) * clockPar.clockNumbers.delta * Math.cos(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
            context.fillStyle = clockPar.clockNumbers.fillStyle;
            context.beginPath();
            context.arc(position.x, position.y, clockPar.clockNumbers.r, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = clockPar.clockNumberstext.fillStyle;
            context.font = clockPar.clockNumberstext.font;
            context.textAlign = clockPar.clockNumberstext.textAlign;
            context.textBaseline = clockPar.clockNumberstext.textBaseline;
            context.fillText(i, position.x, position.y);
        }
        ;

        let soon = new Date();
        let sec = soon.getSeconds();
        let min = soon.getMinutes();
        let h = soon.getHours();

// Рисуем секундную стрелку
        context.strokeStyle = clockPar.secondHand.strokeStyle;
        context.lineWidth = clockPar.secondHand.lineWidth;
        context.lineCap = clockPar.secondHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.secondHand.offset * Math.sin(-(sec * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.secondHand.offset * Math.cos(-(sec * 360 / 60 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.secondHand.delta * Math.sin(-(sec * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.secondHand.delta * Math.cos(-(sec * 360 / 60 - 180) * Math.PI / 180));
        context.stroke();

// Рисуем минутную стрелку
        context.strokeStyle = clockPar.minuteHand.strokeStyle;
        context.lineWidth = clockPar.minuteHand.lineWidth;
        context.lineCap = clockPar.minuteHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.minuteHand.offset * Math.sin(-(min * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.minuteHand.offset * Math.cos(-(min * 360 / 60 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.minuteHand.delta * Math.sin(-(min * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.minuteHand.delta * Math.cos(-(min * 360 / 60 - 180) * Math.PI / 180));
        context.stroke();

// Рисуем часовую стрелку
        context.strokeStyle = clockPar.hourHand.strokeStyle;
        context.lineWidth = clockPar.hourHand.lineWidth;
        context.lineCap = clockPar.hourHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.hourHand.offset * Math.sin(-(h * 360 / clockPar.numberOfHours + min * 0.5 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.hourHand.offset * Math.cos(-(h * 360 / clockPar.numberOfHours + min * 0.5 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.hourHand.delta * Math.sin(-(h * 360 / clockPar.numberOfHours + min * 0.5 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.hourHand.delta * Math.cos(-(h * 360 / clockPar.numberOfHours + min * 0.5 - 180) * Math.PI / 180));
        context.stroke();

// Рисуем цифровые часы
        context.fillStyle = clockPar.digitalClock.fillStyle;
        context.font = clockPar.digitalClock.font;
        context.textAlign = clockPar.digitalClock.textAlign;
        context.textBaseline = clockPar.digitalClock.textBaseline;
        context.fillText(str0l(h, 2) + ":" + str0l(min, 2) + ":" + str0l(sec, 2), clockPar.clockFace.x, clockPar.clockFace.y * clockPar.digitalClock.deltaY);

        function str0l(val, len) {
            var strVal = val.toString();
            while (strVal.length < len)
                strVal = '0' + strVal;
            return strVal;
        };

        setTimeout(createClockCanvas, 1020 - soon.getMilliseconds());
    };

    setTimeout(createClockCanvas, 1020 - soon.getMilliseconds());
};

let myClock1 = new Clock(clock, document.getElementById('Items'));

