import { create } from "zustand";

interface HangManStore {
  playing: boolean;
  guesses: string[];
  win: boolean;
  word: string;

  setGuesses: (guess: string) => void;
  setWin: (win: boolean) => void;
  startGame: (word: string) => void;
}

const useHangManStore = create<HangManStore>((setState) => ({
  playing: false,
  guesses: [],
  win: false,
  word: "",

  setGuesses: (guess) =>
    setState((state) => ({ guesses: [...state.guesses, guess] })),
  startGame: (word) =>
    setState(() => ({
      playing: true,
      guesses: [],
      word: word,
    })),
  setWin: (win: boolean) => setState(() => ({ win: win, playing: false })),
}));

export default useHangManStore;
