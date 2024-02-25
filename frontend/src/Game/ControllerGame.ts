import ModelGame from './ModelGame';

export default class ControllerGame extends ModelGame {
  mouseDown: boolean | undefined;
  active: { x: number; y: number; isActive: boolean } | undefined;

  constructor(canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.listen();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmouseup = this.mouseUpEHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownEHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveEHandler.bind(this);
      this.canvas.onmouseout = this.mouseOutEHandler.bind(this);
    }
    this.gameBoard();
  }

  mouseUpEHandler(e: MouseEvent) {
    this.mouseDown = false;
  }

  mouseDownEHandler(e: MouseEvent) {
    this.mouseDown = true;
  }

  mouseMoveEHandler(e: MouseEvent) {
    const cell = this.activeCell(e.offsetX, e.offsetY);

    if (this.active && this.active.x === cell?.x && this.active.y === cell.y) {
      return;
    }

    if (!this.active && cell) {
      this.active = {
        x: cell.x,
        y: cell.y,
        isActive: true,
      };

      this.handlerHover(cell.x, cell.y, true);
      return;
    }

    if (cell && this.active?.isActive) {
      this.handlerHover(this.active.x, this.active.y, false);
      this.active = undefined;
      return;
    }
  }

  mouseOutEHandler(e: MouseEvent) {
    if (this.active) {
      this.handlerHover(this.active.x, this.active.y, false);
      this.active = undefined;
    }
  }

  shipPositionHandler(sizeShip: number, alignShips: boolean) {
    console.log(sizeShip);

    return true;
  }
}
