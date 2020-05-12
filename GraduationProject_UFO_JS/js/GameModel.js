"use strict";

function GameModel() {
    let self = this;
    let myView = null;
    let myField = null;
    let isRunning = true;
    self.CPlaneType = "plane";
    self.CUfoSmallType = "ufoS";
    self.CUfoSmallBulletType = "ufoSBullet";
    self.CPlaneBulletLeftType = "planeBulletLeft";
    self.CPlaneBulletRightType = "planeBulletRight";
    self.CStarType = "star";
    self.myFieldWidth = 0;
    self.myFieldHeight = 0;

    self.CatalogModelPlane = {};
    self.CatalogModelPlaneFire = {};
    self.CatalogModelUfo = {};
    self.CatalogModelUfoFire = {};
    self.CatalogModelStars = {};

    function TPlane(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = this.Parent.CPlaneType;

        self.width = 0;
        self.height = 0;
        self.x = 0;
        self.y = 0;
        self.curSpeedX = 0;
        self.curSpeedY = 0;
        self.speedX = 4;
        self.speedY = 4;
        self.health = 100;
        self.fireStatus = false;
        self.fireSpeed = 10;
        self.fireSpeedCount = 8;

        self.Init = function (_Ident) {
            self.Ident = _Ident;
            self.width = self.Parent.myFieldWidth * 0.05;
            self.height = self.Parent.myFieldWidth * 0.05;
            self.x = (self.Parent.myFieldWidth - self.width) / 2;
            self.y = self.Parent.myFieldHeight - self.height;
            // self.speedX = self.Parent.myFieldWidth * 0.005;
            // self.speedY = self.Parent.myFieldWidth * 0.005;
            self.Parent.CatalogModelPlane[self.Ident] = self;
        };
        self.Resize = function () {
            self.width = self.Parent.myFieldWidth * 0.05;
            self.height = self.Parent.myFieldWidth * 0.05;
            self.x = (self.Parent.myFieldWidth - self.width) / 2;
            self.y = self.Parent.myFieldHeight - self.height;
            // self.speedX = self.Parent.myFieldWidth * 0.005;
            // self.speedY = self.Parent.myFieldWidth * 0.005;
        };
        self.Destroy = function () {
            delete self.Parent.CatalogModelPlane[self.Ident];
            self.Parent = null;
        };
        self.ControlFlyLeft = function () {
            self.curSpeedX = -self.speedX;
        };
        self.ControlFlyRight = function () {
            self.curSpeedX = self.speedX;
        };
        self.ControlFlyUp = function () {
            self.curSpeedY = -self.speedY;
        };
        self.ControlFlyDown = function () {
            self.curSpeedY = self.speedY;
        };
        self.ControlFlyStopLeftRight = function () {
            self.curSpeedX = 0;
            console.log("stop")
        };
        self.ControlFlyStopUpDown = function () {
            self.curSpeedY = 0;
        };
        self.update = function () {
            self.x += self.curSpeedX;
            if (self.x < 0) self.x = 0;
            if (self.x + self.width > self.Parent.myFieldWidth) self.x = self.Parent.myFieldWidth - self.width;
            self.y += self.curSpeedY;
            if (self.y < 0) self.y = 0;
            if (self.y + self.height > self.Parent.myFieldHeight) self.y = self.Parent.myFieldHeight - self.height;
            self.Fire();
        };
        self.FireStart = function () {

            self.fireStatus = true;
        };
        self.Fire = function () {
            if (self.fireStatus) {
                self.fireSpeedCount += 1;
                if (self.fireSpeedCount >= self.fireSpeed) {
                    self.PlaneBulletLeftFactory.Create();
                    self.PlaneBulletRightFactory.Create();
                    self.fireSpeedCount = 0;
                }
                ;
            }
            ;
        };
        self.FireStop = function () {
            self.fireSpeedCount = self.fireSpeed;
            self.fireStatus = false;
        };

        function TPlaneBulletLeft(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Ident = null;
            self.Type = self.Parent.Parent.CPlaneBulletLeftType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 3;
            self.damage = 3;
            self.Init = function (_Ident) {
                self.Ident = _Ident;
                self.width = self.Parent.width * 0.07;
                self.height = self.Parent.height * 0.2;
                self.x = self.Parent.x + self.Parent.width * 0.25;
                self.y = self.Parent.y + self.Parent.height * 0.2;
                self.Parent.Parent.CatalogModelPlaneFire[self.Ident] = self;
            };
            self.Destroy = function () {
                delete self.Parent.Parent.CatalogModelPlaneFire[self.Ident];
                self.Parent = null;
            };
            self.update = function () {
                self.y -= self.speedY;
                if ((self.y + self.height) < 0) self.Destroy();
            };
        };

        function TPlaneBulletRight(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Ident = null;
            self.Type = self.Parent.Parent.CPlaneBulletRightType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 5;
            self.damage = 3;
            self.Init = function (_Ident) {
                self.Ident = _Ident;
                self.width = self.Parent.width * 0.07;
                self.height = self.Parent.height * 0.2;
                self.x = self.Parent.x + self.Parent.width * 0.75;
                self.y = self.Parent.y + self.Parent.height * 0.2;
                self.Parent.Parent.CatalogModelPlaneFire[self.Ident] = self;
            };
            self.Destroy = function () {
                delete self.Parent.Parent.CatalogModelPlaneFire[self.Ident];
                self.Parent = null;
            };
            self.update = function () {
                self.y -= self.speedY;
                if ((self.y + self.height) < 0) self.Destroy();
            };
        };

        function PlaneBulletLeftFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;
            self.Create = function () {
                self.Counter++;
                let Ident = self.Parent.Parent.CPlaneBulletLeftType + self.Counter;
                let BulletLeft = new TPlaneBulletLeft(self.Parent);
                BulletLeft.Init(Ident);
                return BulletLeft;
            };
        };

        function PlaneBulletRightFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;
            self.Create = function () {
                self.Counter++;
                let Ident = self.Parent.Parent.CPlaneBulletRightType + self.Counter;
                let BulletRight = new TPlaneBulletRight(self.Parent);
                BulletRight.Init(Ident);
                return BulletRight;
            };
        };
        self.PlaneBulletLeftFactory = new PlaneBulletLeftFactory(self);
        self.PlaneBulletRightFactory = new PlaneBulletRightFactory(self);
    };

    function PlaneFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
        self.Create = function () {
            self.Counter++;
            let Ident = self.Parent.CPlaneType + self.Counter;
            let Plane = new TPlane(self.Parent);
            Plane.Init(Ident);
            return Plane;
        };
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

        //self.Init = function (_Ident) {
        //    self.Ident = _Ident;
        //    self.size = Math.random() * 2;
        //    self.speedY = Math.random() * 0.1;
        //    self.x = Math.random() * self.Parent.myFieldWidth;
        //    self.y = Math.random() * self.Parent.myFieldHeight;
        //    self.Parent.CatalogModelStars[self.Ident] = self;
        //};
        //self.Destroy = function () {
        //    delete self.Parent.CatalogModelStars[self.Ident];
        //    self.Parent = null;
        //};
        //self.reset = function () {
        //    self.size = Math.random() * 2;
        //    self.speedY = Math.random() * 0.1;
        //    self.y = 0;
        //    self.x = Math.random() * self.Parent.myFieldWidth;
        //};
        self.update = function () {
            //self.size = Math.random() * 2;
            //self.speedY = Math.random() * 0.05;
            //self.y = self.Parent.myFieldHeight;
            self.y += self.speedY;
            if (self.y > self.Parent.myFieldHeight) self.reset();
        };
    };

    TStar.prototype.Init = function (_Ident) {
        let self = this;
        self.Ident = _Ident;
        self.size = Math.random() * 2;
        self.speedY = Math.random() * 0.1;
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
        self.size = Math.random() * 2;
        self.speedY = Math.random() * 0.1;
        self.y = 0;
        self.x = Math.random() * self.Parent.myFieldWidth;
    };

    function StarFactory(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Counter = 0;
        self.Amount = 700;
        //self.Amount = self.Parent.myFieldWidth;
        self.Create = function () {
            for (let i = 0; i < self.Amount; i++) {
                self.Counter++;
                let Ident = self.Parent.CStarType + self.Counter;
                let Star = new TStar(self.Parent);
                Star.Init(Ident);
                //return Star;
            }
            ;
        };
    };

    self.StarFactory = new StarFactory(self);

    function TUfoSmall(_Parent) {
        let self = this;
        self.Parent = _Parent;
        self.Ident = null;
        self.Type = this.Parent.CUfoSmallType;

        self.width = 0;
        self.height = 0;
        self.x = 0;
        self.y = 0;
        // self.curSpeedX = 0;
        // self.curSpeedY = 0;
        self.speedX = 1;
        self.speedY = 0.3;
        self.health = 10;
        self.fireStatus = false;
        self.fireSpeed = 8;
        self.fireSpeedCount = 8;

        self.Init = function (_Ident) {
            self.Ident = _Ident;
            self.width = self.Parent.myFieldWidth * 0.03;
            self.height = self.Parent.myFieldWidth * 0.013;
            self.x = (self.Parent.myFieldWidth - self.width) * Math.random();
            self.y = -self.height;
            self.speedX = self.Parent.randomDiap(0.1, 1);
            self.Parent.CatalogModelUfo[self.Ident] = self;
        };
        self.Destroy = function () {
            delete self.Parent.CatalogModelUfo[self.Ident];
            self.Parent = null;
        };
        self.update = function () {
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
            // self.Fire();
        };
        self.Damaged = function (value) {
            self.health -= value;
            if (self.health <= 0) self.Destroy();
        };
        self.Fire = function () {
            self.fireSpeedCount += 1;
            if (self.fireSpeedCount >= self.fireSpeed) {
                self.UfoSmallBulletFactory.Create();
                self.fireSpeedCount = 0;
            }
            ;
        };

        function TUfoSmallBullet(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Ident = null;
            self.Type = self.Parent.Parent.CUfoSmallBulletType;

            self.x = 0;
            self.y = 0;
            self.width = 0;
            self.height = 0;
            self.speedY = 5;
            self.damage = 3;
            self.Init = function (_Ident) {
                self.Ident = _Ident;
                self.width = self.Parent.width * 0.07;
                self.height = self.width * 0.41;
                self.x = self.Parent.x + self.Parent.width * 0.5 - self.width * 0.5;
                self.y = self.Parent.y + self.Parent.height;
                self.Parent.Parent.CatalogModelUfoFire[self.Ident] = self;
            };
            self.Destroy = function () {
                delete self.Parent.Parent.CatalogModelUfoFire[self.Ident];
                self.Parent = null;
            };
            self.update = function () {
                self.y += self.speedY;
                if ((self.y + self.height) < 0) self.Destroy();
            };
        };

        function UfoSmallBulletFactory(_Parent) {
            let self = this;
            self.Parent = _Parent;
            self.Counter = 0;
            self.Create = function () {
                self.Counter++;
                let Ident = self.Parent.Parent.CUfoSmallBulletType + self.Counter;
                let UfoSmallBullet = new TUfoSmallBullet(self.Parent);
                UfoSmallBullet.Init(Ident);
                return UfoSmallBullet;
            };
        };

        //self.UfoSmallBulletFactory = new UfoSmallBulletFactory(self);
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

                        self.Parent.CatalogModelUfo[m].Damaged(self.Parent.CatalogModelPlaneFire[k].damage);
                        self.Parent.CatalogModelPlaneFire[k].Destroy();
                        break;
                    }
                    ;
                }
                ;
            }
            ;
        };
    };
    self.Collisions = new TCollisions(self);

    self.start = function (view, field) {
        myView = view;
        myField = field;
        window.addEventListener("resize", self.debounceSerie(self.myFieldResize, 500, false))
        self.updateSize();
    };

    self.updateSize = function () {
        self.myFieldWidth = myField.offsetWidth;
        self.myFieldHeight = self.myFieldWidth * 0.55;
    };

    self.myFieldResize = function () {
        self.updateSize();
        myView.gameAreaSize();
        for (let k in self.CatalogModelPlane) {
            self.CatalogModelPlane[k].Resize();
        }
        ;
        // self.updateView();
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
        if (isRunning) {
            self.UfoSmallFactory.Generate();
            for (let k in self.CatalogModelStars) {
                self.CatalogModelStars[k].update();
            }
            ;
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
            self.Collisions.CoolPlaneBulletUfo();
            requestAnimationFrame(self.updateView);
        } else {
            return;
        }
    };
};

let containerElem1 = document.getElementById('GameWindow');

let ufo = new GameModel();
let ufoView = new GameView();
let ufoController = new GameController();
ufo.start(ufoView, containerElem1);
ufoView.start(ufo, containerElem1);
ufoController.start(ufo, containerElem1);
ufo.PlaneFactory.Create();
ufo.StarFactory.Create();
ufo.updateView();
ufoView.update();
