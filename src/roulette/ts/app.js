"use strict";
exports.__esModule = true;
var roulette_1 = require("./roulette");
var ipc = require('electron').ipcRenderer;
var len = document.getElementById('length');
var closeWin = document.getElementById('closeWin');
var roulette;
var interval;
ipc.on('start-roulette', function (event, max, delay) {
    var response = { winner: false, listNumber: 0 };
    var timeOut = parseInt(delay) * 1000;
    var waitTimeout = Math.floor(timeOut / 8 * 6);
    roulette = new roulette_1.Roulette(max);
    roulette.shuffleStudents();
    // len.innerHTML = message(0, false);
    response = roulette.getStudent();
    len.innerHTML = waitMessage(response.listNumber);
    setTimeout(function () {
        len.innerHTML = message(response.listNumber, response.winner);
    }, waitTimeout);
    if (!response.winner) {
        interval = setInterval(function () {
            response = roulette.getStudent();
            len.innerHTML = waitMessage(response.listNumber);
            setTimeout(function () {
                len.innerHTML = message(response.listNumber, response.winner);
            }, waitTimeout);
            if (response.winner) {
                clearInterval(interval);
            }
        }, timeOut);
    }
});
function message(numlist, pass) {
    var template = "<span id=\"numList\">\n    " + numlist + "\n  </span>\n  <br>\n  <span id=\"message\">\n    " + (pass ? 'Tú pasas!' : 'Salvado!!!') + "\n  </span>";
    if (pass)
        closeWin.focus();
    return template;
}
function waitMessage(numlist) {
    var template = "<span id=\"numList\">\n    " + numlist + "\n  </span>\n  <br>\n  <object type=\"image/svg+xml\" data=\"../resources/svg/pacman-loading.svg\" style=\"width: 45px; height: 45px;\">\n    :c\n  </object>";
    return template;
}
// console.log(roulette);
//# sourceMappingURL=app.js.map