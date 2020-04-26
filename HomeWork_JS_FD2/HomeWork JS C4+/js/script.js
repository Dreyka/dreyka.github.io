"use strict";

let styleControl = {
    "position": "absolute",
    "width": [20, "px"],
    "height": [20, "px"],
    "border-radius": [50, "%"],
    "background-color": "green",
};

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
};

window.addEventListener("DOMContentLoaded", findElem, false);

// Функция для перетаскивания элементов(картинок)
function elemStart(EO) {
    EO = EO || window.event;
    // EO.stopPropagation();
    let picture = this;
    this.parentNode.appendChild(this);
    let posX = EO.clientX - this.offsetLeft;
    let posY = EO.clientY - this.offsetTop;
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
        this.removeEventListener("mouseup", elemEnd, false);
    }

    document.addEventListener("mousemove", elemMove, false);
    this.addEventListener("mouseup", elemEnd, false);
};

// Функция для изменения размера картинки
function elemStartControl(EO) {
    EO = EO || window.event;
    EO.stopPropagation();
    let control = EO.target;
    let parent = control.parentNode;
    let parentPos = parent.getBoundingClientRect();
    const posDeltaX = EO.clientX - parentPos.x;
    const posDeltaY = EO.clientY - parentPos.y;
    const posDeltaRight = EO.clientX - parentPos.x - parentPos.width;
    const posDeltaBottom = EO.clientY - parentPos.y - parentPos.height;
    let ratioWH = parentPos.width / parentPos.height;
    let controlNumber = Number(control.getAttribute("data-control"));

    function elemMoveControl(EO) {
        EO = EO || window.event;
        let parentPosMove = parent.getBoundingClientRect();
        let parentPosMoveX = parentPosMove.left;
        let parentPosMoveY = parentPosMove.top;
        let parentPosMoveHeight = parentPosMove.height;
        let parentPosMoveWidth = parentPosMove.width;
        if (controlNumber === 0) {
            if (parentPosMoveHeight > 0 && parentPosMoveWidth > 0) {
                parent.style.width = (parentPosMoveWidth - (EO.clientX - parentPosMoveX) + posDeltaX) + "px";
                parent.style.left = (parent.offsetLeft + (EO.clientX - parentPosMoveX) - posDeltaX) + "px";
                parent.style.top = (parent.offsetTop + parent.offsetHeight - (parent.offsetWidth / ratioWH)) + "px";
                parent.style.height = (parent.offsetWidth / ratioWH) + "px";
            }
            ;
        }
        ;
        if (controlNumber === 1) {
            if (parentPosMove.height > 0) {
                parent.style.height = (parentPosMove.height - (EO.clientY - parentPosMoveY) + posDeltaY) + "px";
                parent.style.top = (parent.offsetTop + (EO.clientY - parentPosMoveY) - posDeltaY) + "px";
            }
            ;
        }
        ;
        if (controlNumber === 2) {
            if (parentPosMoveHeight > 0 && parentPosMoveWidth > 0) {
                parent.style.width = ((EO.clientX - parentPosMoveX) - posDeltaRight) + "px";
                parent.style.top = (parent.offsetTop + parent.offsetHeight - (parent.offsetWidth / ratioWH)) + "px";
                parent.style.height = (parent.offsetWidth / ratioWH) + "px";
            }
            ;
        }
        ;
        if (controlNumber === 3) {
            parent.style.width = ((EO.clientX - parentPosMoveX) - posDeltaRight) + "px";
        }
        ;
        if (controlNumber === 4) {
            if (parentPosMoveHeight > 0 && parentPosMoveWidth > 0) {
                parent.style.width = ((EO.clientX - parentPosMoveX) - posDeltaRight) + "px";
                parent.style.height = (parent.offsetWidth / ratioWH) + "px";
            }
            ;
        }
        ;
        if (controlNumber === 5) {
            parent.style.height = ((EO.clientY - parentPosMoveY) - posDeltaBottom) + "px";
        }
        ;
        if (controlNumber === 6) {
            if (parentPosMoveHeight > 0 && parentPosMoveWidth > 0) {
                parent.style.width = (parentPosMoveWidth - (EO.clientX - parentPosMoveX) + posDeltaX) + "px";
                parent.style.left = (parent.offsetLeft + (EO.clientX - parentPosMoveX) - posDeltaX) + "px";
                parent.style.height = (parent.offsetWidth / ratioWH) + "px";
            }
            ;
        }
        ;
        if (controlNumber === 7) {
            if (parent.offsetWidth > 0) {
                parent.style.width = (parent.offsetWidth - (EO.clientX - parentPosMoveX) + posDeltaX) + "px";
                parent.style.left = (parent.offsetLeft + (EO.clientX - parentPosMoveX) - posDeltaX) + "px";
            }
            ;
        }
        ;
        controlPosition(parent);
    };

    function elemEnd(EO) {
        EO = EO || window.event;
        document.removeEventListener("mousemove", elemMoveControl, false);
        document.removeEventListener("mouseup", elemEnd, false);
        parent.removeEventListener("mouseup", elemEnd, false);
    }

    document.addEventListener("mousemove", elemMoveControl, false);
    document.addEventListener("mouseup", elemEnd, false);
    parent.addEventListener("mouseup", elemEnd, false);
};

// Функция для создания управляющих элементов.
// После создания прописываем к каждому элементу обработчик события mousedown.
function control(EO) {
    EO = EO || window.event;
    let controlElemNum = 8;

    //Функция для создания строки со стилями (стили прописаны в хэше)
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

    let delPar = document.querySelector("div[data-controlPAr=\"true\"]");
    if (delPar !== null && this.getAttribute("data-controlPAr") !== "true") {
        // console.log("!!!");
        delPar.setAttribute("data-controlPAr", "false")
        let delAttr = document.querySelectorAll("div[data-control]");
        for (let i = 0; i < delAttr.length; i++) {
            delPar.removeChild(delAttr[i]);
        }
        ;
    }
    ;
    this.setAttribute("data-controlPAr", "true");
    let linkControl = [];
    if (this.querySelectorAll("div[data-control]").length === 0) {
        for (let i = 0; i < controlElemNum; i++) {
            linkControl[i] = document.createElement("div");
            linkControl[i].style.cssText = constructorStyle(styleControl);
            linkControl[i].setAttribute("data-control", i);
            this.appendChild(linkControl[i]);
            linkControl[i].addEventListener("mousedown", elemStartControl, false);
        }
        ;
    }
    ;
    controlPosition(this);
};

// Функция для установки положения управляющих элементов.
function controlPosition(parentLink) {
    let linkControl = parentLink.querySelectorAll("div[data-control]");
    linkControl[0].style.left = (0 - styleControl.width[0] / 2) + "px";
    linkControl[0].style.top = (0 - styleControl.height[0] / 2) + "px";
    linkControl[1].style.left = (parentLink.offsetWidth / 2 - styleControl.width[0] / 2) + "px";
    linkControl[1].style.top = (0 - styleControl.height[0] / 2) + "px";
    linkControl[2].style.left = (parentLink.offsetWidth - styleControl.width[0] / 2) + "px";
    linkControl[2].style.top = (0 - styleControl.height[0] / 2) + "px";
    linkControl[3].style.left = (parentLink.offsetWidth - styleControl.width[0] / 2) + "px";
    linkControl[3].style.top = (parentLink.offsetHeight / 2 - styleControl.height[0] / 2) + "px";
    linkControl[4].style.left = (parentLink.offsetWidth - styleControl.width[0] / 2) + "px";
    linkControl[4].style.top = (parentLink.offsetHeight - styleControl.height[0] / 2) + "px";
    linkControl[5].style.left = (parentLink.offsetWidth / 2 - styleControl.width[0] / 2) + "px";
    linkControl[5].style.top = (parentLink.offsetHeight - styleControl.height[0] / 2) + "px";
    linkControl[6].style.left = (0 - styleControl.width[0] / 2) + "px";
    linkControl[6].style.top = (parentLink.offsetHeight - styleControl.height[0] / 2) + "px";
    linkControl[7].style.left = (0 - styleControl.width[0] / 2) + "px";
    linkControl[7].style.top = (parentLink.offsetHeight / 2 - styleControl.height[0] / 2) + "px";
};

let area = document.getElementById("Area");
let img = area.querySelectorAll("div[class^='img']");

for (let i = 0; i < img.length; i++) {
    img[i].addEventListener("mousedown", elemStart, false);
    img[i].addEventListener("mouseup", control, false);
    img[i].ondragstart = function () {
        return false;
    };
}


