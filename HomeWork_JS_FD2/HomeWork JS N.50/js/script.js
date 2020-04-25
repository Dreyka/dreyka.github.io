"use strict";

// В хэше tennis задаем стили и размеры элементов (поля, мячика, ракеток, кнопки, табло)
// и далее передаем этот хэш объкту класса TennisCanvas.
let tennis = {
    "canvas": {
        "height": 500,
        "width": 900,
    },
    "field": {
        "x": 100,
        "y": 100,
        "height": 400,
        "width": 800,
        "fill": "#f0ee7e",
    },
    "ball": {
        "r": 15,
        "fill": "#f02137",
    },
    "ballSpeed": 5,
    "tennisRacquet1": {
        "height": 200,
        "width": 10,
        "fill": "#09aa57",
    },
    "tennisRacquet2": {
        "height": 200,
        "width": 10,
        "fill": "#191497",
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
        "left": [150, "px"],
        "top": [30, "px"],
    }
};

function TennisCanvas(tennis, parLink) {
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

//Приватный метод для присвоения атрибутов (стили прописаны в хэше tennis)
    function constructorAttribute(hash, elemLink) {
        for (let k in hash) {
            elemLink.setAttribute(k, hash[k])
        }
        ;
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

//Создаем canvas
    let canvas = document.createElement("canvas");
    constructorAttribute(tennisPar.canvas, canvas);
    let context = canvas.getContext("2d");
    // Для canvas создаем аттрибут data-play, чтобы у нас была информация когда летит мячик
    canvas.setAttribute("data-play", "false");

//Создаем хэш с позицией и скоростью мячика
    let ballPos = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
    };
    ballPos.y = (tennisPar.field.height + tennisPar.field.y) / 2;
    ballPos.x = (tennisPar.field.width + tennisPar.field.x) / 2;

// Создаем хэш с позицией и скоростью левой ракетки
    let tennisRacquet1Pos = {
        y: 0,
        speedY: 0,
    };
    tennisRacquet1Pos.y = tennisPar.field.y;

// Создаем хэш с позицией и скоростью правой ракетки
    let tennisRacquet2Pos = {
        y: 0,
        speedY: 0,
    };
    tennisRacquet2Pos.y = tennisPar.field.y;

// Создаем функцию для для прорисовки элементов
    function createFieldCanvas() {

        //Рисуем игровое поле
        context.fillStyle = tennisPar.field.fill;
        context.beginPath();
        context.fillRect(tennisPar.field.x, tennisPar.field.y, tennisPar.field.width, tennisPar.field.height);
        context.fill();

        //Рисуем мячик
        context.fillStyle = tennisPar.ball.fill;
        context.beginPath();
        context.arc(ballPos.x, ballPos.y, tennisPar.ball.r, Math.PI * 2, false);
        context.fill();

        //Рисуем левую ракетку
        context.fillStyle = tennisPar.tennisRacquet1.fill;
        context.beginPath();
        context.fillRect(tennisPar.field.x, tennisRacquet1Pos.y, tennisPar.tennisRacquet1.width, tennisPar.tennisRacquet1.height);
        context.fill();

        //Рисуем правую ракетку
        context.fillStyle = tennisPar.tennisRacquet2.fill;
        context.beginPath();
        context.fillRect((tennisPar.field.x + tennisPar.field.width - tennisPar.tennisRacquet2.width),
            tennisRacquet2Pos.y, tennisPar.tennisRacquet2.width, tennisPar.tennisRacquet2.height);
        context.fill();

    };
    createFieldCanvas();

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
        if (canvas.getAttribute("data-play") === "true") return;
        canvas.setAttribute("data-play", "true");
        ballPos.y = (tennisPar.field.height + tennisPar.field.y) / 2;
        ballPos.x = (tennisPar.field.width + tennisPar.field.x) / 2;

        // Случайное чило 1-право, 2-лево
        let randomNumber = randomDiap(1, 2);
        let randomAngle = 0;

        // Направление полета мячика, задаем диапазон углов в градусах под которы вылетает мяч.
        // Отсчет происходит по часовой стрелке от вертикали
        if (randomNumber === 1) {
            randomAngle = randomDiap(15, 165);
        } else if (randomNumber === 2) {
            randomAngle = randomDiap(195, 345);
        }
        ;
        ballPos.speedX = tennisPar.ballSpeed * Math.cos((randomAngle - 90) / 180 * Math.PI);
        ballPos.speedY = tennisPar.ballSpeed * Math.sin((randomAngle - 90) / 180 * Math.PI);

        function play() {
            ballPos.x += ballPos.speedX;
            ballPos.y += ballPos.speedY;
            tennisRacquet1Pos.y += tennisRacquet1Pos.speedY;
            tennisRacquet2Pos.y += tennisRacquet2Pos.speedY;
            if (tennisRacquet1Pos.y < tennisPar.field.y) tennisRacquet1Pos.y = tennisPar.field.y;
            if (tennisRacquet1Pos.y > (tennisPar.field.y + tennisPar.field.height - tennisPar.tennisRacquet1.height))
                tennisRacquet1Pos.y = tennisPar.field.y + tennisPar.field.height - tennisPar.tennisRacquet1.height;
            if (tennisRacquet2Pos.y < tennisPar.field.y) tennisRacquet2Pos.y = tennisPar.field.y;
            if (tennisRacquet2Pos.y > (tennisPar.field.y + tennisPar.field.height - tennisPar.tennisRacquet2.height))
                tennisRacquet2Pos.y = tennisPar.field.y + tennisPar.field.height - tennisPar.tennisRacquet2.height;

            // Мячик отбиваем левой ракеткой
            if ((ballPos.x - tennisPar.ball.r - tennisPar.field.x) > 0 &&
                (ballPos.x - tennisPar.ball.r - tennisPar.field.x) <= tennisPar.tennisRacquet1.width &&
                ballPos.y > tennisRacquet1Pos.y &&
                ballPos.y < tennisRacquet1Pos.y + tennisPar.tennisRacquet1.height) {
                ballPos.speedX = -ballPos.speedX;
            }
            //
            // Мячик отбиваем правой ракеткой
            if (ballPos.x + tennisPar.ball.r - tennisPar.field.x < tennisPar.field.width &&
                ballPos.x + tennisPar.ball.r - tennisPar.field.x >= (tennisPar.field.width - tennisPar.tennisRacquet2.width) &&
                ballPos.y > tennisRacquet2Pos.y &&
                ballPos.y < tennisRacquet2Pos.y + tennisPar.tennisRacquet2.height) {
                ballPos.speedX = -ballPos.speedX;
            }
            //
            // Удар о левую стенку: останавливаем игру, фиксируем мячик возле левой стенки, увеличиваем счет на 1 и
            // обнуляем аттрибут data-play у поля.
            if ((ballPos.x - tennisPar.ball.r - tennisPar.field.x) < 0) {
                ballPos.x = tennisPar.field.x + tennisPar.ball.r;
                // console.log(ballPos.x);
                scoreRight.textContent = Number(scoreRight.textContent) + 1;
                canvas.setAttribute("data-play", "false");
                createFieldCanvas();
                return;
            }

            // Удар о правую стенку: останавливаем игру, фиксируем мячик возле левой стенки, увеличиваем счет на 1 и
            // обнуляем аттрибут data-play у поля.
            if ((ballPos.x + tennisPar.ball.r - tennisPar.field.x) >= tennisPar.field.width) {
                ballPos.x = tennisPar.field.width - tennisPar.ball.r + tennisPar.field.x;
                scoreLeft.textContent = Number(scoreLeft.textContent) + 1;
                canvas.setAttribute("data-play", "false");
                createFieldCanvas();
                return;
            }

            // Верхняя стенка
            if (ballPos.y - tennisPar.ball.r - tennisPar.field.y < 0) {
                ballPos.speedY = -ballPos.speedY;
                ballPos.y = tennisPar.field.y + tennisPar.ball.r;
            }

            // Нижняя стенка
            if (ballPos.y + tennisPar.ball.r >= tennisPar.field.height + tennisPar.field.y) {
                ballPos.speedY = -ballPos.speedY;
                ballPos.y = tennisPar.field.y + tennisPar.field.height - tennisPar.ball.r;
            }
            createFieldCanvas();
            requestAnimationFrame(play);
        }

        requestAnimationFrame(play);
    };

    parent.appendChild(score);
    parent.appendChild(buttonStart);
    parent.appendChild(canvas);

}

let myTennis = new TennisCanvas(tennis, document.getElementById('Game'));

