"use strict";

function ClockViewDOM() {
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

//Создаем циферблат и прописываем стили (при помощи метода constructorStyle класса Clock)
        let clockFace = document.createElement("div");
        clockFace.style.cssText = myModel.constructorStyle(clockPar.clockFace);

//Циклом создаем номера для часов, стилизуем (при помощи метода constructorStyle класса Clock) и позиционируем их
        for (let i = 1; i <= clockPar.numberOfHours; i++) {
            let itemNum = document.createElement("div");
            itemNum.style.cssText = myModel.constructorStyle(clockPar.clockNumbers) +
                " top: " + ((clockPar.clockFace.height[0] - clockPar.clockNumbers.height[0]) / 2) + clockPar.clockNumbers.height[1] +
                "; left: " + ((clockPar.clockFace.width[0] - clockPar.clockNumbers.width[0]) / 2) + clockPar.clockNumbers.width[1] +
                "; transform-origin: center center" +
                "; transform: translate(" + ((clockPar.clockFace.width[0] - clockPar.clockNumbers.width[0]) / 2 * 0.9) * Math.sin(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180) + clockPar.clockNumbers.width[1] + ", " +
                ((clockPar.clockFace.height[0] - clockPar.clockNumbers.height[0]) / 2 * 0.9) * Math.cos(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180) + clockPar.clockNumbers.width[1];
            itemNum.textContent = i;
            clockFace.appendChild(itemNum);
        }
        ;

// Создаем секундную стрелку
        secondHand = document.createElement("div");
        let secondHandHeight = clockPar.clockFace.height[0] * clockPar.secondHandHeight / 2;
        let secondDelta = secondHandHeight * clockPar.delta;
        secondHand.style.cssText = "height: " + secondHandHeight + clockPar.clockFace.height[1] + "; " + myModel.constructorStyle(clockPar.secondHand) +
            " top: " + (clockPar.clockFace.height[0] / 2 - secondHandHeight + secondDelta) + clockPar.clockFace.height[1] +
            "; left: " + ((clockPar.clockFace.width[0] - clockPar.secondHand.width[0]) / 2) + clockPar.clockFace.width[1] +
            "; transform-origin: " + (clockPar.secondHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (secondHandHeight - secondDelta) + clockPar.clockFace.height[1]
        ;
        clockFace.appendChild(secondHand);

// Создаем минутную стрелку
        minuteHand = document.createElement("div");
        let minuteHandHeight = clockPar.clockFace.height[0] * clockPar.minuteHandHeight / 2;
        let minuteDelta = minuteHandHeight * clockPar.delta;
        minuteHand.style.cssText = "height: " + minuteHandHeight + clockPar.clockFace.height[1] + "; " + myModel.constructorStyle(clockPar.minuteHand) +
            " top: " + (clockPar.clockFace.height[0] / 2 - minuteHandHeight + minuteDelta) + clockPar.clockFace.height[1] +
            "; left: " + ((clockPar.clockFace.width[0] - clockPar.minuteHand.width[0]) / 2) + clockPar.clockFace.width[1] +
            "; transform-origin: " + (clockPar.minuteHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (minuteHandHeight - minuteDelta) + clockPar.clockFace.height[1]
        ;
        clockFace.appendChild(minuteHand);

// Создаем часовую стрелку
        hourHand = document.createElement("div");
        let hourHandHeight = clockPar.clockFace.height[0] * clockPar.hourHandHeight / 2;
        let hourDelta = minuteHandHeight * clockPar.delta;
        hourHand.style.cssText = "height: " + hourHandHeight + clockPar.clockFace.height[1] + "; " + myModel.constructorStyle(clockPar.hourHand) +
            " top: " + (clockPar.clockFace.height[0] / 2 - hourHandHeight + hourDelta) + clockPar.clockFace.height[1] +
            "; left: " + ((clockPar.clockFace.width[0] - clockPar.hourHand.width[0]) / 2) + clockPar.clockFace.width[1] +
            "; transform-origin: " + (clockPar.hourHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (hourHandHeight - hourDelta) + clockPar.clockFace.height[1]
        ;
        clockFace.appendChild(hourHand);

        myField.appendChild(buttonStop);
        myField.appendChild(buttonStart);
        myField.appendChild(clockText);
        myField.appendChild(clockFace);
    };

    self.update = function () {
        secondHand.style.transform = "rotate(" + myModel.sec * 6 + "deg)";
        minuteHand.style.transform = "rotate(" + myModel.min * 6 + "deg)";
        hourHand.style.transform = "rotate(" + (myModel.h * 30 + myModel.min * 0.5) + "deg)";
    }
}