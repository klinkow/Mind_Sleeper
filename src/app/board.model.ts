import { Cell } from './cell.model';

export class Board {
  // public cells : Cell[];
  public accurateFlags : number;
  constructor(public size: string, public player: string, public cells: Cell[] = []) {
    if (this.size === "small") {
      for (var i=0; i<9; i ++) {
        for(var j=0; j<9; j ++) {
          let newCell = new Cell(i,j)
          this.cells.push(newCell)
        }
      }
      for (var b=0; b<10; b++) {
        if (this.cells[Math.floor(Math.random()*81)].isBomb === false) {
        this.cells[Math.floor(Math.random()*81)].isBomb = true;
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
    }
  }
}
