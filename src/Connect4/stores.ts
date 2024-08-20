import { create } from "zustand";

interface Connect4Store {
  grid: string[][];
  vsCpu: boolean;
  turn: "red" | "yellow";
  playing: boolean;
  winner: string;

  setPlaying: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  reset: () => void;
  setWinner: (winner: string, winningBoard?: string[][]) => void;
}

const emptyGrid = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];
const useConnect4Store = create<Connect4Store>((setState) => ({
  grid: emptyGrid,
  vsCpu: true,
  turn: "red",
  playing: false,
  winner: "",
  
  setPlaying: () =>
    setState((state) => ({
      playing: !state.playing,
      board: emptyGrid,
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "red" : "yellow" })),
  reset: () =>
    setState((state) => ({
      playing: !state.playing,
      board: emptyGrid,
      winner: "",
    })),
  setWinner: (winner, winningBoard) =>
    setState((state) => ({ winner: winner, playing: !state.playing, board: winningBoard })),
}));

export default useConnect4Store;
