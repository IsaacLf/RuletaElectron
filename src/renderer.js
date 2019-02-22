"use strict";
exports.__esModule = true;
var BrowserWindow = require('electron').remote.BrowserWindow;
var custom_electron_titlebar_1 = require("custom-electron-titlebar");
var path = require("path");
var url = require("url");
var titlebar = new custom_electron_titlebar_1.Titlebar({
    backgroundColor: custom_electron_titlebar_1.Color.fromHex('#555555'),
    shadow: true,
    maximizable: false
});
var delayInput = document.getElementById('delayVal');
var delayText = document.getElementById('delay');
var startButton = document.getElementById('startButton');
var maximVal = document.getElementById('maximVal');
delayText.innerHTML = "Nada (" + delayInput.value + "s) ";
delayInput.addEventListener('input', function (event) {
    var text;
    switch (this.value) {
        case '1':
            text = "Nada (" + this.value + "s) ";
            break;
        case '2':
            text = "Normal (" + this.value + "s) ";
            break;
        case '3':
            text = "Mucho (" + this.value + "s) ";
            break;
        case '4':
            text = "Much\u00EDsimo (" + this.value + "s) ";
            break;
        case '5':
            text = "\u00BFNo se van a dormir? (" + this.value + "s) ";
            break;
        default: text = '¿Y esto qué?';
    }
    delayText.innerHTML = text;
});
startButton.addEventListener('click', function (event) {
    var button = this;
    button.disabled = true;
    var viewPath = url.format({
        pathname: path.join(__dirname, '../src/roulette/views/roulette.html'),
        protocol: 'file',
        slashes: true
    });
    var rouletteView = new BrowserWindow({
        width: 400,
        height: 320,
        frame: false,
        resizable: false
    });
    rouletteView.on('closed', function () {
        button.disabled = false;
        rouletteView = null;
    });
    rouletteView.loadURL(viewPath);
    rouletteView.show();
    rouletteView.webContents.on('did-finish-load', function () {
        rouletteView.webContents.send('studends', maximVal.value, delayInput.value);
    });
});
// let roulette: Roulette | null = new Roulette(10);
// roulette.shuffleStudents();
// console.log(roulette);
//# sourceMappingURL=renderer.js.map