//Refactor time: Cells and lines don't know where they are. Lines also are made weird because they don't match with boxes
// box references do not work


import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";
import { Grid } from "./Grid.ts";

export interface Line {
  line: boolean;
  startRow: number;
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
  completed: boolean;
}

interface BoxDirections {
  left: Line;
  right: Line;
  down: Line;
  up: Line;

  [index: string]: Line;
}

interface DotsBoxesStore {
  grid: Grid;
  scores: { red: number; blue: number };
  vsCpu: boolean;
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setScore: (turn: "red" | "blue") => void;
  setVsCpu: () => void;
  setTurn: (turn: "red" | "blue") => void;
  setWinner: (winner: string) => void;
}


const useDotsAndBoxes = create<DotsBoxesStore>((setState) => ({
  grid: new Grid(5, 6),
  scores: { red: 0, blue: 0 },
  vsCpu: true,
  turn: "red",
  playing: false,
  winner: "",

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: new Grid(5, 6),
      winner: "",
      lineDrawState: { startRow: NaN, startCol: NaN, canDrawLine: false },
      scores: { red: 0, blue: 0 },
    })),
  setScore: (turn: "red" | "blue") =>
    setState((state) => ({ scores: { ...state.scores, [turn]: state.scores[turn] += 1 } })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: (turn: "red" | "blue") =>
    setState((state) => ({
      turn: turn,
      lineDrawState: { startRow: NaN, startCol: NaN, canDrawLine: false },
    })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
