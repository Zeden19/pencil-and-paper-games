import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";

export interface Line {
  line: boolean;
  cellRow: number;
  cellCol: number;
}

export interface Dot {
  left?: Line;
  right?: Line;
  down?: Line;
  up?: Line;
  highlighted: boolean;
}

interface DotsBoxesStore {
  grid: Dot[][];
  vsCpu: boolean;
  lineDrawState: { startRow: number; startCol: number; canDrawLine: boolean };
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setVsCpu: () => void;

  setTurn: () => void;
  setLineDrawState: (startRow: number, startCol: number, canDrawLine: boolean) => void;
  setCellsHighlighted: (cells: { row: number; col: number }[]) => void;
  setGrid: (newGrid: Dot[][]) => void;

  setWinner: (winner: string) => void;
}

const useDotsAndBoxes = create<DotsBoxesStore>((setState) => ({
  grid: JSON.parse(JSON.stringify(emptyGrid)),
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
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "blue" : "red" })),
  setGrid: (newGrid: Dot[][]) => setState(() => ({ grid: newGrid })),
  setCellsHighlighted: (cells: { row: number; col: number }[]) =>
    setState((state) => ({
      grid: state.grid.map((row, rowIndex) =>
        row.map((col, colIndex) =>
          cells.some((cell) => cell.row === rowIndex && cell.col === colIndex)
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
