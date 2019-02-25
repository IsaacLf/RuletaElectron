"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var _a = require('electron').remote, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu, MenuItem = _a.MenuItem;
var custom_electron_titlebar_1 = require("custom-electron-titlebar");
var path = require("path");
var url = require("url");
var template = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: "Abrir DevTools",
                click: function () { electron_1.ipcRenderer.send('open-devTools'); }
            },
            {
                type: 'separator'
            },
            {
                label: 'Cerrar',
                role: 'quit'
            }
        ]
    },
    {
        label: 'Acerca de',
        submenu: [
            {
                label: 'Versión de la aplicación',
                click: function () { electron_1.ipcRenderer.send('open-about-dialog'); }
            }
        ]
    }
];
var menu = Menu.buildFromTemplate(template);
var titlebar = new custom_electron_titlebar_1.Titlebar({
    backgroundColor: custom_electron_titlebar_1.Color.fromHex('#555555'),
    shadow: true,
    maximizable: false,
    menu: menu
});
var maximVal = document.getElementById('maximVal');
var delayInput = document.getElementById('delayVal');
var delayText = document.getElementById('delay');
var startButton = document.getElementById('startButton');
maximVal.focus();
delayInput.addEventListener('input', function (event) {
    var text;
    switch (this.value) {
        case '1':
            text = "Nada (" + this.value + "s) ";
            break;
        case '3':
            text = "Normal (" + this.value + "s) ";
            break;
        case '5':
            text = "Mucho (" + this.value + "s) ";
            break;
        case '7':
            text = "Much\u00EDsimo (" + this.value + "s) ";
            break;
        case '9':
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
    var rouletteWin = new BrowserWindow({
        width: 400,
        height: 320,
        frame: false,
        resizable: false
    });
    rouletteWin.on('closed', function () {
        button.disabled = false;
        rouletteWin = null;
    });
    var maxVal = parseInt(maximVal.value);
    rouletteWin.loadURL(viewPath);
    rouletteWin.show();
    rouletteWin.webContents.on('did-finish-load', function () {
        rouletteWin.webContents.send('start-roulette', maxVal >= 0 ? maxVal : maxVal * -1, delayInput.value);
    });
});
/**
 *
 * @todo We'll use this method later when we are going set updates to this app
 */
function addUpdateMenuItems(items, position) {
    if (process.mas)
        return;
    var version = electron_1.app.getVersion();
    var updateItems = [
        {
            label: "Versi\u00F3n " + version,
            enabled: false
        },
        {
            label: 'Checking for Update',
            enabled: false,
            key: 'checkingForUpdate'
        },
        {
            label: 'Check for Update',
            visible: false,
            key: 'checkForUpdate',
            click: function () {
                require('electron').autoUpdater.checkForUpdates();
            }
        },
        {
            label: 'Restart and Install Update',
            enabled: true,
            visible: false,
            key: 'restartToUpdate',
            click: function () {
                require('electron').autoUpdater.quitAndInstall();
            }
        }
    ];
    items.splice.apply(items, [position, 0].concat(updateItems));
}
//# sourceMappingURL=renderer.js.map