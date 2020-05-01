"use strict";

function ClockControllerButtons() {
    let myModel = null;
    let myField = null;

    this.start = function (model, field) {
        myModel = model;
        myField = field;

        let buttonStart = myField.querySelector("button[data-control='start']");
        buttonStart.addEventListener("click", myModel.clockStart);
        let buttonStop = myField.querySelector("button[data-control='stop']");
        buttonStop.addEventListener("click", myModel.clockStop);
    };
}