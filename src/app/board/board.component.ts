import { Component, OnInit } from '@angular/core';
import { Board } from '.././board.model';
import { Cell } from '.././cell.model';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  board: Board;

  constructor() { }

  ngOnInit() {
    this.board = new Board ("small", "Devin", []);
    this.board.populateBoard();
    console.log(this.board.cells);
  }

  revealSquare(clickedCell) {
    if (clickedCell.isBomb) {
      alert("Game Over")
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
    if (cell.isRevealed) {
      return "blue";
    } else {
      return "grey";
    }
  }
}
