import ModelGame from './ModelGame';

export default class ControllerGame extends ModelGame {
  mouseDown: boolean | undefined;
  active: { x: number; y: number; isActive: boolean, size?: number, align?: boolean } | undefined;
  hoverShip: boolean | undefined;

  constructor(canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.listen();
    this.gameBoard();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveEHandler.bind(this);
      this.canvas.onmouseout = this.mouseOutEHandler.bind(this);
    }
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

      this.handlerHover(cell.x, cell.y, true, cell.size);
      return;
    }

    if (cell && this.active?.isActive) {
      this.handlerHover(this.active.x, this.active.y, false);
      this.active = undefined;
      return;
    }
  }

  mouseOutEHandler(_: MouseEvent) {
    if (this.active) {
      this.handlerHover(this.active.x, this.active.y, false);
      this.active = undefined;
    }
  }

  mouseClickHandler(size: number, align: boolean, {offsetX, offsetY}: MouseEvent) {
    this.setImageShip(size, align);
    const img = this.options.imageShip;
    img.onload = () => {
      this.installShip(size, align, offsetX, offsetY);
    };
  }

  shipPositionHandler(size: number, align: boolean) {
    if (this.canvas) {
      const handler = ({ offsetX, offsetY }: MouseEvent) => {
        const cell = this.activeCell(offsetX, offsetY);

        if (
          (this.active &&
          this.active.x === cell?.x &&
          this.active.y === cell.y) || cell.size !== 0
        ) {
          return;
        }

        if (!this.active && cell) {
          this.active = {
            x: cell.x,
            y: cell.y,
            align,
            size,
            isActive: true,
          };
          this.handlerPosition(
            {
              x: { prev: cell.x, current: cell.x },
              y: { prev: cell.y, current: cell.y },
              size: {prev: size, current: size},
              align: {prev: align, current: align},
            },
            true
          );
          return;
        }
        if (cell && this.active?.isActive) {
          this.handlerPosition(
            {
              x: { prev: this.active.x, current: cell.x },
              y: { prev: this.active.y, current: cell.y },
              size: {prev: this.active.size, current: size},
              align: {prev: this.active.align, current: align},
            },
            false
          );
          this.active = undefined;
          return;
        }
      };

      if (size > 0) {
        this.destroyEvent();
        this.canvas.onmouseover = () => {
          if (this.canvas) {
            this.canvas.onmousemove = handler.bind(this);
            this.canvas.onmousedown = this.mouseClickHandler.bind(this, size, align);
          }
        };
        this.canvas.onmouseout = () => {
          if (this.canvas) {
            if (this.active) {
              this.handlerPosition(
                {
                  x: { prev: this.active.x, current: this.active.x },
                  y: { prev: this.active.y, current: this.active.y },
                  size: {prev: this.active.size, current: size},
                  align: {prev: this.active.align, current: align},
                },
                false
              );
              this.active = undefined;
            }
            this.canvas.onmousemove = null;
          }
        };
      } else {
        this.canvas.onmouseover = null;
        this.canvas.onmouseout = null;
        this.listen();
      }
    }

    return false;
  }
}
