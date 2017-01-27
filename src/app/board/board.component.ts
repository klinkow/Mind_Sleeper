import { Component, OnInit, Input } from '@angular/core';
import { Board } from '.././board.model';
import { Cell } from '.././cell.model';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() boardWidth: number;

  constructor() { }

  ngOnInit() {
    console.log(this.board, this.boardWidth)
  }

  handleClick(cell, event) {
    switch(event.which) {
      case 1:
        this.revealSquare(cell);
        break;
      case 3:
        if (cell.isFlagged === false) {
          cell.isFlagged = true;
          this.winCheck();
        } else if (cell.isFlagged === true) {
          cell.isFlagged = false;
        }
      break;
    }
  }

  gameOver() {
    this.board.cells.forEach((cell) => {
      if (cell.isBomb) {
        cell.isRevealed = true;
      }
    })
  }

  winCheck () {
    var flagCounter : number = 0;
    var flaggedBombs : number = 0;
    this.board.cells.forEach((cell) => {
      if (cell.isFlagged) {
        flagCounter ++; };
      if (cell.isBomb && cell.isFlagged) {
        flaggedBombs ++; };
      });
    if (flaggedBombs === this.board.bombCount && flagCounter === this.board.bombCount ) {
      alert("you win!");
      this.gameOver();
    };
  }


  revealSquare(clickedCell) {
    if (clickedCell.isBomb) {
      clickedCell.isRevealed = true;
      this.gameOver();
    } else if (clickedCell.contiguousBombs > 0) {
      clickedCell.isRevealed = true;
    } else {
      clickedCell.isRevealed = true;
      var contiguousCells: Cell[];
      contiguousCells = this.board.cells.filter(function(testCell) {
        return (testCell.x >= clickedCell.x - 1 && testCell.x <= clickedCell.x + 1 && testCell.y >= clickedCell.y - 1 && testCell.y <= clickedCell.y + 1);
      });
      this.revealContiguousCells(contiguousCells);
    }
  }

  revealContiguousCells(contiguousCells) {
    if (contiguousCells != undefined) {
      contiguousCells.forEach((contiguousCell) => {
        if (contiguousCell.isRevealed === false) {
          this.revealSquare(contiguousCell);
        }
      });
    }
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
