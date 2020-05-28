"use strict";

function GameController(_Parent) {
    let self = this;
    let myModel = null;
    let myField = null;
    self.Parent = _Parent;

    self.start = function (model, field) {
        myModel = model;
        myField = field;
        window.addEventListener("keydown", self.movePlane);
        window.addEventListener("keyup", self.movePlaneStop);
        window.addEventListener("pause", myModel.pauseGame);
        window.addEventListener("play", myModel.playGame);
        if (!!("ontouchstart" in window || navigator.maxTouchPoints)) {
            document.getElementById("FlyTop").addEventListener("touchstart", self.touchFlyUp);
            document.getElementById("FlyTop").addEventListener("touchend",self.touchFlyStopUpDown );
            document.getElementById("FlyRight").addEventListener("touchstart", self.touchFlyRight);
            document.getElementById("FlyRight").addEventListener("touchend", self.touchFlyStopLeftRight);
            document.getElementById("FlyBottom").addEventListener("touchstart", self.touchFlyDown);
            document.getElementById("FlyBottom").addEventListener("touchend", self.touchFlyStopUpDown);
            document.getElementById("FlyLeft").addEventListener("touchstart", self.touchFlyLeft);
            document.getElementById("FlyLeft").addEventListener("touchend", self.touchFlyStopLeftRight);
            document.getElementById("Fire").addEventListener("touchstart", self.touchFire);
            document.getElementById("Fire").addEventListener("touchend", self.touchFireStop);
        }
        ;
    };
    self.movePlane = function (EO) {
        EO = EO || window.event;
        EO.preventDefault();
        if (myModel.CatalogModelPlane.plane1){
            if (EO.keyCode === 65) myModel.CatalogModelPlane.plane1.ControlFlyLeft();
            if (EO.keyCode === 68) myModel.CatalogModelPlane.plane1.ControlFlyRight();
            if (EO.keyCode === 87) myModel.CatalogModelPlane.plane1.ControlFlyUp();
            if (EO.keyCode === 83) myModel.CatalogModelPlane.plane1.ControlFlyDown();
            if (EO.keyCode === 76) myModel.CatalogModelPlane.plane1.FireStart();
        };
    };
    self.movePlaneStop = function (EO) {
        EO = EO || window.event;
        EO.preventDefault();
        if (myModel.CatalogModelPlane.plane1){
            if (EO.keyCode === 65) myModel.CatalogModelPlane.plane1.ControlFlyStopLeftRight();
            if (EO.keyCode === 68) myModel.CatalogModelPlane.plane1.ControlFlyStopLeftRight();
            if (EO.keyCode === 87) myModel.CatalogModelPlane.plane1.ControlFlyStopUpDown();
            if (EO.keyCode === 83) myModel.CatalogModelPlane.plane1.ControlFlyStopUpDown();
            if (EO.keyCode === 76) myModel.CatalogModelPlane.plane1.FireStop();
        };
    };
    self.touchFire = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.FireStart();
    };
    self.touchFireStop = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.FireStop();
    };
    self.touchFlyLeft = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyLeft();
    };
    self.touchFlyRight = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyRight();
    };
    self.touchFlyStopLeftRight = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyStopLeftRight();
    };
    self.touchFlyUp = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyUp();
    };
    self.touchFlyDown = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyDown();
    };
    self.touchFlyStopUpDown = function (EO) {
        EO = EO || window.event;
        if (myModel.CatalogModelPlane.plane1) myModel.CatalogModelPlane.plane1.ControlFlyStopUpDown();
    };
}
