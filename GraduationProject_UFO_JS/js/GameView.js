"use strict";

function GameView(_Parent) {
    let self = this;
    let myModel = null;
    let myField = null;
    self.Parent = _Parent;

    let context = null;

    self.imgPlane = null;
    self.imgUfoS = null;
    let gameArea = null;

    self.start = function (model, field) {
        myModel = model;
        myField = field;

// Создаем картинку самолета
        self.imgPlane = new Image();
        self.imgPlane.src = myModel.options.plane.view.image;
        self.imgUfoS = new Image();
        self.imgUfoS.src = myModel.options.ufoSmall.view.image;

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
    self.PointsView = function () {
        context.fillStyle = myModel.options.points.color;
        context.font = myModel.options.points.fontWeight + " " + myModel.Points.fontSize + "px " + myModel.options.points.fontFamily;
        context.fillText("Points " + myModel.Points.points, myModel.Points.x, myModel.Points.y)
    };
    self.PlaneView = function () {
        for (let k in myModel.CatalogModelPlane) {
            context.drawImage(self.imgPlane, myModel.CatalogModelPlane[k].x, myModel.CatalogModelPlane[k].y, myModel.CatalogModelPlane[k].width, myModel.CatalogModelPlane[k].height);
        }
        ;
    };

    self.FirePlaneView = function () {
        for (let k in myModel.CatalogModelPlaneFire) {
            context.strokeStyle = myModel.options.plane.fireView.color;
            context.lineWidth = myModel.CatalogModelPlaneFire[k].width;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(myModel.CatalogModelPlaneFire[k].x, myModel.CatalogModelPlaneFire[k].y);
            context.lineTo(myModel.CatalogModelPlaneFire[k].x, myModel.CatalogModelPlaneFire[k].y + myModel.CatalogModelPlaneFire[k].height);
            context.stroke();
        }
        ;
    };
    self.FireUfoSmallView = function () {
        for (let k in myModel.CatalogModelUfoFire) {
            context.strokeStyle = myModel.options.ufoSmall.bullet.view;
            context.lineWidth = myModel.CatalogModelUfoFire[k].width;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(myModel.CatalogModelUfoFire[k].x, myModel.CatalogModelUfoFire[k].y);
            context.lineTo(myModel.CatalogModelUfoFire[k].x, myModel.CatalogModelUfoFire[k].y + myModel.CatalogModelUfoFire[k].height);
            context.stroke();
        }
        ;
    };
    self.DamageUfoSmallView = function () {
        for (let k in myModel.CatalogModelUfoSmallDamage) {
            let grad = context.createRadialGradient(myModel.CatalogModelUfoSmallDamage[k].x, myModel.CatalogModelUfoSmallDamage[k].y, 0,
                myModel.CatalogModelUfoSmallDamage[k].x, myModel.CatalogModelUfoSmallDamage[k].y, myModel.CatalogModelUfoSmallDamage[k].sizeStart);
            grad.addColorStop(0, "#ffffff");
            grad.addColorStop(1, myModel.options.plane.fireView.color);
            context.fillStyle = grad;
            context.beginPath();
            context.arc(myModel.CatalogModelUfoSmallDamage[k].x, myModel.CatalogModelUfoSmallDamage[k].y, myModel.CatalogModelUfoSmallDamage[k].sizeStart, Math.PI * 2, false);
            context.fill();
        }
        ;
    };
    self.DamagePlaneView = function () {
        for (let k in myModel.CatalogModelPlaneDamage) {
            let grad = context.createRadialGradient(myModel.CatalogModelPlaneDamage[k].x, myModel.CatalogModelPlaneDamage[k].y, 0,
                myModel.CatalogModelPlaneDamage[k].x, myModel.CatalogModelPlaneDamage[k].y, myModel.CatalogModelPlaneDamage[k].sizeStart);
            grad.addColorStop(0, "#ffffff");
            grad.addColorStop(1, myModel.options.ufoSmall.bullet.view);
            context.fillStyle = grad;
            context.beginPath();
            context.arc(myModel.CatalogModelPlaneDamage[k].x, myModel.CatalogModelPlaneDamage[k].y, myModel.CatalogModelPlaneDamage[k].sizeStart, Math.PI * 2, false);
            context.fill();
        }
        ;
    };
    self.ExplosionUfoSmallView = function () {
        for (let k in myModel.CatalogModelUfoSmallExplosion) {
            let grad = context.createRadialGradient(myModel.CatalogModelUfoSmallExplosion[k].x, myModel.CatalogModelUfoSmallExplosion[k].y, 0,
                myModel.CatalogModelUfoSmallExplosion[k].x, myModel.CatalogModelUfoSmallExplosion[k].y, myModel.CatalogModelUfoSmallExplosion[k].sizeStart);
            grad.addColorStop(0, myModel.options.ufoSmall.explosion.view.color1);
            grad.addColorStop(0.33, myModel.options.ufoSmall.explosion.view.color2);
            grad.addColorStop(0.66, myModel.options.ufoSmall.explosion.view.color3);
            grad.addColorStop(1, myModel.options.ufoSmall.explosion.view.color4);
            context.fillStyle = grad;
            context.beginPath();
            context.arc(myModel.CatalogModelUfoSmallExplosion[k].x, myModel.CatalogModelUfoSmallExplosion[k].y, myModel.CatalogModelUfoSmallExplosion[k].sizeStart, Math.PI * 2, false);
            context.fill();
        }
        ;
    };
    self.DamagedScreenView = function () {
        for (let k in myModel.CatalogModelDamagedScreen) {
            let grad = context.createRadialGradient(myModel.CatalogModelDamagedScreen[k].gradX, myModel.CatalogModelDamagedScreen[k].gradY, 0,
                myModel.CatalogModelDamagedScreen[k].gradX, myModel.CatalogModelDamagedScreen[k].gradY, myModel.CatalogModelDamagedScreen[k].gradSize);
            grad.addColorStop(0, "rgba(255,0,0,0)");
            grad.addColorStop(0.5, "rgba(255,0,0,0)");
            grad.addColorStop(1, myModel.options.plane.damagedScreen.view.color + myModel.CatalogModelDamagedScreen[k].opacity + ")");
            context.fillStyle = grad;
            context.beginPath();
            context.fillRect(0, 0, myModel.CatalogModelDamagedScreen[k].width, myModel.CatalogModelDamagedScreen[k].height);
            context.fill();
        }
        ;
    };
    self.PlaneLineHealthView = function () {
        for (let k in myModel.CatalogModelPlaneLineHealth) {
            //let grad = context.createRadialGradient(myModel.CatalogModelDamagedScreen[k].gradX, myModel.CatalogModelDamagedScreen[k].gradY, 0,
            //    myModel.CatalogModelDamagedScreen[k].gradX, myModel.CatalogModelDamagedScreen[k].gradY, myModel.CatalogModelDamagedScreen[k].gradSize);
            //grad.addColorStop(0, "rgba(255,0,0,0)");
            //grad.addColorStop(0.5, "rgba(255,0,0,0)");
            //console.log(myModel.options.plane.damagedScreen.view.color + myModel.CatalogModelDamagedScreen[k].opacity + ")")
            //console.log(myModel.CatalogModelDamagedScreen[k].gradX, myModel.CatalogModelDamagedScreen[k].gradY, myModel.CatalogModelDamagedScreen[k].gradSize)
            //grad.addColorStop(1, myModel.options.plane.damagedScreen.view.color + myModel.CatalogModelDamagedScreen[k].opacity + ")");
            context.fillStyle = myModel.options.plane.lineHealth.view.colorBackground;
            context.beginPath();
            context.fillRect(myModel.CatalogModelPlaneLineHealth[k].x, myModel.CatalogModelPlaneLineHealth[k].y, myModel.CatalogModelPlaneLineHealth[k].width, myModel.CatalogModelPlaneLineHealth[k].height);
            context.fill();
            context.fillStyle = myModel.options.plane.lineHealth.view.color;
            context.beginPath();
            context.fillRect(myModel.CatalogModelPlaneLineHealth[k].x, myModel.CatalogModelPlaneLineHealth[k].y, myModel.CatalogModelPlaneLineHealth[k].currentWidth, myModel.CatalogModelPlaneLineHealth[k].height);
            context.fill();
        }
        ;
    };
    self.StarsView = function () {
        for (let k in myModel.CatalogModelStars) {
            context.fillStyle = myModel.options.star.view.color;
            context.beginPath();
            context.arc(myModel.CatalogModelStars[k].x, myModel.CatalogModelStars[k].y, myModel.CatalogModelStars[k].size, Math.PI * 2, false);
            context.fill();
        }
        ;
    };
    self.UfoSmallView = function () {
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
        self.DamageUfoSmallView();
        self.PlaneView();
        self.DamagePlaneView();
        self.FirePlaneView();
        self.FireUfoSmallView();
        self.ExplosionUfoSmallView();
        self.PlaneLineHealthView();
        self.PointsView();
        self.DamagedScreenView();
    };
};