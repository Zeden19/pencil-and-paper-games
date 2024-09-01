import { create } from "zustand";

interface Guess {
  letter: string;
  correct: boolean
}

interface HangManStore {
  playing: boolean;
  hint: string
  incorrectGuesses: number;
  guesses: Guess[];
  win: boolean;
  word: string;
  wordPuzzle: string[];

  setGuesses: (guess: Guess) => void;
  setHint: (hint: string) => void;
  setIncorrectGuesses: (incorrectGuesses: number) => void;
  setWordPuzzle: (wordPuzzle: string[]) => void;
  setWin: (win: boolean) => void;
  startGame: (word: string) => void;
}

const useHangManStore = create<HangManStore>((setState) => ({
  playing: false,
  hint: "",
  incorrectGuesses: 0,
  guesses: [],
  win: false,
  word: "",
  wordPuzzle: [],

  setGuesses: (guess) => setState((state) => ({ guesses: [...state.guesses, guess] })),
  setHint: (hint) => setState(() => ({hint: hint})),
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
      hint: ""
    })),
  setWin: (win: boolean) => setState(() => ({ win: win, playing: false })),
}));

export default useHangManStore;
