let popup = document.getElementById('popup');
let p = 1;

function p1() {
    if (p % 2 == 0)
        open1();
    else
        close1();
    p = p + 1;
}

function open1() {
    popup.classList.add("open-popup");
}

function close1() {
    popup.classList.remove("open-popup");
}