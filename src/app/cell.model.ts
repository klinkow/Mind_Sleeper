export class Cell {
  public contiguousBombs: number;
  public isBomb: boolean;
  public isFlagged: boolean;
  constructor(public x: number, public y: number){
  }
}
