//todo add way to look through all directions without all if statements

interface Direction {
  rowIncrement: number;
  colIncrement: number;
}

interface Directions {
  right: Direction;
  left: Direction;
  top: Direction;
  bottom: Direction;

  [key: string]: Direction;
}

const directions: Directions = {
  right: { rowIncrement: 0, colIncrement: 1 },
  left: { rowIncrement: 0, colIncrement: -1 },
  top: { rowIncrement: -1, colIncrement: 0 },
  bottom: { rowIncrement: 1, colIncrement: 0 },
};

function oppositeDirection(direction: string) {
  switch (direction) {
    case "right":
      return "left";
    case "left":
      return "right";
    case "top":
      return "bottom";
  }
  return "top";
}

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
          cell.right!,
          this.cellGrid[row][col + 1].bottom!,
          this.cellGrid[row + 1][col + 1].left!,
          this.cellGrid[row + 1][col].top!,
        );
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

    //todo find a way to fix these errors
    const keyDirections = Object.keys(directions);
    if (keyDirections.every((direction) => cell[direction]?.drawn === true)) return;

    keyDirections.forEach((direction) => {
      if (cell[direction]?.drawn === false) {
        this.cellGrid[row + directions[direction].rowIncrement][
          col + directions[direction].colIncrement
        ].highlighted = true;
      }
    });
    cell.selected = true;
  }

  public setLines(highLightedCell: Cell) {
    const selectedCell = this.cellGrid.flat().find((cell) => cell.selected);
    let lineDrawn;

    Object.keys(directions).forEach((direction) => {
      if (selectedCell![direction]?.goingTo === highLightedCell) {
        selectedCell![direction].drawn = true;
        if (highLightedCell[oppositeDirection(direction)])
          highLightedCell[oppositeDirection(direction)]!.drawn = true;
        lineDrawn = selectedCell![direction];
      }
    });
    
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

  constructor(
    public rightLine: Line,
    public leftLine: Line,
    public topLine: Line,
    public bottomLine: Line,
  ) {}

  public isCompleted() {
    if (this.rightLine.drawn && this.leftLine.drawn && this.topLine.drawn && this.bottomLine.drawn)
      return true;
  }
}
