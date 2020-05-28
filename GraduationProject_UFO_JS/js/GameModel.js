"use strict";

function GameModel(_Parent) {
    let self = this;
    let myView = null;
    let myField = null;
    self.Parent = _Parent;
    self.isRunning = true;
    self.CPointsType = "points";
    self.CPlaneType = "plane";
    self.CPlaneLineHealthType = "planeLineHealth";
    self.CDamagedScreenType = "damagedScreen";
    self.CPlaneDamageType = "planeDamage";
    self.CPlaneBulletLeftType = "planeBulletLeft";
    self.CPlaneBulletRightType = "planeBulletRight";
    self.CUfoSmallType = "ufoS";
    self.CUfoSmallBulletType = "ufoSBullet";
    self.CUfoSmallDamagelType = "ufoSDamage";
    self.CUfoSmallExplosionType = "ufoSExplosion";
    self.CStarType = "star";
    //self.points = 0;
    self.myFieldWidth = 0;
    self.myFieldHeight = 0;

    //Аудио эффекты
    self.audioFire = new Audio("audio/laser.mp3");
    self.audioUfoExpl = new Audio("audio/explosion.mp3");

    // Константы
    self.options = self.Parent.options;

    // Сохраняем в каталогах(хэшах) ссылки на все объекты
    self.CatalogModelPoints = {}; // Объект игровые очки
    self.CatalogModelPlane = {}; // Объект самолет
    self.CatalogModelPlaneFire = {}; // Объекты создаваемые при выстрелах самолетом (пули)
    self.CatalogModelDamagedScreen = {};
    self.CatalogModelPlaneDamage = {};
    self.CatalogModelPlaneLineHealth = {};
    self.CatalogModelUfo = {}; // Объекты НЛО
    self.CatalogModelUfoFire = {};
    self.CatalogModelUfoSmallDamage = {};
    self.CatalogModelUfoSmallExplosion = {};
    self.CatalogModelStars = {}; // Объекты звезда

    function TPoints(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = this.Parent.CPointsType;
        self.x = 0;
        self.y = 0;
        self.fontSize = 0;
        self.points = 0;
    };
    TPoints.prototype.Init = function (_Ident) {
        let self = this;
        self.Ident = _Ident;
        self.Resize();
        self.Parent.CatalogModelPoints[self.Ident] = self;
    };
    TPoints.prototype.Resize = function () {
        let self = this;
        self.x = self.Parent.myFieldWidth * self.Parent.options.points.x;
        self.y = self.Parent.myFieldHeight * self.Parent.options.points.y;
        self.fontSize = self.Parent.myFieldWidth * self.Parent.options.points.size;
    };
    TPoints.prototype.Destroy = function () {
        let self = this;
        delete self.Parent.CatalogModelPoints[self.Ident];
        self.Parent = null;
    };
    TPoints.prototype.pointsPlus = function (value) {
        let self = this;
        self.points += value;
    };

    function PointsFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
    };
    PointsFactory.prototype.Create = function () {
        let self = this;
        self.Counter++;
        let Ident = this.Parent.CPointsType + self.Counter;
        let gameObj = new TPoints(self.Parent);
        gameObj.Init(Ident);
        return gameObj;
    };

    self.PointsFactory = new PointsFactory(self);
    self.Points = null;

    function TPlane(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.ParentParent = self.Parent.Parent;
        self.Ident = null;
        self.Type = this.Parent.CPlaneType;

        self.width = 0;
        self.height = 0;
        self.x = 0;
        self.y = 0;
        self.curSpeedX = 0;
        self.curSpeedY = 0;
        self.speedX = 0;
        self.speedY = 0;
        self.health = self.Parent.options.plane.health;
        self.fireStatus = false;
        self.fireSpeed = self.Parent.options.plane.fireSpeed;
        self.fireSpeedCount = self.Parent.options.plane.fireSpeed;

        function TPlaneBulletLeft(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.Parent.Parent.CPlaneBulletLeftType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 0;
            self.damage = self.ParentParent.options.plane.bulletLeft.damage;
        };
        TPlaneBulletLeft.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelPlaneFire[self.Ident];
            self.Parent = null;
        };
        TPlaneBulletLeft.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.Resize();
            self.ParentParent.CatalogModelPlaneFire[self.Ident] = self;
        };
        TPlaneBulletLeft.prototype.Resize = function () {
            let self = this;
            self.width = self.Parent.width * self.ParentParent.options.plane.bulletLeft.width;
            self.height = self.Parent.height * self.ParentParent.options.plane.bulletLeft.height;
            self.x = self.Parent.x + self.Parent.width * self.ParentParent.options.plane.bulletLeft.x;
            self.y = self.Parent.y + self.Parent.height * self.ParentParent.options.plane.bulletLeft.y;
            self.speedY = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.bulletLeft.speedY;
        };
        TPlaneBulletLeft.prototype.update = function () {
            let self = this;
            self.y -= self.speedY;
            if ((self.y + self.height) < 0) self.Destroy();
        };

        function PlaneBulletLeftFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;
        };
        PlaneBulletLeftFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Parent.CPlaneBulletLeftType + self.Counter;
            let gameObj = new TPlaneBulletLeft(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.PlaneBulletLeftFactory = new PlaneBulletLeftFactory(self);

        function TPlaneBulletRight(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CPlaneBulletRightType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 0;
            self.damage = self.ParentParent.options.plane.bulletRight.damage;
        };
        TPlaneBulletRight.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.Resize();
            self.Parent.Parent.CatalogModelPlaneFire[self.Ident] = self;
        };
        TPlaneBulletRight.prototype.Resize = function () {
            let self = this;
            self.width = self.Parent.width * self.ParentParent.options.plane.bulletRight.width;
            self.height = self.Parent.height * self.ParentParent.options.plane.bulletRight.height;
            self.x = self.Parent.x + self.Parent.width * self.ParentParent.options.plane.bulletRight.x;
            self.y = self.Parent.y + self.Parent.height * self.ParentParent.options.plane.bulletRight.y;
            self.speedY = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.bulletRight.speedY;
        };
        TPlaneBulletRight.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelPlaneFire[self.Ident];
            self.Parent = null;
        };
        TPlaneBulletRight.prototype.update = function () {
            let self = this;
            self.y -= self.speedY;
            if ((self.y + self.height) < 0) self.Destroy();
        };

        function PlaneBulletRightFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;
        };
        PlaneBulletRightFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Parent.CPlaneBulletRightType + self.Counter;
            let gameObj = new TPlaneBulletRight(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.PlaneBulletRightFactory = new PlaneBulletRightFactory(self);

        function TPlaneDamage(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CPlaneDamageType;
            self.x = 0;
            self.y = 0;
            self.size = 0;
            self.sizeStart = self.ParentParent.options.plane.planeDamage.damageSizeStart;
            self.speed = self.ParentParent.options.plane.planeDamage.damageSpeedLowSize;
        };
        TPlaneDamage.prototype.Init = function (_Ident, x, y) {
            let self = this;
            self.Ident = _Ident;
            self.x = x;
            self.y = y;
            self.size = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.planeDamage.damageSize;
            self.ParentParent.CatalogModelPlaneDamage[self.Ident] = self;
        };
        TPlaneDamage.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelPlaneDamage[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        TPlaneDamage.prototype.update = function () {
            let self = this;
            self.sizeStart += self.speed;
            if (self.sizeStart > self.size) self.speed = -self.speed;
            if (self.sizeStart < 0) self.Destroy();
        };

        function PlaneDamageFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Counter = 0;
        };
        PlaneDamageFactory.prototype.Create = function (x, y) {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.ParentParent.CPlaneDamageType + self.Counter;
            let gameObj = new TPlaneDamage(self.Parent);
            gameObj.Init(Ident, x, y);
            return gameObj;
        };
        self.PlaneDamageFactory = new PlaneDamageFactory(self);

        function TPlaneDamagedScreen(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CDamagedScreenType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.gradX = 0;
            self.gradY = 0;
            self.gradSize = 0;
            self.opacity = self.ParentParent.options.plane.damagedScreen.opacity;
            self.opacitySpeed = self.ParentParent.options.plane.damagedScreen.opacitySpeed;
        };
        TPlaneDamagedScreen.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.width = self.ParentParent.myFieldWidth;
            self.height = self.ParentParent.myFieldHeight;
            self.gradX = self.ParentParent.myFieldWidth / 2;
            self.gradY = self.ParentParent.myFieldHeight / 2;
            self.gradSize = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.damagedScreen.gradSize;
            self.ParentParent.CatalogModelDamagedScreen[self.Ident] = self;
        };
        TPlaneDamagedScreen.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelDamagedScreen[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        TPlaneDamagedScreen.prototype.update = function () {
            let self = this;
            self.opacity -= self.opacitySpeed;
            if (self.opacity <= 0) self.Destroy();
        };

        function PlaneDamagedScreenFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Counter = 0;
        };
        PlaneDamagedScreenFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.ParentParent.CDamagedScreenType + self.Counter;
            let gameObj = new TPlaneDamagedScreen(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.PlaneDamagedScreenFactory = new PlaneDamagedScreenFactory(self);

        function TPlaneLineHealth(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CPlaneLineHealthType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.currentWidth = 0;
            self.currentHealth = 0;
            self.health = 0;
            self.widthHealth = 0;
        };
        TPlaneLineHealth.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.Resize();
            self.ParentParent.CatalogModelPlaneLineHealth[self.Ident] = self;
        };
        TPlaneLineHealth.prototype.Resize = function () {
            let self = this;
            self.x = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.lineHealth.x;
            self.y = self.ParentParent.myFieldHeight * self.ParentParent.options.plane.lineHealth.y;
            self.width = self.ParentParent.myFieldWidth * self.ParentParent.options.plane.lineHealth.width;
            self.height = self.ParentParent.myFieldHeight * self.ParentParent.options.plane.lineHealth.height;
            self.health = self.Parent.health;
            self.widthHealth = self.width / self.health;
        };
        TPlaneLineHealth.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelPlaneLineHealth[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        TPlaneLineHealth.prototype.update = function () {
            let self = this;
            if (self.Parent) {
                self.currentHealth = self.Parent.health;
                self.currentWidth = self.currentHealth * self.widthHealth;
            }
            ;
        };

        function PlaneLineHealthFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Counter = 0;
        };
        PlaneLineHealthFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.ParentParent.CPlaneLineHealthType + self.Counter;
            let gameObj = new TPlaneLineHealth(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.PlaneLineHealthFactory = new PlaneLineHealthFactory(self);
        self.PlaneLineHealthFactory.Create();
    };
    TPlane.prototype.Init = function (_Ident) {
        let self = this;
        self.Ident = _Ident;
        self.Resize();
        self.Parent.CatalogModelPlane[self.Ident] = self;
    };
    TPlane.prototype.Resize = function () {
        let self = this;
        self.width = self.Parent.myFieldWidth * self.Parent.options.plane.width;
        self.height = self.Parent.myFieldWidth * self.Parent.options.plane.height;
        self.x = (self.Parent.myFieldWidth - self.width) / 2;
        self.y = self.Parent.myFieldHeight - self.height;
        self.speedX = self.Parent.myFieldWidth * self.Parent.options.plane.speedX;
        self.speedY = self.Parent.myFieldWidth * self.Parent.options.plane.speedY;
    };
    TPlane.prototype.Destroy = function () {
        let self = this;
        delete self.Parent.CatalogModelPlane[self.Ident];
        self.Parent = null;
    };
    TPlane.prototype.ControlFlyLeft = function () {
        let self = this;
        self.curSpeedX = -self.speedX;
    };
    TPlane.prototype.ControlFlyRight = function () {
        let self = this;
        self.curSpeedX = self.speedX;
    };
    TPlane.prototype.ControlFlyUp = function () {
        let self = this;
        self.curSpeedY = -self.speedY;
    };
    TPlane.prototype.ControlFlyDown = function () {
        let self = this;
        self.curSpeedY = self.speedY;
    };
    TPlane.prototype.ControlFlyStopLeftRight = function () {
        let self = this;
        self.curSpeedX = 0;
    };
    TPlane.prototype.ControlFlyStopUpDown = function () {
        let self = this;
        self.curSpeedY = 0;
    };
    TPlane.prototype.update = function () {
        let self = this;
        self.x += self.curSpeedX;
        if (self.x < 0) self.x = 0;
        if (self.x + self.width > self.Parent.myFieldWidth) self.x = self.Parent.myFieldWidth - self.width;
        self.y += self.curSpeedY;
        if (self.y < 0) self.y = 0;
        if (self.y + self.height > self.Parent.myFieldHeight) self.y = self.Parent.myFieldHeight - self.height;
        self.Fire();
    };
    TPlane.prototype.FireStart = function () {
        let self = this;
        self.fireStatus = true;
    };
    TPlane.prototype.Fire = function () {
        let self = this;
        if (self.fireStatus) {
            self.fireSpeedCount += 1;
            if (self.fireSpeedCount >= self.fireSpeed) {
                self.Parent.audioFire.currentTime = 0;
                self.Parent.audioFire.play();
                self.PlaneBulletLeftFactory.Create();
                self.PlaneBulletRightFactory.Create();
                self.fireSpeedCount = 0;
            }
            ;
        }
        ;

    };
    TPlane.prototype.FireStop = function () {
        let self = this;
        self.fireSpeedCount = self.fireSpeed;
        self.fireStatus = false;
    };
    TPlane.prototype.Damaged = function (value, x, y) {
        let self = this;
        self.health -= value;
        for (let k in self.Parent.CatalogModelDamagedScreen) {
            self.Parent.CatalogModelDamagedScreen[k].Destroy();
        }
        ;
        if ("vibrate" in navigator) window.navigator.vibrate(300);

        self.PlaneDamagedScreenFactory.Create();
        if (x && y) self.PlaneDamageFactory.Create(x, y);
        if (self.health <= 0) {
            self.ParentParent.save();
            self.Destroy();
        }
    };

    function PlaneFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
    };
    PlaneFactory.prototype.Create = function () {
        let self = this;
        self.Counter++;
        let Ident = self.Parent.CPlaneType + self.Counter;
        let gameObj = new TPlane(self.Parent);
        gameObj.Init(Ident);
        return gameObj;
    };
    self.PlaneFactory = new PlaneFactory(self);

    function TStar(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = this.Parent.CStarType;
        self.size = 0;
        self.x = 0;
        self.y = 0;
        self.speedY = 0;
    };
    TStar.prototype.Init = function (_Ident) {
        let self = this;
        self.Ident = _Ident;
        self.size = Math.random() * self.Parent.options.star.size;
        self.speedY = Math.random() * self.Parent.options.star.speedY;
        self.x = Math.random() * self.Parent.myFieldWidth;
        self.y = Math.random() * self.Parent.myFieldHeight;
        self.Parent.CatalogModelStars[self.Ident] = self;
    };
    TStar.prototype.Destroy = function () {
        let self = this;
        delete self.Parent.CatalogModelStars[self.Ident];
        self.Parent = null;
    };
    TStar.prototype.reset = function () {
        let self = this;
        self.size = Math.random() * self.Parent.options.star.size;
        self.speedY = Math.random() * self.Parent.options.star.speedY;
        self.y = 0;
        self.x = Math.random() * self.Parent.myFieldWidth;
    };
    TStar.prototype.update = function () {
        let self = this;
        self.y += self.speedY;
        if (self.y > self.Parent.myFieldHeight) self.reset();
    };

    function StarFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
        self.Amount = self.Parent.options.star.amount;
    };
    StarFactory.prototype.Create = function () {
        let self = this;
        if (self.Parent.myFieldWidth >= self.Parent.options.star.amount.display1[0]) {
            self.Amount = self.Parent.options.star.amount.display1[1];
        } else if (self.Parent.myFieldWidth < self.Parent.options.star.amount.display1[0] && self.Parent.myFieldWidth >= self.Parent.options.star.amount.display2[0]) {
            self.Amount = self.Parent.options.star.amount.display2[1];
        } else if (self.Parent.myFieldWidth < self.Parent.options.star.amount.display2[0] && self.Parent.myFieldWidth >= self.Parent.options.star.amount.display3[0]) {
            self.Amount = self.Parent.options.star.amount.display3[1];
        } else if (self.Parent.myFieldWidth < self.Parent.options.star.amount.display3[0]) {
            self.Amount = self.Parent.options.star.amount.display4;
        }
        ;
        for (let i = 0; i < self.Amount; i++) {
            self.Counter++;
            let Ident = self.Parent.CStarType + self.Counter;
            let gameObj = new TStar(self.Parent);
            gameObj.Init(Ident);
        }
        ;
    };
    StarFactory.prototype.resize = function () {
        let self = this;
        for (let k in self.Parent.CatalogModelStars) {
            self.Parent.CatalogModelStars[k].Destroy();
        }
        ;
        self.Create();
    };
    self.StarFactory = new StarFactory(self);

    function TUfoSmall(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = self.Parent.CUfoSmallType;

        self.width = 0;
        self.height = 0;
        self.x = 0;
        self.y = 0;
        self.speedX = 0;
        self.speedY = self.Parent.options.ufoSmall.speedY;
        self.health = self.Parent.options.ufoSmall.health;
        self.points = self.Parent.options.ufoSmall.points;
        self.fireStatus = false;
        self.fireSpeed = self.Parent.options.ufoSmall.fireSpeed;
        self.fireSpeedCount = self.Parent.randomDiap(0, self.Parent.options.ufoSmall.fireSpeed);

        function UfoSmallDamage(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CUfoSmallDamagelType;
            self.x = 0;
            self.y = 0;
            self.size = 0;
            self.sizeStart = self.ParentParent.options.ufoSmall.damageSizeStart;
            self.speed = self.ParentParent.options.ufoSmall.damageSpeedLowSize;
        };
        UfoSmallDamage.prototype.Init = function (_Ident, x, y) {
            let self = this;
            self.Ident = _Ident;
            self.x = x;
            self.y = y;
            self.size = self.ParentParent.myFieldWidth * self.ParentParent.options.ufoSmall.damageSize;
            self.ParentParent.CatalogModelUfoSmallDamage[self.Ident] = self;
        };
        UfoSmallDamage.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelUfoSmallDamage[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        UfoSmallDamage.prototype.update = function () {
            let self = this;
            self.sizeStart += self.speed;
            if (self.sizeStart > self.size) self.speed = -self.speed;
            if (self.sizeStart < 0) self.Destroy();
        };

        function UfoSmallDamageFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;

        };
        UfoSmallDamageFactory.prototype.Create = function (x, y) {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.Parent.Parent.CUfoSmallDamagelType + self.Counter;
            let gameObj = new UfoSmallDamage(self.Parent);
            gameObj.Init(Ident, x, y);
            return gameObj;
        };
        self.UfoSmallDamageFactory = new UfoSmallDamageFactory(self);

        function TUfoSmallBullet(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CUfoSmallBulletType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 0;
            self.damage = self.ParentParent.options.ufoSmall.bullet.damage;
        };
        TUfoSmallBullet.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.width = self.Parent.width * self.ParentParent.options.ufoSmall.bullet.width;
            self.height = self.Parent.height * self.ParentParent.options.ufoSmall.bullet.height;
            self.x = self.Parent.x + self.Parent.width * self.ParentParent.options.ufoSmall.bullet.x - self.width * 0.5;
            self.y = self.Parent.y + self.Parent.height * self.ParentParent.options.ufoSmall.bullet.y;
            self.speedY = self.ParentParent.myFieldWidth * self.ParentParent.options.ufoSmall.bullet.speedY;
            self.ParentParent.CatalogModelUfoFire[self.Ident] = self;
        };
        TUfoSmallBullet.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelUfoFire[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        TUfoSmallBullet.prototype.update = function () {
            let self = this;
            self.y += self.speedY;
            if ((self.y + self.height) > self.ParentParent.myFieldHeight) self.Destroy();
        };

        function UfoSmallBulletFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Counter = 0;
        };
        UfoSmallBulletFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.ParentParent.CUfoSmallBulletType + self.Counter;
            let gameObj = new TUfoSmallBullet(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.UfoSmallBulletFactory = new UfoSmallBulletFactory(self);

        function TUfoSmallExplosion(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Ident = null;
            self.Type = self.ParentParent.CUfoSmallExplosionType;

            self.x = 0;
            self.y = 0;
            self.size = 0;
            self.sizeStart = self.ParentParent.options.ufoSmall.explosion.damageSizeStart;
            self.speed = self.ParentParent.options.ufoSmall.damageSpeedLowSize;
        };
        TUfoSmallExplosion.prototype.Init = function (_Ident) {
            let self = this;
            self.Ident = _Ident;
            self.x = self.Parent.x + self.Parent.width * 0.5;
            self.y = self.Parent.y + self.Parent.height * 0.5;
            self.size = self.Parent.width * self.ParentParent.options.ufoSmall.explosion.damageSize;
            self.ParentParent.CatalogModelUfoSmallExplosion[self.Ident] = self;
        };
        TUfoSmallExplosion.prototype.Destroy = function () {
            let self = this;
            delete self.ParentParent.CatalogModelUfoSmallExplosion[self.Ident];
            self.Parent = null;
            self.ParentParent = null;
        };
        TUfoSmallExplosion.prototype.update = function () {
            let self = this;
            self.sizeStart += self.speed;
            if (self.sizeStart > self.size) self.speed = -self.speed;
            if (self.sizeStart < 0) self.Destroy();
        };

        function UfoSmallExplosionFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.ParentParent = self.Parent.Parent;
            self.Counter = 0;

        };
        UfoSmallExplosionFactory.prototype.Create = function () {
            let self = this;
            self.Counter++;
            let Ident = self.Parent.Ident + self.ParentParent.CUfoSmallExplosionType + self.Counter;
            let gameObj = new TUfoSmallExplosion(self.Parent);
            gameObj.Init(Ident);
            return gameObj;
        };
        self.UfoSmallExplosionFactory = new UfoSmallExplosionFactory(self);
    };
    TUfoSmall.prototype.Init = function (_Ident) {
        let self = this;
        self.Ident = _Ident;
        self.x = (self.Parent.myFieldWidth - self.width) * Math.random();
        self.y = -self.height;
        self.speedX = self.Parent.myFieldWidth * self.Parent.randomDiap(self.Parent.options.ufoSmall.speedMinX, self.Parent.options.ufoSmall.speedMaxX) / 10000;
        self.Resize();
        self.Parent.CatalogModelUfo[self.Ident] = self;
    };
    TUfoSmall.prototype.Resize = function () {
        let self = this;
        self.speedY = self.Parent.myFieldWidth * self.Parent.options.ufoSmall.speedY;
        self.width = self.Parent.myFieldWidth * self.Parent.options.ufoSmall.width;
        self.height = self.Parent.myFieldWidth * self.Parent.options.ufoSmall.height;
    };
    TUfoSmall.prototype.Destroy = function () {
        let self = this;
        delete self.Parent.CatalogModelUfo[self.Ident];
        self.Parent = null;
    };
    TUfoSmall.prototype.update = function () {
        let self = this;
        self.x += self.speedX;
        if ((self.x < 0) || ((self.x + self.width) > self.Parent.myFieldWidth)) {
            self.speedX = -self.speedX;
        }
        ;
        self.y += self.speedY;
        if (self.y > self.Parent.myFieldHeight) {
            self.Destroy();
        }
        ;
        self.Fire();
    };
    TUfoSmall.prototype.Damaged = function (value, x, y) {
        let self = this;
        self.health -= value;
        self.UfoSmallDamageFactory.Create(x, y);
        if (self.health <= 0) {
            self.Parent.Points.pointsPlus(self.points);
            self.Parent.audioUfoExpl.currentTime = 0;
            self.Parent.audioUfoExpl.play();
            self.Explosion();
            self.Destroy();
        }
        ;
    };
    TUfoSmall.prototype.Fire = function () {
        let self = this;
        self.fireSpeedCount += 1;
        if ((self.fireSpeedCount >= self.fireSpeed) && self.Parent) {
            self.UfoSmallBulletFactory.Create();
            self.fireSpeedCount = 0;
        }
        ;
    };
    TUfoSmall.prototype.Explosion = function () {
        let self = this;
        self.UfoSmallExplosionFactory.Create();
    };

    function UfoSmallFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
        self.Time = 100;
        self.currentTime = 0;
        self.difficult = 3;
        self.Create = function () {
            self.Counter++;
            let Ident = self.Parent.CUfoSmallType + self.Counter;
            let UfoSmall = new TUfoSmall(self.Parent);
            UfoSmall.Init(Ident);
            return UfoSmall;
        };
        self.Generate = function () {
            self.currentTime += 1;
            if (self.currentTime >= self.Time) {
                for (let i = 0; i <= self.Parent.randomDiap(0, self.difficult); i++) {
                    self.Create();
                }
                ;
                self.currentTime = 0;
            }
            ;
        };
    };

    self.UfoSmallFactory = new UfoSmallFactory(self);

    function TCollisions(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.CoolPlaneBulletUfo = function () {
            for (let k in self.Parent.CatalogModelPlaneFire) {
                for (let m in self.Parent.CatalogModelUfo) {
                    if ((self.Parent.CatalogModelPlaneFire[k].x + self.Parent.CatalogModelPlaneFire[k].width) > self.Parent.CatalogModelUfo[m].x &&
                        self.Parent.CatalogModelPlaneFire[k].x < (self.Parent.CatalogModelUfo[m].x + self.Parent.CatalogModelUfo[m].width) &&
                        (self.Parent.CatalogModelPlaneFire[k].y) < (self.Parent.CatalogModelUfo[m].y + self.Parent.CatalogModelUfo[m].height) &&
                        (self.Parent.CatalogModelPlaneFire[k].y) > self.Parent.CatalogModelUfo[m].y) {

                        self.Parent.CatalogModelUfo[m].Damaged(self.Parent.CatalogModelPlaneFire[k].damage, self.Parent.CatalogModelPlaneFire[k].x, self.Parent.CatalogModelPlaneFire[k].y);
                        self.Parent.CatalogModelPlaneFire[k].Destroy();
                        break;
                    }
                    ;
                }
                ;
            }
            ;
        };
        self.CoolPlane_Ufo = function () {
            for (let k in self.Parent.CatalogModelPlane) {
                if (self.Parent.CatalogModelPlane[k]) {
                    for (let m in self.Parent.CatalogModelUfo) {
                        if (self.Parent.CatalogModelPlane[k].x < (self.Parent.CatalogModelUfo[m].x + self.Parent.CatalogModelUfo[m].width) &&
                            (self.Parent.CatalogModelPlane[k].x + self.Parent.CatalogModelPlane[k].width) > self.Parent.CatalogModelUfo[m].x &&
                            (self.Parent.CatalogModelPlane[k].y) < (self.Parent.CatalogModelUfo[m].y + self.Parent.CatalogModelUfo[m].height) &&
                            (self.Parent.CatalogModelPlane[k].y + self.Parent.CatalogModelPlane[k].height) > self.Parent.CatalogModelUfo[m].y) {
                            self.Parent.CatalogModelPlane[k].Damaged(self.Parent.CatalogModelUfo[m].health);
                            self.Parent.CatalogModelUfo[m].Explosion();
                            self.Parent.CatalogModelUfo[m].Destroy();
                            break;
                        }
                        ;
                    }
                    ;
                    for (let m in self.Parent.CatalogModelUfoFire) {
                        if (self.Parent.CatalogModelPlane[k].x < (self.Parent.CatalogModelUfoFire[m].x + self.Parent.CatalogModelUfoFire[m].width) &&
                            (self.Parent.CatalogModelPlane[k].x + self.Parent.CatalogModelPlane[k].width) > self.Parent.CatalogModelUfoFire[m].x &&
                            (self.Parent.CatalogModelPlane[k].y) < (self.Parent.CatalogModelUfoFire[m].y + self.Parent.CatalogModelUfoFire[m].height) &&
                            (self.Parent.CatalogModelPlane[k].y + self.Parent.CatalogModelPlane[k].height) > self.Parent.CatalogModelUfoFire[m].y) {
                            self.Parent.CatalogModelPlane[k].Damaged(self.Parent.CatalogModelUfoFire[m].damage, self.Parent.CatalogModelUfoFire[m].x, self.Parent.CatalogModelUfoFire[m].y);
                            //self.Parent.CatalogModelUfo[m].Explosion();
                            self.Parent.CatalogModelUfoFire[m].Destroy();
                            break;
                        }
                        ;
                    }
                    ;
                }
                ;

            }
            ;
        };
    };
    self.Collisions = new TCollisions(self);

    function TScenario(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = self.Parent.CUfoSmallExplosionType;
        self.Levels = {};
        // self.Counter = 0;
        // self.Time = 100;
        // self.currentTime = 0;
        // self.difficult = 3;
        self.Create = function () {
            self.Counter++;
            let Ident = self.Parent.CUfoSmallType + self.Counter;
            let UfoSmall = new TUfoSmall(self.Parent);
            UfoSmall.Init(Ident);
            return UfoSmall;
        };
        self.Generate = function () {
            self.currentTime += 1;
            if (self.currentTime >= self.Time) {
                for (let i = 0; i <= self.Parent.randomDiap(0, self.difficult); i++) {
                    self.Create();
                }
                ;
                self.currentTime = 0;
            }
            ;
        };
    };
    self.start = function (view, field) {
        myView = view;
        myField = field;
        window.addEventListener("resize", self.debounceSerie(self.myFieldResize, 500, false))
        self.updateSize();
        self.Points = self.PointsFactory.Create();
    };

    self.updateSize = function () {
        self.myFieldWidth = myField.offsetWidth;
        self.myFieldHeight = self.myFieldWidth * 0.55;
    };
    self.pauseGame = function () {
        self.isRunning = false;
    };
    self.playGame = function () {
        self.isRunning = true;
    };

    self.myFieldResize = function () {
        self.updateSize();
        myView.gameAreaSize();
        self.StarFactory.resize();
        for (let k in self.CatalogModelPlane) {
            self.CatalogModelPlane[k].Resize();
        }
        ;
        for (let k in self.CatalogModelPlaneFire) {
            self.CatalogModelPlaneFire[k].Resize();
        }
        ;
        for (let k in self.CatalogModelPlaneLineHealth) {
            self.CatalogModelPlaneLineHealth[k].Resize();
        }
        ;
        for (let k in self.CatalogModelUfo) {
            self.CatalogModelUfo[k].Resize();
        }
        ;
        self.Points.Resize();
    };

    self.debounceSerie = function (func, interval, immediate) {
        let timer;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timer = null;
                if (!immediate)
                    func.apply(context, args);
            };
            let callNow = immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(later, interval);
            if (callNow)
                func.apply(context, args);
        };
    };

    self.randomDiap = function (n, m) {
        return Math.floor(
            Math.random() * (m - n + 1)
        ) + n;
    };

    self.updateView = function () {
        if (myView) {
            myView.update();
        }
        ;
        for (let k in self.CatalogModelStars) {
            self.CatalogModelStars[k].update();
        }
        ;
        if (self.isRunning) {
            self.UfoSmallFactory.Generate();

            for (let k in self.CatalogModelPlane) {
                self.CatalogModelPlane[k].update();
            }
            ;
            for (let k in self.CatalogModelPlaneFire) {
                self.CatalogModelPlaneFire[k].update();
            }
            ;
            for (let k in self.CatalogModelUfo) {
                self.CatalogModelUfo[k].update();
            }
            ;
            for (let k in self.CatalogModelUfoFire) {
                self.CatalogModelUfoFire[k].update();
            }
            ;
            for (let k in self.CatalogModelUfoSmallDamage) {
                self.CatalogModelUfoSmallDamage[k].update();
            }
            ;
            for (let k in self.CatalogModelUfoSmallExplosion) {
                self.CatalogModelUfoSmallExplosion[k].update();
            }
            ;
            for (let k in self.CatalogModelDamagedScreen) {
                self.CatalogModelDamagedScreen[k].update();
            }
            ;
            for (let k in self.CatalogModelPlaneLineHealth) {
                self.CatalogModelPlaneLineHealth[k].update();
            }
            ;
            for (let k in self.CatalogModelPlaneDamage) {
                self.CatalogModelPlaneDamage[k].update();
            }
            ;
            self.Collisions.CoolPlaneBulletUfo();
            self.Collisions.CoolPlane_Ufo();

        } else {
            // return;
        }
        requestAnimationFrame(self.updateView);
    };
};

function Game(playerName, difficult) {
    let self = this;
    let containerElem1 = document.getElementById('GameWindow');
    let player = playerName;
    let diffGame = difficult;
    let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let searchParams = new URLSearchParams();
    searchParams.append("f", "READ");
    switch (diffGame) {
        case "easy":
            searchParams.append("n", "BULYHA_GAME_UFO_EASY");
            fetch(ajaxLink, {method: "post", body: searchParams})
                .then(response => response.json())
                .then(data => {
                    self.options = JSON.parse(data.result);
                    self.start();
                })
                .catch(error => alert("Возникла неисправность!"));
            break;
        case "normal":
            searchParams.append("n", "BULYHA_GAME_UFO_NORMAL");
            fetch(ajaxLink, {method: "post", body: searchParams})
                .then(response => response.json())
                .then(data => {
                    self.options = JSON.parse(data.result);
                    self.start();
                })
                .catch(error => alert("Возникла неисправность!"));
            break;
        case "hard":
            searchParams.append("n", "BULYHA_GAME_UFO_HARD");
            fetch(ajaxLink, {method: "post", body: searchParams})
                .then(response => response.json())
                .then(data => {
                    self.options = JSON.parse(data.result);
                    self.start();
                })
                .catch(error => alert("Возникла неисправность!"));
            break;
    }
    ;
    self.options = null;
    self.ufo = null;
    self.save = function () {
        let score = null;
        let scoreJSON = null;
        let searchParamsLOCKGET = new URLSearchParams();
        let searchParamsUPDATE = new URLSearchParams();
        let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
        let password = Math.random();
        searchParamsLOCKGET.append("f", "LOCKGET");
        searchParamsLOCKGET.append("n", "BULYHA_GAME_UFO_SCORE");
        searchParamsLOCKGET.append("p", password);
        searchParamsUPDATE.append("f", "UPDATE");
        searchParamsUPDATE.append("n", "BULYHA_GAME_UFO_SCORE");
        searchParamsUPDATE.append("p", password);


        function comparePoints(a, b) {
            return b.points - a.points;
        };
        fetch(ajaxLink, {method: "post", body: searchParamsLOCKGET})
            .then(response => response.json())
            .then(data => {
                score = JSON.parse(data.result);
                score.push({name: player, points: self.ufo.Points.points, dif: diffGame});
                score.sort(comparePoints);
                scoreJSON = JSON.stringify(score);
                searchParamsUPDATE.append("v", scoreJSON);
                return fetch(ajaxLink, {method: "post", body: searchParamsUPDATE})
            }).then(response => switchToMainPage())
            .catch(error => alert("Возникла неисправность!"));
    };
    self.start = function () {
        self.ufo = new GameModel(self);
        let ufoView = new GameView(self);
        self.ufo.start(ufoView, containerElem1);
        ufoView.start(self.ufo, containerElem1);
        self.ufo.StarFactory.Create();
        self.ufo.PlaneFactory.Create();
        self.ufo.updateView();
        ufoView.update();
        let ufoController = new GameController(self);
        ufoController.start(self.ufo, containerElem1);
        document.getElementById('GameMenuExit').addEventListener("click", ufoGameGlobal.save);
    };
};

function gameCreate(player, difficult) {
    ufoGameGlobal = new Game(player, difficult);
};
let ufoGameGlobal = null;