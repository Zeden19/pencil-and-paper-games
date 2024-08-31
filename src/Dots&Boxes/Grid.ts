// Make better: Use OOP instead. Classes are grid, Cell, Line and Box.
// grid is simply the container. Cells have line objects, correlating to their direction.
// Lines have their direction, and the boxes they are apart of
// Boxes have the lines that make them up and value stating who they are owned by (to be used on front end)

//todo add way to look through all directions without all if statements

const directions = [
  { direction: "right", colIncrement: 1, rowIncrement: 0 },
  { direction: "left", colIncrement: -1, rowIncrement: 0 },
  { direction: "up", colIncrement: 0, rowIncrement: -1 },
  { direction: "down", colIncrement: 0, rowIncrement: 1 },
];

export class Grid {
  public cellGrid: Cell[][];
  public boxGrid: Box[][];

  constructor(rows: number, cols: number) {
    this.cellGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => new Cell()),
    );
    this.boxGrid = Array.from({ length: rows - 1 }, () => Array(cols - 1).fill(0));

    this.initializeCells(rows, cols);
    this.initializeBoxes(rows, cols);
    this.initializeLineBoxes(rows, cols);
  }

  private initializeCells(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const right = col < cols - 1 ? new Line("right", this.cellGrid[row][col + 1]) : undefined;
        const left = col > 0 ? new Line("left", this.cellGrid[row][col - 1]) : undefined;
        const top = row > 0 ? new Line("top", this.cellGrid[row - 1][col]) : undefined;
        const bottom = row < rows - 1 ? new Line("bottom", this.cellGrid[row + 1][col]) : undefined;

        this.cellGrid[row][col].setLines(right, left, top, bottom);
      }
    }
  }

  // design flaw: the lefts and bottoms aren't "referenced" by the rights and lefts, thus we miss some things
  private initializeBoxes(rows: number, cols: number) {
    for (let row = 0; row < rows - 1; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const cell = this.cellGrid[row][col];
        this.boxGrid[row][col] = new Box(
          row,
          col,
          cell.right!,
          this.cellGrid[row][col + 1].bottom!,
          this.cellGrid[row + 1][col + 1].left!,
          this.cellGrid[row + 1][col].top!,
        );

        // const box = this.boxGrid[row][col];
        // [
        //   cell.right,
        //   this.cellGrid[row][col + 1].bottom!,
        //   this.cellGrid[row + 1][col + 1].left!,
        //   this.cellGrid[row + 1][col].top!,
        // ].forEach(line => line?.setBox(box));
      }
    }
  }

  private initializeLineBoxes(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = this.cellGrid[row][col];

        if (row < rows - 1) {
          cell.right?.setBox(this.boxGrid[row][col]);
          cell.right?.goingTo.left?.setBox(this.boxGrid[row][col]);
        }
        if (0 < row) {
          cell.right?.setBox(this.boxGrid[row - 1][col]);
          cell.right?.goingTo.left?.setBox(this.boxGrid[row - 1][col]);
        }

        if (col < cols - 1) {
          cell.bottom?.setBox(this.boxGrid[row][col]);
          cell.bottom?.goingTo.top?.setBox(this.boxGrid[row][col]);
        }

        if (0 < col) {
          cell.bottom?.setBox(this.boxGrid[row][col - 1]);
          cell.bottom?.goingTo.top?.setBox(this.boxGrid[row][col - 1]);
        }
      }
    }
  }

  private unHighlightAllCells() {
    this.cellGrid.flat().map((row) => (row.highlighted = false));
  }

  private unSelectCell() {
    this.cellGrid.flat().map((row) => (row.selected = false));
  }

  public setCellsSelectedAndHighlighted(row: number, col: number) {
    const cell = this.cellGrid[row][col];
    this.unSelectCell();
    this.unHighlightAllCells();

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
      this.cellGrid[row - 1][col].highlighted = true;
    }
    if (cell.bottom?.drawn === false) {
      this.cellGrid[row + 1][col].highlighted = true;
    }
    cell.selected = true;
  }

  public setLines(highLightedCell: Cell) {
    const selectedCell = this.cellGrid.flat().find((cell) => cell.selected);
    let lineDrawn;

    if (selectedCell!.right?.goingTo === highLightedCell) {
      selectedCell!.right.drawn = true;
      if (highLightedCell.left) {
        highLightedCell.left.drawn = true;
      }
      lineDrawn = selectedCell!.right;
    } else if (selectedCell!.left?.goingTo === highLightedCell) {
      selectedCell!.left.drawn = true;
      if (highLightedCell.right) {
        highLightedCell.right.drawn = true;
      }
      lineDrawn = selectedCell!.left;
    } else if (selectedCell!.top?.goingTo === highLightedCell) {
      selectedCell!.top.drawn = true;
      if (highLightedCell.bottom) {
        highLightedCell.bottom.drawn = true;
      }
      lineDrawn = selectedCell!.top;
    } else {
      selectedCell!.bottom!.drawn = true;
      if (highLightedCell.top) {
        highLightedCell.top.drawn = true;
      }
      lineDrawn = selectedCell!.bottom;
    }

    this.unHighlightAllCells();
    this.unSelectCell();
    return lineDrawn;
  }
}

export class Cell {
  public highlighted = false;
  public selected = false;

  [key: string]: Line | undefined | number | boolean | (() => void);

  constructor(
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

  constructor(
    public direction: "right" | "left" | "top" | "bottom",
    public goingTo: Cell,
  ) {}

  public setBox(newBox: Box) {
    this.boxes?.push(newBox);
  }
}

export class Box {
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

  public isCompleted() {
    if (this.rightLine.drawn && this.leftLine.drawn && this.topLine.drawn && this.bottomLine.drawn)
      return true;
  }
}
