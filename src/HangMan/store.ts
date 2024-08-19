import { create } from "zustand";

interface Guess {
  letter: string;
  correct: boolean
}

interface HangManStore {
  playing: boolean;
  incorrectGuesses: number;
  guesses: Guess[];
  win: boolean;
  word: string;
  wordPuzzle: string[];

  setIncorrectGuesses: (incorrectGuesses: number) => void;
  setGuesses: (guess: Guess) => void;
  setWordPuzzle: (wordPuzzle: string[]) => void;
  setWin: (win: boolean) => void;
  startGame: (word: string) => void;
}

const useHangManStore = create<HangManStore>((setState) => ({
  playing: false,
  incorrectGuesses: 0,
  guesses: [],
  win: false,
  word: "",
  wordPuzzle: [],

  setGuesses: (guess) => setState((state) => ({ guesses: [...state.guesses, guess] })),
  setIncorrectGuesses: (incorrectGuesses) =>
    setState(() => ({ incorrectGuesses: incorrectGuesses })),
  setWordPuzzle: (wordPuzzle) => setState(() => ({ wordPuzzle: wordPuzzle })),
  startGame: (word) =>
    setState(() => ({
      win: false,
      playing: true,
      guesses: [],
      word: word,
      wordPuzzle: word.split("").map(() => "_"),
      incorrectGuesses: 0,
    })),
  setWin: (win: boolean) => setState(() => ({ win: win, playing: false })),
}));

export default useHangManStore;
