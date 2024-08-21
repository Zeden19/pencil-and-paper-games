import { create } from "zustand";

interface Connect4Store {
  grid: string[][];
  vsCpu: boolean;
  turn: "red" | "yellow";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  setGrid: (newGrid: string[][]) => void;
  setWinner: (winner: string) => void;
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

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: [
        ["", "", "", "", "", "", ""], // zustland was for some reason changing the value of emptygrid idk why
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ],
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "yellow" : "red" })),
  setGrid: (newGrid: string[][]) => setState(() => ({ grid: newGrid })),
  setWinner: (winner) => setState((state) => ({winner: winner, playing: false}))
}));

export default useConnect4Store;
