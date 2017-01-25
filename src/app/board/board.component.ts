import { Component, OnInit } from '@angular/core';
import { Board } from '.././board.model';
import { Cell } from '.././cell.model';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var board : Board = new Board ("small", "Devin");
    console.log(board);
  }

  populateBoard(board) {

  }
}
