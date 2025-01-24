import { Board, OptionsBoard } from './ModelGame';

export default class ViewGame {
  ctx: CanvasRenderingContext2D | null;
  options: OptionsBoard;

  constructor(ctx: CanvasRenderingContext2D | null, options: OptionsBoard) {
    this.ctx = ctx;
    this.options = options;
  }

  drawGameBoard(board: Board) {
    const img = this.options.image;

    img.onload = () =>
      board.forEach((col) => {
        col.forEach(({ x, y }) => {
          this.drawSquare(x, y);
        });
      });
  }

  drawSquare(x: number, y: number) {
    const squareWidth = this.options.width / this.options.size;
    const gap = this.options.gap;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.globalAlpha = 0.7;

      this.ctx.rect(
        x * squareWidth + gap,
        y * squareWidth + gap,
        squareWidth - gap * 2,
        squareWidth - gap * 2
      );
      this.ctx.drawImage(
        this.options.image,
        x * squareWidth + gap,
        y * squareWidth + gap,
        squareWidth - gap * 2,
        squareWidth - gap * 2
      );
    }
  }

  hoverSquare(x: number, y: number) {
    this.clearRect(x, y);

    if (this.ctx) {
      this.drawSquare(x, y);
      this.ctx.strokeStyle = 'blue';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  hoverShip(x: number, y: number, isBlock?: boolean) {
    this.clearRect(x, y);

    if (this.ctx) {
      this.drawSquare(x, y);
      this.ctx.strokeStyle = isBlock ? 'red' : 'rgb(187, 255, 0)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  clearRect(x: number, y: number) {
    const squareWidth = this.options.width / this.options.size;

    this.ctx?.clearRect(
      x * squareWidth,
      y * squareWidth,
      squareWidth,
      squareWidth
    );
  }

  drawShip(x: number, y: number, align: boolean, size: number) {
    const squareWidth = this.options.width / this.options.size;

    if (this.ctx) {
      this.ctx.drawImage(
        this.options.imageShip,
        x * squareWidth,
        y * squareWidth,
        align ? squareWidth: squareWidth * size,
        align ? squareWidth * size : squareWidth
      );
    }
  }
}
