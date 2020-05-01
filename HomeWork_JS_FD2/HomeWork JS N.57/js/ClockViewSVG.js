"use strict";

function ClockViewSVG() {
    let self = this;

    let myModel = null;
    let myField = null;
    let clockPar = null;

    let secondHand = null;
    let minuteHand = null;
    let hourHand = null;

    self.start = function (model, field, styleJSON) {
        myModel = model;
        myField = field;
        clockPar = JSON.parse(styleJSON);

// Создаем кнопки для управления часами
        let buttonStart = document.createElement("button");
        buttonStart.setAttribute("data-control", "start");
        buttonStart.style.cssText = myModel.constructorStyle(clockPar.button);
        buttonStart.textContent = clockPar.buttonStartText;

        let buttonStop = document.createElement("button");
        buttonStop.setAttribute("data-control", "stop");
        buttonStop.style.cssText = myModel.constructorStyle(clockPar.button);
        buttonStop.textContent = clockPar.buttonStopText;

// Создаем надпись часового пояса
        let clockText = document.createElement("span");
        clockText.style.cssText = myModel.constructorStyle(clockPar.clockText);
        clockText.textContent = myModel.timezoneAll[myModel.currentTimezone][1] + " (" + myModel.currentTimezone + ")";

//Создаем циферблат и прописываем атрибуты (при помощи приватного метода constructorAttribute)
        let parent = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        myModel.constructorAttribute(clockPar.svg, parent);

        let clockFace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        myModel.constructorAttribute(clockPar.clockFace, clockFace);
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
            myModel.constructorAttribute(clockPar.clockNumbers, itemNum);
            myModel.constructorAttribute(position, itemNum);
            myModel.constructorAttribute(clockPar.clockNumberstext, itemNumText);
            myModel.constructorAttribute(positionText, itemNumText);
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
        secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let secondHandPosition = {};
        secondHandPosition.x1 = clockPar.clockFace.cx;
        secondHandPosition.y1 = clockPar.clockFace.cy * 1.2;
        secondHandPosition.x2 = clockPar.clockFace.cx;
        secondHandPosition.y2 = clockPar.clockFace.cy * 0.2;
        myModel.constructorAttribute(clockPar.secondHand, secondHand);
        myModel.constructorAttribute(secondHandPosition, secondHand);
        myModel.constructorAttribute(handTrOrigin, secondHand);
        parent.appendChild(secondHand);

// Создаем минутную стрелку
        minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let minuteHandPosition = {};
        minuteHandPosition.x1 = clockPar.clockFace.cx;
        minuteHandPosition.y1 = clockPar.clockFace.cy * 1.1;
        minuteHandPosition.x2 = clockPar.clockFace.cx;
        minuteHandPosition.y2 = clockPar.clockFace.cy * 0.3;
        myModel.constructorAttribute(clockPar.minuteHand, minuteHand);
        myModel.constructorAttribute(minuteHandPosition, minuteHand);
        myModel.constructorAttribute(handTrOrigin, minuteHand);
        parent.appendChild(minuteHand);

// Создаем часовую стрелку
        hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let hourHandPosition = {};
        hourHandPosition.x1 = clockPar.clockFace.cx;
        hourHandPosition.y1 = clockPar.clockFace.cy * 1.05;
        hourHandPosition.x2 = clockPar.clockFace.cx;
        hourHandPosition.y2 = clockPar.clockFace.cy * 0.4;
        myModel.constructorAttribute(clockPar.hourHand, hourHand);
        myModel.constructorAttribute(hourHandPosition, hourHand);
        myModel.constructorAttribute(handTrOrigin, hourHand);
        parent.appendChild(hourHand);

        myField.appendChild(buttonStop);
        myField.appendChild(buttonStart);
        myField.appendChild(clockText);
        myField.appendChild(parent);
    };

    self.update = function () {
        secondHand.setAttribute("transform", "rotate(" + myModel.sec * 6 + ")");
        minuteHand.setAttribute("transform", "rotate(" + myModel.min * 6 + ")");
        hourHand.setAttribute("transform", "rotate(" + (myModel.h * 30 + myModel.min * 0.5) + ")");
    }
}