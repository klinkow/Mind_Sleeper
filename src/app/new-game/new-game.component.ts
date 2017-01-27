import { Component, Output, EventEmitter } from '@angular/core';
import { Board } from '.././board.model';
import { Cell } from '.././cell.model';

@Component({
  selector: 'new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {
  @Output() newGameSender = new EventEmitter();

  startGame(name: string, difficulty: string) {
    var newBoard: Board = new Board(difficulty, name)
    this.newGameSender.emit(newBoard);
  }
}
