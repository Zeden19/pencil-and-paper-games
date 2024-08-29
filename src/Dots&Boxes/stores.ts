//todo clean up code, specifically, let the Dots know where it is in the grid
// maybe use class???

//todo abstract mapping logic
import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";

export interface Line {
  line: boolean;
  startRow: number
  endRow: number;
  startCol: number;
  endCol: number;
}

export interface Dot {
  left?: Line;
  right?: Line;
  down?: Line;
  up?: Line;
  highlighted: boolean;

  [index: string]: Line | undefined | boolean;
}

export interface Box {
  directions: BoxDirections;
  owner: "red" | "blue" | undefined;
}

interface BoxDirections {
  left: Line;
  right: Line;
  down: Line;
  up: Line;

  [index: string]: Line;
}

interface DotsBoxesStore {
  grid: Dot[][];
  boxGrid: Box[][];
  scores: { red: number; blue: number };
  vsCpu: boolean;
  lineDrawState: { startRow: number; startCol: number; canDrawLine: boolean };
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setScore: (turn: "red" | "blue") => void;
  setVsCpu: () => void;
  setTurn: () => void;
  setLineDrawState: (startRow: number, startCol: number, canDrawLine: boolean) => void;
  setCellsHighlighted: (cells?: { row: number; col: number }[]) => void;
  setGrid: (newGrid: Dot[][]) => void;

  setWinner: (winner: string) => void;
}

const initializeBoxGrid = (boxGrid: Box[][], dotGrid: Dot[][]) => {
  for (let i = 0; i < dotGrid.length - 1; i++) {
    for (let j = 0; j < dotGrid[0].length - 1; j++) {
      boxGrid[i][j] = {
        directions: {
          left: dotGrid[i][j].down!,
          right: dotGrid[i][j + 1].down!,
          down: dotGrid[i + 1][j].right!,
          up: dotGrid[i][j].right!,
        },
        owner: undefined,
      };
    }
  }
  return boxGrid;
};

const useDotsAndBoxes = create<DotsBoxesStore>((setState) => ({
  grid: JSON.parse(JSON.stringify(emptyGrid)),
  boxGrid: new Array(emptyGrid.length - 1)
    .fill(0)
    .map(() => new Array(emptyGrid[0].length - 1).fill(0)),
  scores: { red: 0, blue: 0 },
  vsCpu: true,
  lineDrawState: { startRow: NaN, startCol: NaN, canDrawLine: false },
  turn: "red",
  playing: false,
  winner: "",

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: JSON.parse(JSON.stringify(emptyGrid)),
      winner: "",
      lineDrawState: { startRow: NaN, startCol: NaN, canDrawLine: false },
      boxGrid: initializeBoxGrid(state.boxGrid, state.grid),
      scores: { red: 0, blue: 0 },
    })),
  setScore: (turn: "red" | "blue") =>
    setState((state) => ({ scores: { ...state.scores, turn: (state.scores[turn] += 1) } })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () =>
    setState((state) => ({
      turn: state.turn === "red" ? "blue" : "red",
      lineDrawState: { startRow: NaN, startCol: NaN, canDrawLine: false },
      grid: state.grid.map((row) => row.map((col) => ({ ...col, highlighted: false }))),
    })),
  setGrid: (newGrid: Dot[][]) =>
    setState((state) => ({ grid: newGrid, boxGrid: initializeBoxGrid(state.boxGrid, state.grid) })),
  setCellsHighlighted: (cells?: { row: number; col: number }[]) =>
    setState((state) => ({
      grid: state.grid.map((row, rowIndex) =>
        row.map((col, colIndex) =>
          cells?.some((cell) => cell.row === rowIndex && cell.col === colIndex)
            ? { ...col, highlighted: true }
            : { ...col, highlighted: false },
        ),
      ),
    })),
  setLineDrawState: (row: number, col: number, canDrawLine: boolean) =>
    setState(() => ({ lineDrawState: { startRow: row, startCol: col, canDrawLine: canDrawLine } })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
