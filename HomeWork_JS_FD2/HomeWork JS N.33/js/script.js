"use strict";

// В хэше clock задаем стили и размеры элементов (циферблата, стрелок) и далее передаем этот хэш объкту класса Clock
let clock = {
    "numberOfHours": 12,
    "clockFace": {
        "height": [400, "px"],
        "width": [400, "px"],
        "background-color": "#fcca66",
        "border-radius": [50, "%"],
        "position": "relative"
    },
    "clockNumbers": {
        "height": [50, "px"],
        "width": [50, "px"],
        "background-color": "#48b382",
        "border-radius": [50, "%"],
        "position": "absolute",
        "text-align": "center",
        "font-size": [30, "px"],
        "line-height": [50, "px"]
    },
    "secondHand": {
        "width": [2, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [1, "px"]
    },
    "minuteHand": {
        "width": [4, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [2, "px"]
    },
    "hourHand": {
        "width": [6, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [3, "px"]
    },
    "digitalClock": {
        "font-size": [30, "px"],
        "display": "block",
        "padding-top": [130, "px"],
        "text-align": "center",
    }
};

function Clock(clock, parLink) {
    let self = this;
    let clockPar = clock;
    let parent = parLink;

//Приватный метод для создания строки со стилями (стили прописаны в хэше clock)
    function constructorStyle(hash) {
        let str = "";
        for (let k in hash) {
            str += k + ": ";
            if (Array.isArray(hash[k])) {
                for (let i = 0; i < hash[k].length; i++) {
                    str += hash[k][i];
                }
                ;
                str += "; ";
                continue;
            }
            ;
            str += hash[k] + "; ";
        }
        ;
        return str;
    };

//Создаем циферблат и прописываем стили (при помощи приватного метода constructorStyle)
    let clockFace = document.createElement("div");
    clockFace.style.cssText = constructorStyle(clockPar.clockFace);

//Циклом создаем номера для часов, стилизуем (при помощи приватного метода constructorStyle) и позиционируем их
    for (let i = 1; i <= clockPar.numberOfHours; i++) {
        let itemNum = document.createElement("div");
        itemNum.style.cssText = constructorStyle(clockPar.clockNumbers) +
            " top: " + ((clockPar.clockFace.height[0] - clockPar.clockNumbers.height[0]) / 2) + clockPar.clockNumbers.height[1] +
            "; left: " + ((clockPar.clockFace.width[0] - clockPar.clockNumbers.width[0]) / 2) + clockPar.clockNumbers.width[1] +
            "; transform-origin: center center" +
            "; transform: translate(" + ((clockPar.clockFace.width[0] - clockPar.clockNumbers.width[0]) / 2 * 0.9) * Math.sin(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180) + clockPar.clockNumbers.width[1] + ", " +
            ((clockPar.clockFace.height[0] - clockPar.clockNumbers.height[0]) / 2 * 0.9) * Math.cos(-(i * 360 / clockPar.numberOfHours - 180) * Math.PI / 180) + clockPar.clockNumbers.width[1];
        itemNum.textContent = i;
        clockFace.appendChild(itemNum);
    }
    ;

// Создаем цифровые часы
    let digitalClock = document.createElement("span");
    digitalClock.style.cssText = constructorStyle(clockPar.digitalClock);
    clockFace.appendChild(digitalClock);

// Создаем секундную стрелку
    let secondHand = document.createElement("div");
    let secondHandHeight = clockPar.clockFace.height[0] * 0.95 / 2;
    let secondDelta = secondHandHeight * 0.1;
    secondHand.style.cssText = "height: " + secondHandHeight + clockPar.clockFace.height[1] + "; " + constructorStyle(clockPar.secondHand) +
        " top: " + (clockPar.clockFace.height[0] / 2 - secondHandHeight + secondDelta) + clockPar.clockFace.height[1] +
        "; left: " + ((clockPar.clockFace.width[0] - clockPar.secondHand.width[0]) / 2) + clockPar.clockFace.width[1] +
        "; transform-origin: " + (clockPar.secondHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (secondHandHeight - secondDelta) + clockPar.clockFace.height[1]
    ;
    clockFace.appendChild(secondHand);

// Создаем минутную стрелку
    let minuteHand = document.createElement("div");
    let minuteHandHeight = clockPar.clockFace.height[0] * 0.85 / 2;
    let minuteDelta = minuteHandHeight * 0.1;
    minuteHand.style.cssText = "height: " + minuteHandHeight + clockPar.clockFace.height[1] + "; " + constructorStyle(clockPar.minuteHand) +
        " top: " + (clockPar.clockFace.height[0] / 2 - minuteHandHeight + minuteDelta) + clockPar.clockFace.height[1] +
        "; left: " + ((clockPar.clockFace.width[0] - clockPar.minuteHand.width[0]) / 2) + clockPar.clockFace.width[1] +
        "; transform-origin: " + (clockPar.minuteHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (minuteHandHeight - minuteDelta) + clockPar.clockFace.height[1]
    ;
    clockFace.appendChild(minuteHand);

// Создаем часовую стрелку
    let hourHand = document.createElement("div");
    let hourHandHeight = clockPar.clockFace.height[0] * 0.7 / 2;
    let hourDelta = minuteHandHeight * 0.1;
    hourHand.style.cssText = "height: " + hourHandHeight + clockPar.clockFace.height[1] + "; " + constructorStyle(clockPar.hourHand) +
        " top: " + (clockPar.clockFace.height[0] / 2 - hourHandHeight + hourDelta) + clockPar.clockFace.height[1] +
        "; left: " + ((clockPar.clockFace.width[0] - clockPar.hourHand.width[0]) / 2) + clockPar.clockFace.width[1] +
        "; transform-origin: " + (clockPar.hourHand.width[0] / 2) + clockPar.clockFace.height[1] + " " + (hourHandHeight - hourDelta) + clockPar.clockFace.height[1]
    ;
    clockFace.appendChild(hourHand);

    parent.appendChild(clockFace);

// Приватный метод dinamicClock для изменения положения стрелок и изменения цифровых часов
    function dinamicClock() {
        let soon = new Date();
        let sec = soon.getSeconds();
        let min = soon.getMinutes();
        let h = soon.getHours();
        secondHand.style.transform = "rotate(" + sec * 6 + "deg)";
        minuteHand.style.transform = "rotate(" + min * 6 + "deg)";
        hourHand.style.transform = "rotate(" + (h * 30 + min * 0.5) + "deg)";
        digitalClock.textContent = str0l(h, 2) + ":" + str0l(min, 2) + ":" + str0l(sec, 2);

        function str0l(val, len) {
            var strVal = val.toString();
            while (strVal.length < len)
                strVal = '0' + strVal;
            return strVal;
        }
    };
    setInterval(dinamicClock, 1000);
}

let myClock1 = new Clock(clock, document.getElementById('Items'));

