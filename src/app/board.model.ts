import { Cell } from './cell.model';

export class Board {
  constructor(public size: string, public player: string, public cells: Cell[]) {}

  populateBoard() {
    var boardX: number;
    var boardY: number;
    var bombCount: number;

    if (this.size === "1") {
      boardX = 9;
      boardY = 9;
      bombCount = 10;
    } else if (this.size === "2") {
      boardX = 16;
      boardY = 16;
      bombCount = 40;
    } else if (this.size === "3") {
      boardX = 16;
      boardY = 30;
      bombCount = 99;
    } else {
      boardX = 16;
      boardY = 30;
      bombCount = 200;
    }


    for (var i=0; i<boardY; i ++) {
      for(var j=0; j<boardX; j ++) {
        let newCell = new Cell(i,j);
        this.cells.push(newCell);
      };
    };

    for (var b=0; b<bombCount; b++) {
      var randomCell: Cell = this.cells[Math.floor(Math.random()*boardX*boardY)];
      if (randomCell.isBomb === false) {
        randomCell.isBomb = true;
      } else {
        b --;
      }
    }

    this.cells.forEach((cell)=>{
      var contiguousCells: Cell[];
      if (cell.isBomb === false) {
        var bombCounter: number = 0;
        contiguousCells = this.cells.filter(function(testCell) {
          return (testCell.x >= cell.x - 1 && testCell.x <= cell.x + 1 && testCell.y >= cell.y - 1 && testCell.y <= cell.y + 1);
        });
        contiguousCells.forEach((contiguousCell) => {
          if (contiguousCell.isBomb === true) {
            bombCounter ++;
          }
        });
        cell.contiguousBombs = bombCounter;
      }
    });

    return boardX;
  }
}
