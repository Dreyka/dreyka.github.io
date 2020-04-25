"use strict";

// В хэше tennis задаем стили и размеры элементов (поля, мячика, ракеток, кнопки, табло)
// и далее передаем этот хэш объкту класса TennisDOM.
let tennis = {
    "field": {
        "height": [400, "px"],
        "width": [800, "px"],
        "background-color": "#f0ee7e",
        "position": "relative",
        "box-sizing": "border-box",
        "margin": "0 auto",
    },
    "ball": {
        "height": [30, "px"],
        "width": [30, "px"],
        "background-color": "#f02137",
        "border-radius": [50, "%"],
        "position": "absolute",
        "z-index": 3,
    },
    "ballSpeed": [5, "px"],
    "tennisRacquet1": {
        "width": [10, "px"],
        "height": [200, "px"],
        "background-color": "#09aa57",
        "position": "absolute",
        "left": [0, "px"],
    },
    "tennisRacquet2": {
        "width": [10, "px"],
        "height": [200, "px"],
        "background-color": "#191497",
        "position": "absolute",
        "right": [0, "px"],
    },
    "score": {
        "display": "block",
        "font-size": [30, "px"],
        "font-weight": "bold",
        "text-align": "center",
    },
    "buttonStart": {
        "width": [120, "px"],
        "text-align": "center",
        "line-height": [24, "px"],
        "font-size": [18, "px"],
        "background-color": "#d9d9d3",
        "position": "absolute",
        "border-radius": [35, "px"],
        "left": [0, "px"],
        "top": [-30, "px"],
    }
};

function TennisDOM(tennis, parLink) {
    let self = this;
    let tennisPar = tennis;
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

//Приватный метод для получения случайного числа
    function randomDiap(n, m) {
        return Math.floor(
            Math.random() * (m - n + 1)
        ) + n;
    };

//Создаем поле которое отражает счет
    let score = document.createElement("span");
    score.style.cssText = constructorStyle(tennisPar.score);
    let scoreLeft = document.createElement("span");
    scoreLeft.textContent = "0";
    let scoreCenter = document.createElement("span");
    scoreCenter.textContent = ":";
    let scoreRight = document.createElement("span");
    scoreRight.textContent = "0";
    score.appendChild(scoreLeft);
    score.appendChild(scoreCenter);
    score.appendChild(scoreRight);

//Создаем кнопку запуска игры
    let buttonStart = document.createElement("button");
    buttonStart.style.cssText = constructorStyle(tennisPar.buttonStart);
    buttonStart.textContent = "старт!";
    buttonStart.addEventListener("click", start);

//Создаем игровое поле (при помощи приватного метода constructorStyle)
    let field = document.createElement("div");
    field.style.cssText = constructorStyle(tennisPar.field);
// Для поля создаем аттрибут data-play, чтобы у нас была информация когда летит мячик
    field.setAttribute("data-play", "false");

//Создаем мячик и хэш с позицией и скоростью ракетки
    let ballPos = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        update: function () {
            ball.style.top = ballPos.y + "px";
            ball.style.left = ballPos.x + "px";
        }
    };
    let ball = document.createElement("div");
    ball.style.cssText = constructorStyle(tennisPar.ball);
    ballPos.y = (tennisPar.field.height[0] - tennisPar.ball.height[0]) / 2;
    ballPos.x = (tennisPar.field.width[0] - tennisPar.ball.width[0]) / 2;
    ballPos.update();

// Создаем левую ракетку и хэш с позицией и скоростью ракетки
    let tennisRacquet1Pos = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        update: function () {
            tennisRacquet1.style.top = tennisRacquet1Pos.y + "px";
        }
    };

    let tennisRacquet1 = document.createElement("div");
    tennisRacquet1.style.cssText = constructorStyle(tennisPar.tennisRacquet1);

// Создаем правую ракенку и хэш с позицией и скоростью ракетки
    let tennisRacquet2Pos = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        update: function () {
            tennisRacquet2.style.top = tennisRacquet2Pos.y + "px";
        }
    };
    let tennisRacquet2 = document.createElement("div");
    tennisRacquet2.style.cssText = constructorStyle(tennisPar.tennisRacquet2);

// Добавляем обработчик события нажатия клавиши на клавиатуре
    window.addEventListener("keydown", tennisRacquetMove);
    window.addEventListener("keyup", tennisRacquetStop);

// Функция обработчик для управления ракетками
    function tennisRacquetMove(EO) {
        EO = EO || window.event;
        if (EO.keyCode === 16) {
            tennisRacquet1Pos.speedY = -3;
        }
        if (EO.keyCode === 17) {
            tennisRacquet1Pos.speedY = 3;
        }
        if (EO.keyCode === 38) {
            tennisRacquet2Pos.speedY = -3;
        }
        if (EO.keyCode === 40) {
            tennisRacquet2Pos.speedY = 3;
        }
    }

    function tennisRacquetStop(EO) {
        EO = EO || window.event;
        if (EO.keyCode === 16) {
            tennisRacquet1Pos.speedY = 0;
        }
        if (EO.keyCode === 17) {
            tennisRacquet1Pos.speedY = 0;
        }
        if (EO.keyCode === 38) {
            tennisRacquet2Pos.speedY = 0;
        }
        if (EO.keyCode === 40) {
            tennisRacquet2Pos.speedY = 0;
        }
    }

    function start() {
        if (field.getAttribute("data-play") === "true") return;
        field.setAttribute("data-play", "true");
        ballPos.y = (tennisPar.field.height[0] - tennisPar.ball.height[0]) / 2;
        ballPos.x = (tennisPar.field.width[0] - tennisPar.ball.width[0]) / 2;

        // Случайное чило 1-право, 2-лево
        let randomNumber = randomDiap(1, 2);
        let randomAngle = 0;

        // Направление полета мячика, задаем диапазон углов в градусах под которы вылетает мяч.
        // Отсчет происходит по часовой стрелке от вертикали
        if (randomNumber === 1) {
            randomAngle = randomDiap(80, 100);
        } else if (randomNumber === 2) {
            randomAngle = randomDiap(240, 300);
        }
        ;
        ballPos.speedX = tennisPar.ballSpeed[0] * Math.cos((randomAngle - 90) / 180 * Math.PI);
        ballPos.speedY = tennisPar.ballSpeed[0] * Math.sin((randomAngle - 90) / 180 * Math.PI);

        function play() {
            ballPos.x += ballPos.speedX;
            ballPos.y += ballPos.speedY;
            tennisRacquet1Pos.y += tennisRacquet1Pos.speedY;
            tennisRacquet2Pos.y += tennisRacquet2Pos.speedY;
            if (tennisRacquet1Pos.y < 0) tennisRacquet1Pos.y = 0;
            if (tennisRacquet1Pos.y > tennisPar.field.height[0] - tennisPar.tennisRacquet1.height[0]) tennisRacquet1Pos.y = tennisPar.field.height[0] - tennisPar.tennisRacquet1.height[0];
            if (tennisRacquet2Pos.y < 0) tennisRacquet2Pos.y = 0;
            if (tennisRacquet2Pos.y > tennisPar.field.height[0] - tennisPar.tennisRacquet2.height[0]) tennisRacquet2Pos.y = tennisPar.field.height[0] - tennisPar.tennisRacquet2.height[0];
            tennisRacquet1Pos.update();
            tennisRacquet2Pos.update();

            // Мячик отбиваем левой ракеткой
            if (ballPos.x > 0 &&
                ballPos.x <= tennisPar.tennisRacquet1.width[0] &&
                (ballPos.y + tennisPar.ball.height[0] / 2) > tennisRacquet1Pos.y &&
                (ballPos.y + tennisPar.ball.height[0] / 2) < (tennisRacquet1Pos.y + tennisPar.tennisRacquet1.height[0])) {
                ballPos.speedX = -ballPos.speedX;
            }

            // Мячик отбиваем правой ракеткой
            if (ballPos.x + tennisPar.ball.width[0] < tennisPar.field.width[0] &&
                ballPos.x + tennisPar.ball.width[0] >= (tennisPar.field.width[0] - tennisPar.tennisRacquet2.width[0]) &&
                (ballPos.y + tennisPar.ball.height[0] / 2) > tennisRacquet2Pos.y &&
                (ballPos.y + tennisPar.ball.height[0] / 2) < (tennisRacquet2Pos.y + tennisPar.tennisRacquet2.height[0])) {
                ballPos.speedX = -ballPos.speedX;
            }

            // Удар о левую стенку: останавливаем игру, фиксируем мячик возле левой стенки, увеличиваем счет на 1 и
            // обнуляем аттрибут data-play у поля.
            if (ballPos.x < 0) {
                ballPos.x = 0;
                scoreRight.textContent = Number(scoreRight.textContent) + 1;
                field.setAttribute("data-play", "false");
                ballPos.update();
                return;
            }

            // Удар о правую стенку: останавливаем игру, фиксируем мячик возле левой стенки, увеличиваем счет на 1 и
            // обнуляем аттрибут data-play у поля.
            if (ballPos.x + tennisPar.ball.width[0] >= tennisPar.field.width[0]) {
                ballPos.x = tennisPar.field.width[0] - tennisPar.ball.width[0];
                scoreLeft.textContent = Number(scoreLeft.textContent) + 1;
                field.setAttribute("data-play", "false");
                ballPos.update();
                return;
            }

            // Верхняя стенка
            if (ballPos.y < 0) {
                ballPos.speedY = -ballPos.speedY;
                ballPos.y = 0;
            }

            // Нижняя стенка
            if (ballPos.y + tennisPar.ball.height[0] >= tennisPar.field.height[0]) {
                ballPos.speedY = -ballPos.speedY;
                ballPos.y = tennisPar.field.height[0] - tennisPar.ball.height[0];
            }
            ballPos.update();

            requestAnimationFrame(play);
        }

        requestAnimationFrame(play);
    };

    field.appendChild(ball);
    field.appendChild(tennisRacquet1);
    field.appendChild(tennisRacquet2);
    field.appendChild(buttonStart);
    parent.appendChild(score);
    parent.appendChild(field);
}

let myTennis = new TennisDOM(tennis, document.getElementById('Game'));

