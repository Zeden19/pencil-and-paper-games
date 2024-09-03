import { create } from "zustand";
import updateUserGamePlayed from "../../hooks/updateUserGamePlayed.ts";
import supabase from "../../services/supabase-client.ts";

interface TicTacToeStore {
  board: string[][];
  vsCpu: boolean;
  turn: "x" | "o";
  playing: boolean;
  winner: string;

  handleTileClick: (indexRow: number, index: number) => void;
  setPlaying: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  reset: () => void;
  setWinner: (winner: string, winningBoard? : string[][]) => void;
}

const Board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const {data: {user}} = await supabase.auth.getUser();
const useTicTacToeStore = create<TicTacToeStore>((setState) => ({
  board: Board,
  vsCpu: true,
  turn: "x",
  playing: false,
  winner: "",

  handleTileClick: (indexDown: number, indexRight: number) => {
    setState((state) => ({
      board: state.board.map((row, rowIndex) =>
        rowIndex === indexDown
          ? row.map((tile, tileIndex) => (tileIndex === indexRight ? state.turn : tile))
          : row,
      ),
    }));
  },
  setPlaying: () =>
    setState((state) => ({
      playing: !state.playing,
      board: Board,
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "x" ? "o" : "x" })),
  reset: () =>
    setState((state) => ({
      playing: !state.playing,
      board: Board,
      winner: "",
    })),
  setWinner: async (winner, winningBoard) => {
    setState((state) => ({ winner: winner, playing: !state.playing, board: winningBoard }));
    if (user) await updateUserGamePlayed(user, "tictactoegamesplayed")
  },
}));

export default useTicTacToeStore;
