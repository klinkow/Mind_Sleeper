import { MinesweeperPage } from './app.po';

describe('minesweeper App', function() {
  let page: MinesweeperPage;

  beforeEach(() => {
    page = new MinesweeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
