import { create } from "zustand";
import emptyGrid from "./emptyGrid.ts";
import updateUserGamePlayed from "../../hooks/updateUserGamePlayed.ts";
import supabase from "../../services/supabase-client.ts";
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

const {data: {user}} = await supabase.auth.getUser();
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
  setWinner: async (winner) => {
    setState(() => ({ winner: winner, playing: false }));
    if (user) await updateUserGamePlayed(user, "connect4gamesplayed")
  },
}));

export default useConnect4Store;
