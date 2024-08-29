import { Dot, Line } from "./stores.ts";

export const directions: {
  direction: "down" | "left" | "right" | "up";
  rowIncrement: number;
  colIncrement: number;
}[] = [
  { direction: "right", colIncrement: 1, rowIncrement: 0 },
  { direction: "left", colIncrement: -1, rowIncrement: 0 },
  { direction: "up", colIncrement: 0, rowIncrement: -1 },
  { direction: "down", colIncrement: 0, rowIncrement: 1 },
];

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
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      if (col[direction.direction] !== undefined)
        col[direction.direction] = {
          line: false,
          startRow: rowIndex,
          endRow: rowIndex + direction.rowIncrement,
          startCol: colIndex,
          endCol: colIndex + direction.colIncrement,
        };
    }
  }),
);

export default emptyGrid;
