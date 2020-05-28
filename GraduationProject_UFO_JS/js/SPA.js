"use strict";
window.addEventListener("load", switchToStateFromURLHash);
window.addEventListener("hashchange", switchToStateFromURLHash);
let SPAState = {};
let difficult = "normal";
let playerName = "";

function switchToStateFromURLHash() {
    let URLHash = window.location.hash;
    let stateStr = URLHash.substr(1);
    if (stateStr != "") {
        SPAState = {pagename: stateStr};
    } else {
        SPAState = {pagename: 'Main'};
    }
    ;

    let pageHTML = "";
    switch (SPAState.pagename) {
        case 'Main':
            pageHTML += "<div class=\"logo\">\n" +
                "            <div class=\"logoImg\"></div>\n" +
                "            <span class=\"logoText\">UFO Game</span>\n" +
                "        </div>";
            pageHTML += " <div class=\"mainMenu\">\n" +
                "            <span class=\"menuCaption\">Menu</span>\n" +
                "            <button id=\"Play\" class=\"mainMenuButton\">Play</button>\n" +
                "            <button id=\"Score\" class=\"mainMenuButton\">Score</button>\n" +
                "            <button id=\"Faq\" class=\"mainMenuButton\">FAQ</button>\n" +
                "        </div>";
            pageHTML += "<div class=\"created\">\n" +
                "            <span>Created by Andrey Bulyha, 2020</span>\n" +
                "        </div>";
            document.getElementById('IPage').innerHTML = pageHTML;
            document.getElementById('Score').addEventListener("click", switchToScorePage);
            document.getElementById('Faq').addEventListener("click", switchToFaqPage);
            document.getElementById('Play').addEventListener("click", switchToGameOptionsPage);
            break;
        case 'Score':
            pageHTML += "<div class=\"logo\">\n" +
                "            <div class=\"logoImg\"></div>\n" +
                "            <span class=\"logoText\">UFO Game</span>\n" +
                "        </div>";
            pageHTML += "<div class=\"score\">\n" +
                "            <span class=\"caption\">Result table</span>\n" +
                "            <div class=\"scoreTable\">\n" +
                "                <div class=\"tableRow tableHead\">\n" +
                "                    <div class=\"number\"><span>N</span></div>\n" +
                "                    <div class=\"Name\"><span>Name</span></div>\n" +
                "                    <div class=\"difficulty\"><span>Difficulty</span></div>\n" +
                "                    <div class=\"points\"><span>Points</span></div>\n" +
                "                </div>\n" +
                "                <div id=\"ScoreTableGame\"></div>\n" +
                "            </div>\n" +
                "            <button id=\"BackMainMenu1\" class=\"menuBackButton\">Back</button>\n" +
                "        </div>";
            pageHTML += "<div class=\"created\">\n" +
                "            <span>Created by Andrey Bulyha, 2020</span>\n" +
                "        </div>";
            document.getElementById('IPage').innerHTML = pageHTML;
            scoreLoad();
            document.getElementById('BackMainMenu1').addEventListener("click", switchToMainPage);
            break;
        case 'FAQ':
            pageHTML += "<div class=\"logo\">\n" +
                "            <div class=\"logoImg\"></div>\n" +
                "            <span class=\"logoText\">UFO Game</span>\n" +
                "        </div>";
            pageHTML += "<div class=\"faq\">\n" +
                "            <div class=\"item\">\n" +
                "                <span class=\"caption\">Keyboard control</span>\n" +
                "                <span>A - move left</span>\n" +
                "                <span>D - move right</span>\n" +
                "                <span>S - move down</span>\n" +
                "                <span>W - move up</span>\n" +
                "                <span>L - fire</span>\n" +
                "            </div>\n" +
                "            <div class=\"item\">\n" +
                "                <span class=\"caption\">Touch control</span>\n" +
                "                <span>If the device supports touch, a panel appears to screen for controlling the gameplay.</span>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <button id=\"BackMainMenu1\" class=\"menuBackButton\">Back</button>";
            pageHTML += "<div class=\"created\">\n" +
                "            <span>Created by Andrey Bulyha, 2020</span>\n" +
                "        </div>";
            document.getElementById('IPage').innerHTML = pageHTML;
            document.getElementById('BackMainMenu1').addEventListener("click", switchToMainPage);
            break;
        case 'gameOptions':
            pageHTML += "<div class=\"logo\">\n" +
                "            <div class=\"logoImg\"></div>\n" +
                "            <span class=\"logoText\">UFO Game</span>\n" +
                "        </div>";
            pageHTML += "<div class=\"gameOptions\">\n" +
                "            <span class=\"caption\">Game options</span>\n" +
                "            <div class=\"playerName\">\n" +
                "                <span>Player name:</span>\n" +
                "                <input id=\"playerName\" type=\"text\" value=\"Player\">\n" +
                "            </div>\n" +
                "            <div class=\"difficult\">\n" +
                "                <span>Choose game difficulty:</span>\n" +
                "                <div id=\"Difficult\" class=\"difficultItems\">\n" +
                "                    <div class=\"item\">\n" +
                "                        <button class=\"difButton\" data-state=\"false\" data-value=\"easy\">Easy</button>\n" +
                "                        <span>UFOs have low health and low damage.</span>\n" +
                "                    </div>\n" +
                "                    <div class=\"item\">\n" +
                "                        <button class=\"difButton\" data-state=\"true\" data-value=\"normal\">Normal</button>\n" +
                "                        <span>UFOs have average health and normal damage.</span>\n" +
                "                    </div>\n" +
                "                    <div class=\"item\">\n" +
                "                        <button class=\"difButton\" data-state=\"false\" data-value=\"hard\">Hard</button>\n" +
                "                        <span>UFOs have a lot of health, high damage and high speed.</span>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"gameOptionsButtons\">\n" +
                "                <button id=\"BackMainMenu2\" class=\"menuBackButton\">Back</button>\n" +
                "                <button id=\"Start\" class=\"start\">Start Play</button>\n" +
                "            </div>\n" +
                "        </div>";
            pageHTML += "<div class=\"created\">\n" +
                "            <span>Created by Andrey Bulyha, 2020</span>\n" +
                "        </div>";
            document.getElementById('IPage').innerHTML = pageHTML;
            let diffElem = document.getElementById('Difficult').querySelectorAll(".difficultItems .difButton");
            for (let i = 0; i < diffElem.length; i++) {
                diffElem[i].addEventListener("click", switchDifficult);
            }
            document.getElementById('BackMainMenu2').addEventListener("click", switchToMainPage);
            document.getElementById('Start').addEventListener("click", switchToGamePage);
            break;
        case 'Game':
            pageHTML += "<div id=\"GameWindow\"></div>\n" +
                "        <button id=\"GameMenuButton\" class=\"gameMenuButton\"></button>\n" +
                "        <div id=\"GameMenu\" class=\"gameMenu\" data-state=\"close\">\n" +
                "            <div>\n" +
                "                <span>Menu</span>\n" +
                "                <span>game paused</span>\n" +
                "                <button id=\"GameMenuContinue\">Continue</button>\n" +
                "                <button id=\"GameMenuExit\">Exit</button>\n" +
                "            </div>\n" +
                "        </div>";
            if (isTouch()) {
                pageHTML += "<div class=\"touchControl\">\n" +
                    "            <div class=\"touchMove\">\n" +
                    "                <button id=\"FlyTop\"></button>\n" +
                    "                <button id=\"FlyRight\"></button>\n" +
                    "                <button id=\"FlyLeft\"></button>\n" +
                    "                <button id=\"FlyBottom\"></button>\n" +
                    "            </div>\n" +
                    "            <div class=\"touchFire\">\n" +
                    "                <button id=\"Fire\"></button>\n" +
                    "            </div>\n" +
                    "        </div>";
            }
            ;
            document.getElementById('IPage').innerHTML = pageHTML;
            document.getElementById('GameMenuButton').addEventListener("click", gameMenuControl);
            document.getElementById('GameMenuContinue').addEventListener("click", gameMenuControl);
            gameCreate(playerName, difficult);
            break;
    };
};

function switchToState(newState) {
    let stateStr = newState.pagename;
    location.hash = stateStr;
};

function switchToMainPage() {
    switchToState({pagename: 'Main'});
};
function switchToFaqPage() {
    switchToState({pagename: 'FAQ'});
};
function switchToScorePage() {
    switchToState({pagename: 'Score'});
};

function switchToGameOptionsPage() {
    switchToState({pagename: 'gameOptions'});
};

function switchToGamePage() {
    playerName = document.getElementById('playerName').value;
    switchToState({pagename: 'Game'});
};

function isTouch() {
    return !!("ontouchstart" in window || navigator.maxTouchPoints);
};

function gameMenuControl() {
    let menu = document.getElementById("GameMenu");
    if (menu.getAttribute("data-state") === "close") {
        let gamePause = new CustomEvent("pause", {bubbles: true});
        menu.dispatchEvent(gamePause);
        menu.setAttribute("data-state", "open");
    } else if (menu.getAttribute("data-state") === "open") {
        let gamePlay = new CustomEvent("play", {bubbles: true});
        menu.dispatchEvent(gamePlay);
        menu.setAttribute("data-state", "close");
    }
    ;
};

function switchDifficult() {
    let elems = document.getElementById('Difficult').querySelectorAll(".difficultItems .difButton");
    for (let i = 0; i < elems.length; i++) {
        elems[i].setAttribute("data-state", "false");
    }
    ;
    difficult = this.getAttribute("data-value");
    this.setAttribute("data-state", "true");
};

function scoreLoad() {
    let ajaxLink = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let searchParams = new URLSearchParams();
    searchParams.append("f", "READ");
    searchParams.append("n", "BULYHA_GAME_UFO_SCORE");
    fetch(ajaxLink, {method: "post", body: searchParams})
        .then(response => response.json())
        .then(data => {
            let pageHTML = "";
            let dataArray = JSON.parse(data.result);
            for (let i = 0; i < dataArray.length; i++) {
                pageHTML += "<div class=\"tableRow\">\n" +
                    "                <div class=\"number\"><span>" + (i + 1) + "</span></div>\n" +
                    "                <div class=\"Name\"><span>" + dataArray[i].name + "</span></div>\n" +
                    "                <div class=\"difficulty\"><span>" + dataArray[i].dif + "</span></div>\n" +
                    "                <div class=\"points\"><span>" + dataArray[i].points + "</span></div>\n" +
                    "            </div>"
            }
            ;
            document.getElementById("ScoreTableGame").innerHTML = pageHTML;
        })
        .catch(error => alert("Возникла неисправность!"));
};

function debounceSerie(func, interval, immediate) {
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
