import ViewGame from './ViewGame';

export type Board = { x: number; y: number }[];

export interface OptionsBoard {
  width: number;
  height: number;
  size: number;
  light: string;
  image: HTMLImageElement;
  squareWidth: () => number;
  gap: number;
}

export default class ModelGame {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  viewGame: ViewGame;
  options: OptionsBoard;
  board: Board;

  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d') || null;
    this.board = [];
    this.options = {
      width: 400,
      height: 400,
      size: 10,
      light: '#d1eefc',
      image: new Image(),
      squareWidth: function () {
        return this.width / this.size;
      },
      gap: 1,
    };
    this.setImageBg();
    this.viewGame = new ViewGame(this.ctx, this.options);

    this.ctx?.clearRect(0, 0, this.options.width, this.options.height);
  }

  setImageBg() {
    this.options.image.src = '../../public/bgcanvas.png';
  }

  destroyEvent() {
    if (this.canvas) {
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
      this.canvas.onmouseout = null;

    }
  }

  gameBoard() {
    const screen = this.canvas?.getBoundingClientRect();
    if (screen) {
      this.options.width = screen.width;
      this.options.height = screen.height;
    }
    let totalSquares = Math.pow(this.options.size, 2);
    let x = -1,
      y = -1;

    for (let i = 0; i < totalSquares; i += 1) {
      x += 1;

      if (i % this.options.size == 0) {
        y += 1;
        x = 0;
      }
      this.board.push({ x, y });
    }
    this.viewGame.drawGameBoard(this.board);
  }

  activeCell(offsetX: number, offsetY: number) {
    const squareWidth = this.options.width / this.options.size;

    const cell = this.board.find(
      (cell) =>
        offsetX >= cell.x * squareWidth &&
        offsetX <= (cell.x + 1) * squareWidth &&
        offsetY >= cell.y * squareWidth &&
        offsetY <= (cell.y + 1) * squareWidth
    );
    return cell;
  }

  handlerHover(x: number, y: number, isActive: boolean) {

    if (isActive) {
      this.viewGame.hoverSquare(x, y);
    } else {
      this.viewGame.clearRect(x, y);
      this.viewGame.drawSquare(x, y);
    }
  }
}
