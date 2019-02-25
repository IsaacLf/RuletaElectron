namespace Roulette {

  interface Student {
    listNumber: number;
  }

  export interface RouletteResponse extends Student {
    winner: boolean,    
  }

  /**
   * Retorna un número aleatorio entre min (incluido) y max (excluido)
   * @param min 
   * @param max 
   */
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
  export class Roulette {
    maxValue: number;
    students: Student[];
    endGame: number;

    constructor(max?: number){
      let __max = 10;
      if(typeof max === "number"){
        __max = max;
      }
      this.maxValue = __max;
      this.students = this.createStudents(__max);
      this.setEndGame(__max);
    }

    createStudents(studentsNum: number): Student[] {
      let students: Student[] = [];
      for (let i = 1; i <= studentsNum; i++) {
        students.push({ listNumber: i });
      }
      return students;
    }

    shuffleStudents(): void {
      this.students.sort(() => { return 0.5 - Math.random() });
    }

    setEndGame(max: number){
      this.endGame = getRandomArbitrary(1, max+1);
    }

    getStudent(): RouletteResponse {
      let response: RouletteResponse;
      const listNum = this.students.pop().listNumber;
      response = { 
        winner: this.students.length <= this.endGame,
        listNumber: listNum
      };
      return response;
    }
  }
}

export = Roulette;
