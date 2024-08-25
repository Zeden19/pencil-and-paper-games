import { Dot, Line } from "./stores.ts";

const emptyGrid: Dot[][] = [
  // TOP ROW
  [
    { right: {} as Line, down: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, highlighted: false },
    { left: {} as Line, down: {} as Line, highlighted: false },
  ],

  // MIDDLE ROWS
  [
    { right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
  ],
  [
    { right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
  ],
  [
    { right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, down: {} as Line, up: {} as Line, highlighted: false },
  ],

  // BOTTOM ROW
  [
    { right: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, right: {} as Line, up: {} as Line, highlighted: false },
    { left: {} as Line, up: {} as Line, highlighted: false },
  ],
];

emptyGrid.map((row, rowIndex) =>
  row.map((col, colIndex) => {
    if (col.right !== undefined)
      col.right = { line: false, cellRow: rowIndex, cellCol: colIndex + 1};
    if (col.left !== undefined) col.left = { line: false, cellRow: rowIndex, cellCol: colIndex - 1} ;
    if (col.down !== undefined) col.down = { line: false, cellRow: rowIndex + 1, cellCol: colIndex} ;
    if (col.up !== undefined) col.up = { line: false, cellRow: rowIndex - 1, cellCol: colIndex};
  }),
);

export default emptyGrid;
