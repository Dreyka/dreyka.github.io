$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        // autoplay: true,
        animateOut: "fadeOut",
        autoplayTimeout: 3000,
    });

    arrowTop.onclick = function () {
        window.scrollTo(pageXOffset, 0);
    };

    window.addEventListener('scroll', function () {
        arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
        if ((pageYOffset > 138)&&(document.documentElement.clientWidth > 767)) {
            menuSearch.classList.add("menuSearchFixed");
        }
        else {
            menuSearch.classList.remove("menuSearchFixed");
        }
    });

// Выполнено мобильное меню при помощи удаления добавления классов

    let  mOp = "menuMobOpen", mCl = "menuMobClose";
    menuMobile.onclick = function () {
        menuMobileBody.classList.toggle(mCl);
        menuMobileBody.classList.toggle(mOp);
        menuMobile.classList.toggle("open");
    };
    subMenuMobile1.onclick = function () {
        subMenuMobileBody1.classList.toggle(mCl);
        subMenuMobileBody1.classList.toggle(mOp);
    };
    subMenuMobile2.onclick = function () {
        subMenuMobileBody2.classList.toggle(mCl);
        subMenuMobileBody2.classList.toggle(mOp);
    };

    let  wOp = "widgetOpened", wCl = "widgetClosed";
    callMan.onclick = function () {
        callMan.classList.toggle(wCl);
        callMan.classList.toggle(wOp);
        callManBody.classList.toggle(wCl);
        callManBody.classList.toggle(wOp);
    };
    callManBodyClose.onclick = function () {
        callManBody.classList.toggle(wCl);
        callManBody.classList.toggle(wOp);
        callMan.classList.toggle(wCl);
        callMan.classList.toggle(wOp);

    };
    callManSub.onclick = function () {
        callManSubBody.classList.toggle(wCl);
        callManSubBody.classList.toggle(wOp);
        callManSub.classList.toggle("icon-angle-down");
        callManSub.classList.toggle("icon-angle-up");

    };
});