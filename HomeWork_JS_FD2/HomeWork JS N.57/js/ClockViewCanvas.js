"use strict";

function ClockViewCanvas() {
    let self = this;
    let myModel = null;
    let myField = null;
    let clockPar = null;
    let context = null;

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

//Создаем программно тэг canvas и прописываем атрибуты и стили (при помощи метода constructorAttribute и constructorStyle)
        let clockFace = document.createElement("canvas");
        myModel.constructorAttribute(clockPar.canvasObjAttr, clockFace);
        clockFace.style.cssText = myModel.constructorStyle(clockPar.canvasStyle);
        context = clockFace.getContext("2d");

        myField.appendChild(buttonStop);
        myField.appendChild(buttonStart);
        myField.appendChild(clockText);
        myField.appendChild(clockFace);
    };

    self.update = function () {

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

// Рисуем секундную стрелку
        context.strokeStyle = clockPar.secondHand.strokeStyle;
        context.lineWidth = clockPar.secondHand.lineWidth;
        context.lineCap = clockPar.secondHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.secondHand.offset * Math.sin(-(myModel.sec * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.secondHand.offset * Math.cos(-(myModel.sec * 360 / 60 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.secondHand.delta * Math.sin(-(myModel.sec * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.secondHand.delta * Math.cos(-(myModel.sec * 360 / 60 - 180) * Math.PI / 180));
        context.stroke();

// Рисуем минутную стрелку
        context.strokeStyle = clockPar.minuteHand.strokeStyle;
        context.lineWidth = clockPar.minuteHand.lineWidth;
        context.lineCap = clockPar.minuteHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.minuteHand.offset * Math.sin(-(myModel.min * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.minuteHand.offset * Math.cos(-(myModel.min * 360 / 60 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.minuteHand.delta * Math.sin(-(myModel.min * 360 / 60 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.minuteHand.delta * Math.cos(-(myModel.min * 360 / 60 - 180) * Math.PI / 180));
        context.stroke();

// Рисуем часовую стрелку
        context.strokeStyle = clockPar.hourHand.strokeStyle;
        context.lineWidth = clockPar.hourHand.lineWidth;
        context.lineCap = clockPar.hourHand.lineCap;
        context.beginPath();
        context.moveTo(clockPar.clockFace.x - clockPar.clockFace.r * clockPar.hourHand.offset * Math.sin(-(myModel.h * 360 / clockPar.numberOfHours + myModel.min * 0.5 - 180) * Math.PI / 180),
            clockPar.clockFace.y - clockPar.clockFace.r * clockPar.hourHand.offset * Math.cos(-(myModel.h * 360 / clockPar.numberOfHours + myModel.min * 0.5 - 180) * Math.PI / 180));
        context.lineTo(clockPar.clockFace.x + clockPar.clockFace.r * clockPar.hourHand.delta * Math.sin(-(myModel.h * 360 / clockPar.numberOfHours + myModel.min * 0.5 - 180) * Math.PI / 180),
            clockPar.clockFace.y + clockPar.clockFace.r * clockPar.hourHand.delta * Math.cos(-(myModel.h * 360 / clockPar.numberOfHours + myModel.min * 0.5 - 180) * Math.PI / 180));
        context.stroke();
    };
};