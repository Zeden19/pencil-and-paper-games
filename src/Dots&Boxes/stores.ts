import { create } from "zustand";

interface Box {
  left: boolean;
  right: boolean;
  down: boolean;
  top: boolean;
  owner: string;
}

interface DotsBoxesStore {
  grid: Box[][];
  vsCpu: boolean;
  turn: "red" | "blue";
  playing: boolean;
  winner: string;

  startGame: () => void;
  setVsCpu: () => void;
  setTurn: () => void;
  setGrid: (newGrid: Box[][]) => void;
  setWinner: (winner: string) => void;
}

const emptyGrid = [
  [
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
  ],
  [
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
  ],
  [
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
  ],
  [
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
    { left: false, right: false, down: false, top: false, owner: "" },
  ],
];

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
  setGrid: (newGrid: Box[][]) => setState(() => ({ grid: newGrid })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useDotsAndBoxes;
