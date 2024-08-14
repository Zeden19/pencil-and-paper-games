import { create } from "zustand";

interface TicTacToeStore {
  board: string[][];
  vsCpu: boolean;
  turn: "x" | "o";
  playing: boolean;

  handleTileClick: (indexRow: number, index: number) => void;
  setPlaying: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  reset: () => void;
}

const useTicTacToeStore = create<TicTacToeStore>((setState) => ({
  board: [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ],
  vsCpu: true,
  turn: "x",
  playing: false,

  handleTileClick: (indexRow: number, index: number) => {
    setState((state) => ({
      board: state.board.map((column, rowIndex) =>
        rowIndex === index
          ? column.map((tile, tileIndex) =>
              tileIndex === indexRow ? state.turn : tile,
            )
          : column,
      ),
    }));
  },
  setPlaying: () => setState((state) => ({ playing: !state.playing })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () =>
    setState((state) => ({ turn: state.turn === "x" ? "o" : "x" })),
  reset: () =>
    setState((state) => ({
      playing: !state.playing,
      board: [
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"],
      ],
    })),
}));

export default useTicTacToeStore;
