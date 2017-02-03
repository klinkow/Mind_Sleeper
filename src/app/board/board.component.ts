import { Component, Input } from '@angular/core';
import { Board } from '.././board.model';
import { Cell } from '.././cell.model';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  @Input() board: Board;

  constructor() {
    console.log(this.board)
  }

  handleClick(cell, event) {
    if (this.board.youWon === false && this.board.youLost === false) {
      switch(event.which) {
        case 1:
          this.reveal(cell);
          this.board.clickCount ++;
          break;
        case 3:
          if (cell.isFlagged === false && this.board.remainingFlags > 0) {
              cell.isFlagged = true;
              this.board.remainingFlags --;
              this.winCheck();
          } else if (cell.isFlagged === true) {
              cell.isFlagged = false;
              this.board.remainingFlags ++;
          }
          this.board.clickCount ++;
          break;
      }
    }
  }

  gameOver() {
    clearInterval(this.board.timer);
    this.board.cells.forEach((cell) => {
      if (cell.isBomb) {
        cell.isRevealed = true;
      }
    })
  }

  winCheck() {
    var flaggedBombs : number = 0;
    this.board.cells.forEach((cell) => {
      if (cell.isBomb && cell.isFlagged) {
        flaggedBombs ++; };
      });
    if (flaggedBombs === this.board.bombCount) {
      this.gameOver();
      this.board.youWon = true;
    };
  }


  reveal(clickedCell) {
    if (clickedCell.isBomb) {
      this.gameOver();
      this.board.youLost = true;
    } else if (clickedCell.contiguousBombs > 0) {
      clickedCell.isRevealed = true;
    } else {
      clickedCell.isRevealed = true;
      var contiguousCells: Cell[] = this.board.cells.filter((testCell) => {
        return (testCell.x >= clickedCell.x - 1 && testCell.x <= clickedCell.x + 1 && testCell.y >= clickedCell.y - 1 && testCell.y <= clickedCell.y + 1);
      });
      this.revealAll(contiguousCells);
    }
  }

  revealAll(contiguousCells) {
    contiguousCells.forEach((contiguousCell) => {
      if (contiguousCell.isRevealed === false) {
        this.reveal(contiguousCell);
      }
    });
  }

  determineColor(cell) {
    if (cell.isRevealed && cell.contiguousBombs === 0) {
      return "rgba(0,0,255,.8)";
    } else if (cell.isRevealed && cell.contiguousBombs === 1) {
      return "rgb(50,0,225)";
    } else if (cell.isRevealed && cell.contiguousBombs === 2) {
      return "rgb(100, 0, 200)";
    } else if (cell.isRevealed && cell.contiguousBombs === 3) {
      return "rgb(150, 0, 150)";
    } else if (cell.isRevealed && cell.contiguousBombs === 4) {
      return "rgb(200, 0, 100)";
    } else if (cell.isRevealed && cell.contiguousBombs === 5) {
      return "rgb(250, 0, 50)";
    } else if (cell.isRevealed && cell.contiguousBombs === 6) {
      return "rgb(255, 10, 25)";
    } else if (cell.isRevealed && cell.contiguousBombs === 7) {
      return "rgb(255, 0, 10)";
    } else if (cell.isRevealed && cell.contiguousBombs === 8) {
      return "rgb(255, 0, 0)";
    } else if (cell.isRevealed && cell.isBomb && cell.isFlagged) {
      return "green";
    } else if (cell.isRevealed && cell.isBomb) {
      return "red"
    } else if (cell.isFlagged) {
      return "yellow";
    } else {
      return "lightgrey";
    }
  }
}
