import { MenuItemConstructorOptions, ipcRenderer, app } from "electron";
const { BrowserWindow, Menu, MenuItem } = require('electron').remote;
import { Titlebar, Color } from "custom-electron-titlebar";
import path = require('path');
import url = require('url');

let template: MenuItemConstructorOptions[] = [
  {
    label: 'Archivo',
    submenu: [
      {
        label: "Abrir DevTools",
        click: () => { ipcRenderer.send('open-devTools') }
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
        click: () => { ipcRenderer.send('open-about-dialog'); }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);

let titlebar = new Titlebar({
  backgroundColor: Color.fromHex('#555555'),
  shadow: true,
  maximizable: false,
  menu: menu
});

const maximVal = <HTMLInputElement>document.getElementById('maximVal');
const delayInput = <HTMLInputElement>document.getElementById('delayVal');
const delayText = <HTMLSpanElement>document.getElementById('delay');
const startButton = <HTMLButtonElement>document.getElementById('startButton');

maximVal.focus();

delayInput.addEventListener('input', function(event) {
  let text: string;
  switch(this.value){
    case '1': text = `Nada (${this.value}s) `;  break;
    case '3': text = `Normal (${this.value}s) `;  break;
    case '5': text = `Mucho (${this.value}s) `; break;
    case '7': text = `Muchísimo (${this.value}s) `; break;
    case '9': text = `¿No se van a dormir? (${this.value}s) `; break;
    default: text = '¿Y esto qué?';
  }
  delayText.innerHTML = text;
});

startButton.addEventListener('click', function(event) {
  let button = this;
  button.disabled = true;

  const viewPath = url.format({
    pathname: path.join(__dirname, '../src/roulette/views/roulette.html'),
    protocol: 'file',
    slashes: true
  });

  let rouletteWin = new BrowserWindow({
    width: 400,
    height: 320,
    frame: false,
    resizable: false
  });

  rouletteWin.on('closed', () => {
    button.disabled = false;
    rouletteWin = null;
  });

  const maxVal: number = parseInt(maximVal.value);
  rouletteWin.loadURL(viewPath);
  rouletteWin.show();
  rouletteWin.webContents.on('did-finish-load', () => {
    rouletteWin.webContents.send(
      'start-roulette', 
      maxVal >= 0 ? maxVal : maxVal * -1,
      delayInput.value
    );
  });

});

/**
 * 
 * @todo We'll use this method later when we are going set updates to this app
 */
function addUpdateMenuItems (items: any[], position:number) {
  if (process.mas) return

  const version = app.getVersion()
  let updateItems: any[] = [
    {
      label: `Versión ${version}`,
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
      click: () => {
        require('electron').autoUpdater.checkForUpdates()
      }
    }, 
    {
      label: 'Restart and Install Update',
      enabled: true,
      visible: false,
      key: 'restartToUpdate',
      click: () => {
        require('electron').autoUpdater.quitAndInstall()
      }
    }
  ]

  items.splice.apply(items, [position, 0].concat(updateItems))
}
