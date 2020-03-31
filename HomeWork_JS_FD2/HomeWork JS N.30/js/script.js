"use strict";

function findElem(EO) {
    EO = EO || window.event;
    let area = document.getElementById("Area");
    let img = area.querySelectorAll("div[class^='img']");
    for (let i = 0; i < img.length; i++) {
        img[i].style.left = img[i].offsetLeft + "px";
        img[i].style.top = img[i].offsetTop + "px";
    }
    for (let i = 0; i < img.length; i++) {
        img[i].style.position = "absolute";
    }
}

window.addEventListener("DOMContentLoaded", findElem, false);

function elemStart(EO) {
    EO = EO || window.event;
    let picture = this;
    let posX = EO.clientX - this.offsetLeft;
    let posY = EO.clientY - this.offsetTop;
    for (let i = 0; i < img.length; i++) {
        img[i].style.zIndex = "1";
    }
    ;
    this.style.zIndex = "3";
    this.style.cursor = "progress";

    function elemMove(EO) {
        EO = EO || window.event;
        picture.style.left = (EO.clientX - posX) + "px";
        picture.style.top = (EO.clientY - posY) + "px";
    };

    function elemEnd(EO) {
        EO = EO || window.event;
        document.removeEventListener("mousemove", elemMove, false);
        this.style.cursor = "auto";
    }

    document.addEventListener("mousemove", elemMove, false);
    this.addEventListener("mouseup", elemEnd, false);
}

let area = document.getElementById("Area");
let img = area.querySelectorAll("div[class^='img']");


for (let i = 0; i < img.length; i++) {
    img[i].addEventListener("mousedown", elemStart, false);
    img[i].ondragstart = function () {
        return false;
    };
}


