"use strict";
exports.__esModule = true;
var roulette_1 = require("./roulette");
var ipc = require('electron').ipcRenderer;
var len = document.getElementById('length');
var roulette;
var interval;
ipc.on('studends', function (event, value, delay) {
    var response = { winner: false, listNumber: 0 };
    var timeOut = parseInt(delay) * 1000;
    roulette = new roulette_1.Roulette(parseInt(value));
    roulette.shuffleStudents();
    len.innerHTML = message(0, false);
    interval = setInterval(function () {
        response = roulette.getStudent();
        len.innerHTML = message(response.listNumber, response.winner);
        if (response.winner) {
            clearInterval(interval);
        }
    }, timeOut);
});
function message(numlist, pass) {
    var template = "<span id=\"numList\">\n    " + numlist + "\n  </span>\n  <br>\n  <span id=\"message\">\n    " + (pass ? 'Tú pasas!' : 'Salvado!!!') + "\n  </span>";
    return template;
}
// console.log(roulette);
//# sourceMappingURL=app.js.map