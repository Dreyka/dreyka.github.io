"use strict";

function GameView() {
    let self = this;
    let myModel = null;
    let myField = null;

    let context = null;

    self.imgPlane = null;
    self.imgUfoS = null;
    let gameArea = null;

    self.start = function (model, field) {
        myModel = model;
        myField = field;

// Создаем картинку самолета
        self.imgPlane = new Image();
        self.imgPlane.src = "img/plane.svg";
        self.imgUfoS = new Image();
        self.imgUfoS.src = "img/ufoSmall.svg";

//Создаем программно тэг canvas и прописываем атрибуты
        gameArea = document.createElement("canvas");
        self.gameAreaSize();
        context = gameArea.getContext("2d");
        myField.appendChild(gameArea);
    };

    self.gameAreaSize = function () {
        gameArea.setAttribute("width", myModel.myFieldWidth);
        gameArea.setAttribute("height", myModel.myFieldHeight);
    };

    self.FirePlaneView = function () {
        for (let k in myModel.CatalogModelPlaneFire) {
            context.strokeStyle = "#56a9ea";
            context.lineWidth = myModel.CatalogModelPlaneFire[k].width;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(myModel.CatalogModelPlaneFire[k].x, myModel.CatalogModelPlaneFire[k].y);
            context.lineTo(myModel.CatalogModelPlaneFire[k].x, myModel.CatalogModelPlaneFire[k].y + myModel.CatalogModelPlaneFire[k].height);
            context.stroke();
        }
        ;
    };
    self.StarsView = function () {
        for (let k in myModel.CatalogModelStars) {
            context.fillStyle = "#ffffff";
            context.beginPath();
            context.arc(myModel.CatalogModelStars[k].x, myModel.CatalogModelStars[k].y, myModel.CatalogModelStars[k].size, Math.PI * 2, false);
            context.fill();
        }
        ;
    };
    self.UfoSmallView = function () {
        // console.log("1")
        for (let k in myModel.CatalogModelUfo) {
            context.drawImage(self.imgUfoS, myModel.CatalogModelUfo[k].x, myModel.CatalogModelUfo[k].y, myModel.CatalogModelUfo[k].width, myModel.CatalogModelUfo[k].height);
        }
        ;
    };
    self.update = function () {
        context.fillStyle = "#110E19";
        context.fillRect(0, 0, myModel.myFieldWidth, myModel.myFieldHeight);
        self.StarsView();
        self.UfoSmallView();
        context.drawImage(self.imgPlane, myModel.CatalogModelPlane.plane1.x, myModel.CatalogModelPlane.plane1.y, myModel.CatalogModelPlane.plane1.width, myModel.CatalogModelPlane.plane1.height);
        self.FirePlaneView();
    };
};