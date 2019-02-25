import { Roulette, RouletteResponse } from "./roulette";
const ipc = require('electron').ipcRenderer;

const len = <HTMLParagraphElement>document.getElementById('length');
const closeWin = <HTMLLinkElement>document.getElementById('closeWin');
let roulette: Roulette;
let interval: NodeJS.Timer;

ipc.on('start-roulette', (event: any, max:number, delay: string) => {
  let response: RouletteResponse = { winner: false, listNumber: 0 };
  const timeOut = parseInt(delay) * 1000;
  const waitTimeout = Math.floor(timeOut / 8 * 6);

  roulette = new Roulette(max);
  roulette.shuffleStudents();

  // len.innerHTML = message(0, false);
  response = roulette.getStudent();
  len.innerHTML = waitMessage(response.listNumber);
  setTimeout(function(){
    len.innerHTML = message(response.listNumber, response.winner);
  }, waitTimeout);

  if(!response.winner){
    interval = setInterval(function(){
      response = roulette.getStudent();
      len.innerHTML = waitMessage(response.listNumber);
      setTimeout(function(){
        len.innerHTML = message(response.listNumber, response.winner);
      }, waitTimeout);
      if(response.winner){
        clearInterval(interval);
      }
    }, timeOut);
  }

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
  if(pass) closeWin.focus();
  return template;
}

function waitMessage(numlist: number){
  let template = 
  `<span id="numList">
    ${numlist}
  </span>
  <br>
  <object type="image/svg+xml" data="../resources/svg/pacman-loading.svg" style="width: 45px; height: 45px;">
    :c
  </object>`;
  return template;
}
// console.log(roulette);
