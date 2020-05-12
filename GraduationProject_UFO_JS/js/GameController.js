"use strict";

function GameController() {
    let self = this;
    let myModel = null;
    let myField = null;

    self.start = function (model, field) {
        myModel = model;
        myField = field;
        window.addEventListener("keydown", self.movePlane);
        window.addEventListener("keyup", self.movePlaneStop);
        // window.addEventListener("keyup", self.fire);
    };
    self.movePlane = function (EO) {
        EO = EO || window.event;
        if (EO.keyCode === 65) myModel.CatalogModelPlane.plane1.ControlFlyLeft();
        if (EO.keyCode === 68) myModel.CatalogModelPlane.plane1.ControlFlyRight();
        if (EO.keyCode === 87) myModel.CatalogModelPlane.plane1.ControlFlyUp();
        if (EO.keyCode === 83) myModel.CatalogModelPlane.plane1.ControlFlyDown();
        if (EO.keyCode === 76) myModel.CatalogModelPlane.plane1.FireStart();
    };
    self.movePlaneStop = function (EO) {
        EO = EO || window.event;
        if (EO.keyCode === 65) myModel.CatalogModelPlane.plane1.ControlFlyStopLeftRight();
        if (EO.keyCode === 68) myModel.CatalogModelPlane.plane1.ControlFlyStopLeftRight();
        if (EO.keyCode === 87) myModel.CatalogModelPlane.plane1.ControlFlyStopUpDown();
        if (EO.keyCode === 83) myModel.CatalogModelPlane.plane1.ControlFlyStopUpDown();
        if (EO.keyCode === 76) myModel.CatalogModelPlane.plane1.FireStop();
    };
    // self.fire = function (EO) {
    //     EO = EO || window.event;
    //     // console.log(EO.keyCode);
    //
    // }

}
