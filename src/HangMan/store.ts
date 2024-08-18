import { create } from "zustand";

interface HangManStore {
  playing: boolean;
  incorrectGuesses: number;
  guesses: string[];
  win: boolean;
  word: string;

  setIncorrectGuesses: (incorrectGuesses: number) => void;
  setGuesses: (guess: string) => void;
  setWin: (win: boolean) => void;
  startGame: (word: string) => void;
}

const useHangManStore = create<HangManStore>((setState) => ({
  playing: false,
  incorrectGuesses: 0,
  guesses: [],
  win: false,
  word: "",

  setGuesses: (guess) => setState((state) => ({ guesses: [...state.guesses, guess] })),
  setIncorrectGuesses: (incorrectGuesses) =>
    setState(() => ({ incorrectGuesses: incorrectGuesses })),
  startGame: (word) =>
    setState(() => ({
      playing: true,
      guesses: [],
      word: word,
    })),
  setWin: (win: boolean) => setState(() => ({ win: win, playing: false })),
}));

export default useHangManStore;
