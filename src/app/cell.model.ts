export class Cell {
  public contiguousBombs: number;
  public isBomb: boolean = false;
  public isFlagged: boolean = false;
  public isRevealed: boolean = false;

  constructor(public x: number, public y: number){
  }
}
