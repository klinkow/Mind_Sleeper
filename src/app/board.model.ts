import { Cell } from './cell.model';

export class Board {
  public cells: Cell[]=[];
  public bombCount: number;
  public remainingFlags: number;
  public clickCount: number = 0;
  public seconds: number = 0;
  public timer = setInterval(() => {this.seconds ++;}, 1000);
  public youWon: boolean = false;
  public youLost: boolean = false;
  public x: number;
  public y: number;
  public width: number;

  constructor(public size: string, public player: string) {}

  populateBoard() {
    if (this.size === "1") {
      this.x = 9;
      this.y = 9;
      this.bombCount = 10;
    } else if (this.size === "2") {
      this.x = 16;
      this.y = 16;
      this.bombCount = 40;
    } else if (this.size === "3") {
      this.x = 30;
      this.y = 16;
      this.bombCount = 99;
    } else {
      this.x = 30;
      this.y = 20;
      this.bombCount = 200;
    }

    this.width = this.x * 50;
    this.remainingFlags = this.bombCount;

    for (var i=0; i<this.y; i ++) {
      for(var j=0; j<this.x; j ++) {
        let newCell = new Cell(i,j);
        this.cells.push(newCell);
      };
    };

    for (var b=0; b<this.bombCount; b++) {
      var randomCell: Cell = this.cells[Math.floor(Math.random()*this.x*this.y)];
      if (randomCell.isBomb === false) {
        randomCell.isBomb = true;
      } else {
        b --;
      }
    }

    this.cells.forEach((cell) => {
      var contiguousCells: Cell[];
      if (cell.isBomb === false) {
        cell.contiguousBombs = this.cells.filter((testCell) => {
          return (testCell.x >= cell.x - 1 && testCell.x <= cell.x + 1 && testCell.y >= cell.y - 1 && testCell.y <= cell.y + 1 && testCell.isBomb);
        }).length;
      }
    });
  }
}
