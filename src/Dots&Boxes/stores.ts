import { create } from "zustand";

interface Dot {
  left?: boolean;
  right?: boolean;
  down?: boolean;
  top?: boolean;
}

interface DotsBoxesStore {
  grid: Dot[][];
  vsCpu: boolean;
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  setGrid: (newGrid: Dot[][]) => void;
  setWinner: (winner: string) => void;
}

const topRow = [
  { right: false, down: false },
  { left: false, right: false, down: false },
  { left: false, right: false, down: false },
  { left: false, right: false, down: false },
  { left: false, right: false, down: false },
  { left: false, down: false },
];
const bottomRow = [
  { right: false, top: false },
  { left: false, right: false, top: false },
  { left: false, right: false, top: false },
  { left: false, right: false, top: false },
  { left: false, right: false, top: false },
  { left: false, top: false },
];
const middleRow = [
  { right: false, down: false, top: false },
  { left: false, right: false, down: false, top: false },
  { left: false, right: false, down: false, top: false },
  { left: false, right: false, down: false, top: false },
  { left: false, right: false, down: false, top: false },
  { left: false, down: false, top: false },
];
const emptyGrid = [topRow, middleRow, middleRow, middleRow, bottomRow];

const useDotsAndBoxes = create<DotsBoxesStore>((setState) => ({
  grid: emptyGrid,
  vsCpu: true,
  turn: "red",
  playing: false,
  winner: "",

  startGame: () =>
    setState((state) => ({
      playing: !state.playing,
      grid: emptyGrid,
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "blue" : "red" })),
  setGrid: (newGrid: Dot[][]) => setState(() => ({ grid: newGrid })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
