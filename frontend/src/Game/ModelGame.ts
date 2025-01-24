import ViewGame from './ViewGame';

export type Board = {
  x: number;
  y: number;
  size: number;
  head?: boolean;
  align?: boolean;
}[][];

export interface OptionsBoard {
  width: number;
  height: number;
  size: number;
  light: string;
  image: HTMLImageElement;
  imageShip: HTMLImageElement;
  squareWidth: () => number;
  gap: number;
}

const PATH_TO_IMAGE_SHIPS_W = {
  4: '../../public/ships/huge.png',
  3: '../../public/ships/large.png',
  2: '../../public/ships/medium.png',
  1: '../../public/ships/small.png',
} as Record<number, string>;

const PATH_TO_IMAGE_SHIPS_H = {
  4: '../../public/ships/hugeH.png',
  3: '../../public/ships/largeH.png',
  2: '../../public/ships/mediumH.png',
  1: '../../public/ships/smallH.png',
} as Record<number, string>;

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
      imageShip: new Image(),
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

  setImageShip(size: number, align: boolean) {
    this.options.imageShip.src = !align
      ? PATH_TO_IMAGE_SHIPS_H[size]
      : PATH_TO_IMAGE_SHIPS_W[size];
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

    this.board = Array.from({ length: this.options.size }, (_, y) => {
      const cell = [];
      for (let x = 0; x < this.options.size; x += 1) {
        cell.push({
          x,
          y,
          size: 0,
        });
      }
      return cell;
    });

    this.viewGame.drawGameBoard(this.board);
  }

  activeCell(offsetX: number, offsetY: number) {
    const squareWidth = this.options.width / this.options.size;

    const x = Math.trunc(offsetX / squareWidth);
    const y = Math.trunc(offsetY / squareWidth);

    return this.board[y]?.[x];
  }

  handlerHover(x: number, y: number, isActive: boolean, size?: number) {
    if (!size || size === -1) {
      if (isActive) {
        this.viewGame.hoverSquare(x, y);
      } else {
        this.viewGame.clearRect(x, y);
        this.viewGame.drawSquare(x, y);
      }
    }
  }

  handlerPosition(
    {
      x,
      y,
      size,
      align,
    }: {
      x: {
        current: number;
        prev: number;
      };
      y: {
        current: number;
        prev: number;
      };
      size: {
        current: number;
        prev?: number;
      };
      align: {
        current: boolean;
        prev?: boolean;
      };
    },
    isActive: boolean,
  ) {

    for (let i = 0; i < size.current || 0; i += 1) {
      if (isActive) {
        this.viewGame.hoverShip(
          align.current ? x.current : x.current + i,
          align.current ? y.current + i : y.current
        );
      }
    }

    if (size.prev && !isActive) {
      for (let i = 0; i < size.prev; i += 1) {
        this.viewGame.clearRect(
          align.prev ? x.prev : x.prev + i,
          align.prev ? y.prev + i : y.prev
        );
        this.viewGame.drawSquare(
          align.prev ? x.prev : x.prev + i,
          align.prev ? y.prev + i : y.prev
        );
      }
    }
  }

  installShip(size: number, align: boolean, offsetX: number, offsetY: number) {
    const cell = this.activeCell(offsetX, offsetY);
    cell.head = true;
    cell.align = align;

    for (let i = 0; i < size; i += 1) {
      const checkY = align
        ? Math.min(cell.y + i, this.options.size - 1)
        : cell.y;
      const checkX = align
        ? cell.x
        : Math.min(cell.x + i, this.options.size - 1);

      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const newX = checkX + j;
          const newY = checkY + k;

          if (
            newX >= 0 &&
            newX < this.options.size &&
            newY >= 0 &&
            newY < this.options.size
          ) {
            this.board[newY][newX].size = -1;
          }
        }
      }
    }

    for (let i = 0; i < size; i += 1) {
      const checkY = align
        ? Math.min(cell.y + i, this.options.size - 1)
        : cell.y;
      const checkX = align
        ? cell.x
        : Math.min(cell.x + i, this.options.size - 1);

      this.board[checkY][checkX].size = size;
    }
    console.table(this.board.map((cell) => cell.map((s) => s.size)));

    this.viewGame.drawShip(cell.x, cell.y, align, size);
  }
}
