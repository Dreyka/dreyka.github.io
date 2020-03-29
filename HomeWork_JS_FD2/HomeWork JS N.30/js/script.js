"use strict";

function findElem(EO) {
    EO = EO || window.event;
    let area = document.getElementById("Area");
    let img = area.getElementsByTagName("img");
    for (let i = 0; i < img.length; i++) {
        img[i].style.left = img[i].offsetLeft + "px";
        img[i].style.top = img[i].offsetTop + "px";
    }
    for (let i = 0; i < img.length; i++) {
        img[i].style.position = "absolute";
    }
}

function elemStart(EO) {
    EO = EO || window.event;
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
        this.style.left = (EO.clientX - posX) + "px";
        this.style.top = (EO.clientY - posY) + "px";
        this.style.zIndex = "3";
    };

    function elemEnd(EO) {
        EO = EO || window.event;
        this.removeEventListener("mousemove", elemMove, false);
        this.style.cursor = "auto";
    }

    this.addEventListener("mousemove", elemMove, false);
    this.addEventListener("mouseup", elemEnd, false);
}

let area = document.getElementById("Area");
let img = area.getElementsByTagName("img");

window.addEventListener("DOMContentLoaded", findElem, false);
for (let i = 0; i < img.length; i++) {
    img[i].addEventListener("mousedown", elemStart, false);
    img[i].ondragstart = function () {
        return false;
    };
}


