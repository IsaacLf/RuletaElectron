"use strict";
var Roulette;
(function (Roulette_1) {
    /**
     * Retorna un número aleatorio entre min (incluido) y max (excluido)
     * @param min
     * @param max
     */
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    var Roulette = /** @class */ (function () {
        function Roulette(max) {
            var __max = 10;
            if (typeof max === "number") {
                __max = max;
            }
            this.maxValue = __max;
            this.students = this.createStudents(__max);
            this.setEndGame(__max);
        }
        Roulette.prototype.createStudents = function (studentsNum) {
            var students = [];
            for (var i = 1; i <= studentsNum; i++) {
                students.push({ listNumber: i });
            }
            return students;
        };
        Roulette.prototype.shuffleStudents = function () {
            this.students.sort(function () { return 0.5 - Math.random(); });
        };
        Roulette.prototype.setEndGame = function (max) {
            this.endGame = getRandomArbitrary(1, max + 1);
        };
        Roulette.prototype.getStudent = function () {
            var response;
            var listNum = this.students.pop().listNumber;
            response = {
                winner: this.students.length <= this.endGame,
                listNumber: listNum
            };
            return response;
        };
        return Roulette;
    }());
    Roulette_1.Roulette = Roulette;
})(Roulette || (Roulette = {}));
module.exports = Roulette;
//# sourceMappingURL=roulette.js.map