import { Roulette, RouletteResponse } from "./roulette";
import { Titlebar, Color } from "custom-electron-titlebar";
const ipc = require('electron').ipcRenderer;

const len = <HTMLParagraphElement>document.getElementById('length');
let roulette: Roulette;
let interval: NodeJS.Timer;

ipc.on('studends', (event: any, value:string, delay: string) => {
  let response: RouletteResponse = { winner: false, listNumber: 0 };
  const timeOut = parseInt(delay) * 1000;

  roulette = new Roulette(parseInt(value));
  roulette.shuffleStudents();

  len.innerHTML = message(0, false);
  interval = setInterval(function(){
    response = roulette.getStudent();
    len.innerHTML = message(response.listNumber, response.winner);
    if(response.winner){
      clearInterval(interval);
    }
  }, timeOut);
})

function message(numlist: number, pass: boolean){
  let template = 
  `<span id="numList">
    ${numlist}
  </span>
  <br>
  <span id="message">
    ${ pass ? 'Tú pasas!': 'Salvado!!!'}
  </span>`;
  return template;
}
// console.log(roulette);
