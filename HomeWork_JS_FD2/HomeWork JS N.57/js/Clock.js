"use strict";

function Clock() {
    let self = this;
    let myView = null;
    let isRunning = true;

    let soon = null;
    self.sec = 0;
    self.min = 0;
    self.h = 0;
    self.timezoneAll = null;
    self.currentTimezone = null;

    self.start = function (view, timezoneJSON, timezoneOpt) {
        myView = view;
        self.timezoneAll = JSON.parse(timezoneJSON);
        self.currentTimezone = timezoneOpt;

        soon = new Date();
        self.sec = soon.getSeconds();
        self.min = soon.getMinutes();
        self.h = soon.getUTCHours() + self.timezoneAll[self.currentTimezone][0];
    };

    self.updateView = function () {
        if (myView) {
            myView.update();
        }
        ;
        if (isRunning) {
            soon = new Date();
            self.sec = soon.getSeconds();
            self.min = soon.getMinutes();
            self.h = soon.getUTCHours() + self.timezoneAll[self.currentTimezone][0];
            setTimeout(self.updateView, 1020 - soon.getMilliseconds());

        } else {
            return;
        }
    };

    self.clockStart = function () {
        if (!isRunning) {
            isRunning = true;
            self.updateView();
        }
        ;
    };

    self.clockStop = function () {
        if (isRunning) isRunning = false;
    };

    self.constructorStyle = function (hash) {
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
    self.constructorAttribute = function (hash, elemLink) {
        for (let k in hash) {
            elemLink.setAttribute(k, hash[k])
        }
        ;
    };
};

let containerElem1 = document.getElementById('Items1');

let clockObj1 = new Clock();
let clockObjViewDOM1 = new ClockViewDOM();
let clockObjContr1 = new ClockControllerButtons();
clockObj1.start(clockObjViewDOM1, timezone_JSON, "GMT-5");
clockObjViewDOM1.start(clockObj1, containerElem1, clockDOM_JSON);
clockObj1.updateView();
clockObjContr1.start(clockObj1, containerElem1);

let containerElem2 = document.getElementById('Items2');

let clockObj2 = new Clock();
let clockObjViewSVG2 = new ClockViewSVG();
let clockObjContr2 = new ClockControllerButtons();
clockObj2.start(clockObjViewSVG2, timezone_JSON, "GMT");
clockObjViewSVG2.start(clockObj2, containerElem2, clockSVG_JSON);
clockObj2.updateView();
clockObjContr2.start(clockObj2, containerElem2);

let containerElem3 = document.getElementById('Items3');

let clockObj3 = new Clock();
let clockObjViewCanvas3 = new ClockViewCanvas();
let clockObjContr3 = new ClockControllerButtons();
clockObj3.start(clockObjViewCanvas3, timezone_JSON, "GMT+1");
clockObjViewCanvas3.start(clockObj3, containerElem3, clockCanvas_JSON);
clockObj3.updateView();
clockObjContr3.start(clockObj3, containerElem3);

let containerElem4 = document.getElementById('Items4');

let clockObj4 = new Clock();
let clockObjViewDOM4 = new ClockViewDOM();
let clockObjContr4 = new ClockControllerButtons();
clockObj4.start(clockObjViewDOM4, timezone_JSON, "GMT+3");
clockObjViewDOM4.start(clockObj4, containerElem4, clockDOM_JSON);
clockObj4.updateView();
clockObjContr4.start(clockObj4, containerElem4);

let containerElem5 = document.getElementById('Items5');

let clockObj5 = new Clock();
let clockObjViewSVG5 = new ClockViewSVG();
let clockObjContr5 = new ClockControllerButtons();
clockObj5.start(clockObjViewSVG5, timezone_JSON, "GMT+9");
clockObjViewSVG5.start(clockObj5, containerElem5, clockSVG_JSON);
clockObj5.updateView();
clockObjContr5.start(clockObj5, containerElem5);

let containerElem6 = document.getElementById('Items6');

let clockObj6 = new Clock();
let clockObjViewCanvas6 = new ClockViewCanvas();
let clockObjContr6 = new ClockControllerButtons();
clockObj6.start(clockObjViewCanvas6, timezone_JSON, "GMT+10");
clockObjViewCanvas6.start(clockObj6, containerElem6, clockCanvas_JSON);
clockObj6.updateView();
clockObjContr6.start(clockObj6, containerElem6);