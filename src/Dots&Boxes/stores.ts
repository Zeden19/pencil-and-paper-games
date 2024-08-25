import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";

export interface Dot {
  left?: boolean;
  right?: boolean;
  down?: boolean;
  up?: boolean;
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
  setLineDrawState: (row: number, col: number, canDrawLine: boolean) =>
    setState(() => ({ lineDrawState: { startRow: row, startCol: col, canDrawLine: canDrawLine } })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
