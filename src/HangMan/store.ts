import { create } from "zustand";

interface HangManStore {
  playing: boolean;
  incorrectGuesses: number;
  guesses: string[];
  win: boolean;
  word: string;
  wordPuzzle: string[];

  setIncorrectGuesses: (incorrectGuesses: number) => void;
  setGuesses: (guess: string) => void;
  setWordPuzzle: (index: number) => void;
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
  setWordPuzzle: (charIndex) =>
    setState((state) => ({
      wordPuzzle: state.wordPuzzle.map((char, index) =>
        charIndex === index ? state.word.charAt(index) : char,
      ),
    })),
  startGame: (word) =>
    setState(() => ({
      win: false,
      playing: true,
      guesses: [],
      word: word,
      wordPuzzle: word.split("").map(() => "_"),
      incorrectGuesses: 0
    })),
  setWin: (win: boolean) => setState(() => ({ win: win, playing: false })),
}));

export default useHangManStore;
