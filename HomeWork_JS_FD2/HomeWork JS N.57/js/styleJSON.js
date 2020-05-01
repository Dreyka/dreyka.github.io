"use strict";

let clockDOM = {
    "numberOfHours": 12,
    "delta": 0.1,
    "secondHandHeight": 0.95,
    "minuteHandHeight": 0.85,
    "hourHandHeight": 0.7,
    "clockFace": {
        "height": [400, "px"],
        "width": [400, "px"],
        "background-color": "#fcca66",
        "border-radius": [50, "%"],
        "position": "relative"
    },
    "clockNumbers": {
        "height": [50, "px"],
        "width": [50, "px"],
        "background-color": "#48b382",
        "border-radius": [50, "%"],
        "position": "absolute",
        "text-align": "center",
        "font-size": [30, "px"],
        "line-height": [50, "px"]
    },
    "secondHand": {
        "width": [2, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [1, "px"]
    },
    "minuteHand": {
        "width": [4, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [2, "px"]
    },
    "hourHand": {
        "width": [6, "px"],
        "background-color": "black",
        "position": "absolute",
        "border-radius": [3, "px"]
    },
    "button": {
        "width": [80, "px"],
        "font-size": [24, "px"],
        "line-height": [30, "px"],
        "text-align": "center",
        "margin-right": [15, "px"],
    },
    "buttonStartText": "старт",
    "buttonStopText": "стоп",
    "clockText": {
        "font-size": [20, "px"],
        "line-height": [30, "px"],
    }
};
let clockSVG = {
    "numberOfHours": 12,
    "svg": {
        "width": 400,
        "height": 400,
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 400 400",
        "display": "block"
    },
    "clockFace": {
        "cx": 200,
        "cy": 200,
        "r": 200,
        "fill": "#fcca66",
    },
    "clockNumbers": {
        "r": 25,
        "fill": "#48b382",
    },
    "clockNumberstext": {
        "fill": "black",
        "font-size": 30,
        "line-height": 30,
        "text-anchor": "middle",
    },
    "secondHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 2,
    },
    "minuteHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 4,
    },
    "hourHand": {
        "stroke": "black",
        "stroke-linecap": "round ",
        "stroke-width": 6,
    },
    "digitalClock": {
        "fill": "black",
        "font-size": 30,
        "line-height": 30,
        "text-anchor": "middle",
    },
    "button": {
        "width": [80, "px"],
        "font-size": [24, "px"],
        "line-height": [30, "px"],
        "text-align": "center",
        "margin-right": [15, "px"],
    },
    "buttonStartText": "старт",
    "buttonStopText": "стоп",
    "clockText": {
        "font-size": [20, "px"],
        "line-height": [30, "px"],
    }
};
let clockCanvas = {
    "numberOfHours": 12,
    "canvasObjAttr": {
        "width": 400,
        "height": 400,
        "display": "block"
    },
    "canvasStyle": {
        "display": "block"
    },
    "clockFace": {
        x: 200,
        y: 200,
        r: 200,
        fillStyle: "#fcca66",
    },
    "clockNumbers": {
        r: 25,
        delta: 0.9, // смещение цифр относительно окружности циферблата
        fillStyle: "#48b382",
    },
    "clockNumberstext": {
        fillStyle: "black",
        font: "normal 30px Arial",
        textAlign: "center",
        textBaseline: "middle",
    },
    "secondHand": {
        strokeStyle: "black",
        lineWidth: 2,
        delta: 0.9,//размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.15, // смещение стрелки относительно центра циферблата

        lineCap: "round",
    },
    "minuteHand": {
        strokeStyle: "black",
        lineWidth: 4,
        delta: 0.8,//размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.1,// смещение стрелки относительно центра циферблата
        lineCap: "round",
    },
    "hourHand": {
        strokeStyle: "black",
        lineWidth: 6,
        delta: 0.7, //размер стрелки (относительно центра циферблата) в зависимости от радиуса циферблата
        offset: 0.05,// смещение стрелки относительно центра циферблата
        lineCap: "round",
    },
    "digitalClock": {
        fillStyle: "black",
        font: "normal 30px Arial",
        textAlign: "center",
        textBaseline: "middle",
        deltaY: 0.5,// смещение цифровых часов по вертикали относительно центра циферблата
    },
    "button": {
        "width": [80, "px"],
        "font-size": [24, "px"],
        "line-height": [30, "px"],
        "text-align": "center",
        "margin-right": [15, "px"],
    },
    "buttonStartText": "старт",
    "buttonStopText": "стоп",
    "clockText": {
        "font-size": [20, "px"],
        "line-height": [30, "px"],
    }
};
let timezone = {
    "GMT-5": [-5, "Нью-Йорк"],
    "GMT": [0, "Лондон"],
    "GMT+1": [1, "Берлин"],
    "GMT+3": [3, "Минск"],
    "GMT+9": [9, "Токио"],
    "GMT+10": [10, "Владивосток"],
};

let clockDOM_JSON = JSON.stringify(clockDOM);
let clockSVG_JSON = JSON.stringify(clockSVG);
let clockCanvas_JSON = JSON.stringify(clockCanvas);
let timezone_JSON = JSON.stringify(timezone);