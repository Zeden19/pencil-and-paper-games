import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";
interface Connect4Tile {
  turn: string;
  src: string;
  winning: boolean;
}

interface Connect4Store {
  grid: Connect4Tile[][];
  vsCpu: boolean;
  turn: "red" | "yellow";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  setGrid: (newGrid: Connect4Tile[][]) => void;
  setWinner: (winner: string) => void;
}

const useConnect4Store = create<Connect4Store>((setState) => ({
  grid: JSON.parse(JSON.stringify(emptyGrid)),
  vsCpu: true,
  turn: "red",
  playing: false,
  winner: "",

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: JSON.parse(JSON.stringify(emptyGrid)),
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "yellow" : "red" })),
  setGrid: (newGrid: Connect4Tile[][]) => setState(() => ({ grid: newGrid })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useConnect4Store;
