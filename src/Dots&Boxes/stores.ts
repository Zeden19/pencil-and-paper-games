import { create } from "zustand";
import { Grid } from "./Grid.ts";

interface DotsBoxesStore {
  grid: Grid;
  scores: { red: number; blue: number };
  vsCpu: boolean;
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setGrid: (grid: Grid) => void;
  setScore: (turn: "red" | "blue") => void;
  setVsCpu: () => void;
  setTurn: (turn: "red" | "blue") => void;
  setWinner: (winner: string) => void;
}

const grid = new Grid(5,6);

const useDotsAndBoxes = create<DotsBoxesStore>((setState) => ({
  grid: grid,
  scores: { red: 0, blue: 0 },
  vsCpu: true,
  turn: "red",
  playing: false,
  winner: "",

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: grid.reset(),
      winner: "",
      scores: { red: 0, blue: 0 },
    })),
  setGrid: (newGrid: Grid) => setState(() => ({grid: newGrid})),
  setScore: (turn: "red" | "blue") =>
    setState((state) => ({ scores: { ...state.scores, [turn]: state.scores[turn] += 1 } })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: (turn: "red" | "blue") =>
    setState(() => ({
      turn: turn,
    })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
