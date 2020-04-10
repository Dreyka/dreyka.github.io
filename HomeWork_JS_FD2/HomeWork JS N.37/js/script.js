"use strict";

// В хэше clock задаем стили и размеры элементов (циферблата, стрелок) и далее передаем этот хэш объкту класса Clock
let clock = {
    "numberOfHours": 12,
    "clockFace": {
        "cx": 200,
        "cy": 200,
        "r": 200,
        "fill": "#fcca66",
    },
    "clockNumbers": {
        "r": 25,
        "fill": "#48b382",
    },
    "clockNumberstext": {
        "fill": "black",
        "font-size": 30,
        "line-height": 30,
        "text-anchor": "middle",
    },
    "secondHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 2,
    },
    "minuteHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 4,
    },
    "hourHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 6,
    },
    "digitalClock": {
        "fill": "black",
        "font-size": 30,
        "line-height": 30,
        "text-anchor": "middle",
    }
};

function Clock(clock, parLink) {
    let self = this;
    let clockPar = clock;
    let parent = parLink;

//Приватный метод для присвоения атрибутов (стили прописаны в хэше clock)
    function constructorAttribute(hash, elemLink) {
        for (let k in hash) {
            elemLink.setAttribute(k, hash[k])
        }
        ;
    };

//Создаем циферблат и прописываем атрибуты (при помощи приватного метода constructorAttribute)
    let clockFace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    constructorAttribute(clockPar.clockFace, clockFace);
    parent.appendChild(clockFace);

//Циклом создаем номера для часов, стилизуем (при помощи приватного метода constructorAttribute) и позиционируем их
    for (let i = 1; i <= clockPar.numberOfHours; i++) {
        let itemNum = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let itemNumText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let position = {};
        let positionText = {};
        position.cx = clockPar.clockFace.cx + (clockPar.clockFace.cx - clockPar.clockNumbers.r) * 0.9 * Math.sin(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
        position.cy = clockPar.clockFace.cy + (clockPar.clockFace.cy - clockPar.clockNumbers.r) * 0.9 * Math.cos(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
        positionText.x = clockPar.clockFace.cx + (clockPar.clockFace.cx - clockPar.clockNumbers.r) * 0.9 * Math.sin(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
        positionText.y = clockPar.clockFace.cy + 7.5 + (clockPar.clockFace.cy - clockPar.clockNumbers.r) * 0.9 * Math.cos(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180);
        constructorAttribute(clockPar.clockNumbers, itemNum);
        constructorAttribute(position, itemNum);
        constructorAttribute(clockPar.clockNumberstext, itemNumText);
        constructorAttribute(positionText, itemNumText);
        itemNumText.textContent = i;
        parent.appendChild(itemNum);
        parent.appendChild(itemNumText);
    }
    ;
// Создаем точку относительно которой будем вращать стрелки
    let handTrOrigin = {
        "transform-origin": clockPar.clockFace.cx + " " + clockPar.clockFace.cy,
    };

// Создаем секундную стрелку
    let secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let secondHandPosition = {};
    secondHandPosition.x1 = clockPar.clockFace.cx;
    secondHandPosition.y1 = clockPar.clockFace.cy * 1.2;
    secondHandPosition.x2 = clockPar.clockFace.cx;
    secondHandPosition.y2 = clockPar.clockFace.cy * 0.2;
    constructorAttribute(clockPar.secondHand, secondHand);
    constructorAttribute(secondHandPosition, secondHand);
    constructorAttribute(handTrOrigin, secondHand);
    parent.appendChild(secondHand);

// Создаем минутную стрелку
    let minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let minuteHandPosition = {};
    minuteHandPosition.x1 = clockPar.clockFace.cx;
    minuteHandPosition.y1 = clockPar.clockFace.cy * 1.1;
    minuteHandPosition.x2 = clockPar.clockFace.cx;
    minuteHandPosition.y2 = clockPar.clockFace.cy * 0.3;
    constructorAttribute(clockPar.minuteHand, minuteHand);
    constructorAttribute(minuteHandPosition, minuteHand);
    constructorAttribute(handTrOrigin, minuteHand);
    parent.appendChild(minuteHand);

// Создаем часовую стрелку
    let hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let hourHandPosition = {};
    hourHandPosition.x1 = clockPar.clockFace.cx;
    hourHandPosition.y1 = clockPar.clockFace.cy * 1.05;
    hourHandPosition.x2 = clockPar.clockFace.cx;
    hourHandPosition.y2 = clockPar.clockFace.cy * 0.4;
    constructorAttribute(clockPar.hourHand, hourHand);
    constructorAttribute(hourHandPosition, hourHand);
    constructorAttribute(handTrOrigin, hourHand);
    parent.appendChild(hourHand);

// Создаем цифровые часы
    let digitalClock = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let digitalClockPosition = {};
    digitalClockPosition.x = clockPar.clockFace.cx;
    digitalClockPosition.y = clockPar.clockFace.cy * 0.8;
    constructorAttribute(clockPar.digitalClock, digitalClock);
    constructorAttribute(digitalClockPosition, digitalClock);
    parent.appendChild(digitalClock);

// Приватный метод dinamicClock для изменения положения стрелок и изменения цифровых часов
    function dinamicClock() {
        let soon = new Date();
        let sec = soon.getSeconds();
        let min = soon.getMinutes();
        let h = soon.getHours();
        secondHand.setAttribute("transform", "rotate(" + sec * 6 + ")");
        minuteHand.setAttribute("transform", "rotate(" + min * 6 + ")");
        hourHand.setAttribute("transform", "rotate(" + (h * 30 + min * 0.5) + ")");
        digitalClock.textContent = str0l(h, 2) + ":" + str0l(min, 2) + ":" + str0l(sec, 2);

        function str0l(val, len) {
            var strVal = val.toString();
            while (strVal.length < len)
                strVal = '0' + strVal;
            return strVal;
        }
    };
    dinamicClock();
    setInterval(dinamicClock, 1000);
}

let myClock1 = new Clock(clock, document.getElementById('Items'));

