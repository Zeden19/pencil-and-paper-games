// Make better: Use OOP instead. Classes are grid, Cell, Line and Box.
// grid is simply the container. Cells have line objects, correlating to their direction.
// Lines have their direction, and the boxes they are apart of
// Boxes have the lines that make them up and value stating who they are owned by (to be used on front end)

const directions = [
  { direction: "right", colIncrement: 1, rowIncrement: 0 },
  { direction: "left", colIncrement: -1, rowIncrement: 0 },
  { direction: "up", colIncrement: 0, rowIncrement: -1 },
  { direction: "down", colIncrement: 0, rowIncrement: 1 },
];

export class Grid {
  public cellGrid: Cell[][];
  public boxGrid: Box[][];

  public canDrawLine = false;

  constructor(rows: number, cols: number) {
    this.cellGrid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => new Cell(row, col)),
    );
    this.boxGrid = Array.from({ length: rows - 1 }, () => Array(cols - 1).fill(0));

    this.initializeCells(rows, cols);
    this.initializeBoxes(rows, cols);
  }

  private initializeCells(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const right = col - 1 === cols ? undefined : new Line("right");
        const left = col == 0 ? undefined : new Line("left");
        const top = row === 0 ? undefined : new Line("top");
        const bottom = row - 1 === rows ? undefined : new Line("bottom");

        this.cellGrid[row][col].setLines(right, left, top, bottom);
      }
    }
  }

  private initializeBoxes(rows: number, cols: number) {
    for (let row = 0; row < rows - 1; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const cell = this.cellGrid[row][col];
        const box = new Box(
          row,
          col,
          cell.right!,
          cell.bottom!,
          this.cellGrid[row + 1][col].top!,
          this.cellGrid[row][col + 1].left!,
        );

        this.boxGrid[row][col] = box;
        [
          cell.right,
          cell.bottom,
          this.cellGrid[row + 1][col].top,
          this.cellGrid[row][col + 1].left,
        ].forEach((line) => {
          if (line) line.setBox(box);
        });
      }
    }
  }

  private setCellsSelectedAndHighlighted(row: number, col: number) {
    const cell = this.cellGrid[row][col];

    if (
      cell.right?.drawn === true &&
      cell.left?.drawn === true &&
      cell.top?.drawn === true &&
      cell.bottom?.drawn === true
    ) {
      return;
    }

    if (cell.right?.drawn === false) {
      this.cellGrid[row][col + 1].highlighted = true;
    }
    if (cell.left?.drawn === false) {
      this.cellGrid[row][col - 1].highlighted = true;
    }
    if (cell.top?.drawn === false) {
      this.cellGrid[row + 1][col].highlighted = true;
    }
    if (cell.bottom?.drawn === false) {
      this.cellGrid[row - 1][col].highlighted = true;
    }
    cell.selected = true;
    this.canDrawLine = true;
  }
}

export class Cell {
  public highlighted = false;
  public selected = false;

  constructor(
    public row: number,
    public col: number,
    public right?: Line,
    public left?: Line,
    public top?: Line,
    public bottom?: Line,
  ) {}

  public setLines(right?: Line, left?: Line, top?: Line, bottom?: Line) {
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
  }
}

class Line {
  public drawn = false;
  public boxes: Box[] = [];

  constructor(public direction: "right" | "left" | "top" | "bottom") {}

  public setBox(newBox: Box) {
    this.boxes?.push(newBox);
  }
}

class Box {
  public owner: undefined | "red" | "blue";
  public topLine: Line;
  public bottomLine: Line;
  public leftLine: Line;
  public rightLine: Line;
  public row: number;
  public col: number;

  constructor(
    row: number,
    col: number,
    rightLine: Line,
    leftLine: Line,
    topLine: Line,
    bottomLine: Line,
  ) {
    this.topLine = topLine;
    this.bottomLine = bottomLine;
    this.leftLine = leftLine;
    this.rightLine = rightLine;
    this.row = row;
    this.col = col;
  }
}
