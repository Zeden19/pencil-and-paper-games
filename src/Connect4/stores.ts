import { create } from "zustand";
import emptyChip from "../assets/emptyChip.png";

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

const emptyGrid = [
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
  [
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    {
      turn: "",
      src: emptyChip,
      winning: false,
    },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
    { turn: "", src: emptyChip, winning: false },
  ],
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
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
        [
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          {
            turn: "",
            src: emptyChip,
            winning: false,
          },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
          { turn: "", src: emptyChip, winning: false },
        ],
      ],
      winner: "",
    })),
  setVsCpu: () => setState((state) => ({ vsCpu: !state.vsCpu })),
  setTurn: () => setState((state) => ({ turn: state.turn === "red" ? "yellow" : "red" })),
  setGrid: (newGrid: Connect4Tile[][]) => setState(() => ({ grid: newGrid })),
  setWinner: (winner) => setState(() => ({ winner: winner, playing: false })),
}));

export default useConnect4Store;
