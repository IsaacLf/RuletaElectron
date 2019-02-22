const { BrowserWindow } = require('electron').remote;
import { Titlebar, Color } from "custom-electron-titlebar";
import path = require('path');
import url = require('url');

let titlebar = new Titlebar({
  backgroundColor: Color.fromHex('#555555'),
  shadow: true,
  maximizable: false
});

const maximVal = <HTMLInputElement>document.getElementById('maximVal');
const delayInput = <HTMLInputElement>document.getElementById('delayVal');
const delayText = <HTMLSpanElement>document.getElementById('delay');
const startButton = <HTMLButtonElement>document.getElementById('startButton');

delayText.innerHTML = `Nada (${delayInput.value}s) `;
delayInput.addEventListener('input', function(event) {
  let text: string;
  switch(this.value){
    case '1': text = `Nada (${this.value}s) `;  break;
    case '2': text = `Normal (${this.value}s) `;  break;
    case '3': text = `Mucho (${this.value}s) `; break;
    case '4': text = `Muchísimo (${this.value}s) `; break;
    case '5': text = `¿No se van a dormir? (${this.value}s) `; break;
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

  let rouletteView = new BrowserWindow({
    width: 400,
    height: 320,
    frame: false,
    resizable: false
  });

  rouletteView.on('closed', () => {
    button.disabled = false;
    rouletteView = null;
  });

  rouletteView.loadURL(viewPath);
  rouletteView.show();
  rouletteView.webContents.on('did-finish-load', () => {
    rouletteView.webContents.send('studends', maximVal.value, delayInput.value);
  });

});
// let roulette: Roulette | null = new Roulette(10);
// roulette.shuffleStudents();
// console.log(roulette);