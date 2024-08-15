import { create } from "zustand";

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
  setWinner: (winner: string) => void;
}

const emptyBoard = [
  ["empty", "empty", "empty"],
  ["empty", "empty", "empty"],
  ["empty", "empty", "empty"],
];
const useTicTacToeStore = create<TicTacToeStore>((setState) => ({
  board: emptyBoard,
  vsCpu: true,
  turn: "x",
  playing: false,
  winner: "",

  handleTileClick: (indexDown: number, indexRight: number) => {
    setState((state) => ({
      board: state.board.map((row, rowIndex) =>
        rowIndex === indexDown
          ? row.map((tile, tileIndex) =>
              tileIndex === indexRight ? state.turn : tile,
            )
          : row,
      ),
    }));
  },
  setPlaying: () =>
    setState((state) => ({
      playing: !state.playing,
      board: emptyBoard,
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () =>
    setState((state) => ({ turn: state.turn === "x" ? "o" : "x" })),
  reset: () =>
    setState((state) => ({
      playing: !state.playing,
      board: emptyBoard,
      winner: "",
    })),
  setWinner: (winner) =>
    setState((state) => ({ winner: winner, playing: !state.playing })),
}));

export default useTicTacToeStore;
