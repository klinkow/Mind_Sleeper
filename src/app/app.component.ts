import { Component, OnInit, EventEmitter } from '@angular/core';
import { Board } from './board.model';
import { Cell } from './cell.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showNewGameForm : boolean = false;
  board: Board;

  ngOnInit() {
    this.board = new Board ("1", "");
    this.board.populateBoard();
  }

  toggleGameForm() {
    this.showNewGameForm = !this.showNewGameForm;
  }

  newGame(board) {
    this.board = board;
    this.board.populateBoard();
    this.toggleGameForm();
  }
}
