"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    electron_1.app.quit();
}
require('update-electron-app')();
// get the singleLock request to avoid create more than 1 instance of the app
var gotSingleLock = electron_1.app.requestSingleInstanceLock();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
var createWindow = function () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 600,
        height: 380,
        frame: false,
        resizable: false
    });
    // and load the index.html of the app.
    // mainWindow.loadURL(`file://${__dirname}/index.html`);
    var viewPath = url.format({
        pathname: path.join(__dirname, '../src/index.html'),
        protocol: 'file',
        slashes: true
    });
    mainWindow.loadURL(viewPath);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.    
        mainWindow = null;
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
if (gotSingleLock) {
    electron_1.app.on('second-instance', function () {
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
electron_1.ipcMain.on('open-about-dialog', function (event) {
    var options = {
        type: 'info',
        title: 'Acerca de',
        message: 'Ruleta Electrón',
        buttons: ["Aceptar"],
        detail: [
            "Version: " + electron_1.app.getVersion(),
            'Creado por: Victor Isaac Lopez Fernandez',
            'Publicador: dudenology, 2018-2019'
        ].join('\n')
    };
    electron_1.dialog.showMessageBox(mainWindow, options);
});
electron_1.ipcMain.on('open-devTools', function (event) {
    mainWindow.webContents.openDevTools();
});
//# sourceMappingURL=index.js.map