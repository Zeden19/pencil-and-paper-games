import useHangManStore from "./store.ts";
import React from "react";

interface Props {
  letterKey: string;
}

function VirtualKeys({ letterKey }: Props) {
  const {
    guesses,
    setGuesses,
    word,
    incorrectGuesses,
    setIncorrectGuesses,
    wordPuzzle,
    setWordPuzzle,
    playing,
    setWin
  } = useHangManStore();
  
  const key = letterKey.toLowerCase();
  const guessLetters = guesses.map((guess) => guess.letter);
  const isKeyGuessed = guessLetters.includes(key);
  const isKeyGuessedCorrect = guesses[guessLetters.indexOf(key)]?.correct;

  function defineBorder() {
    if (isKeyGuessed && isKeyGuessedCorrect) return "border-success";
    if (isKeyGuessed && !isKeyGuessedCorrect) return "border-danger";
    return "border-black";
  }

  function guessLetter() {
    if (key === "") return;
    if (key.length > 1) return;
    if (guesses.map((guess) => guess.letter).includes(key)) return;

    // check position of guessed letter
    let findLetterIndex = word.indexOf(key);

    //incorrect guess; increment incorrectGuesses by 1
    if (findLetterIndex === -1) {
      setIncorrectGuesses(incorrectGuesses + 1);
      setGuesses({ letter: key, correct: false });
      if (incorrectGuesses + 1 >= 6) setWin(false);
      return;
    }
    let newWordPuzzle = wordPuzzle;

    // find each time the guess occurred
    while (findLetterIndex !== -1) {
      newWordPuzzle = newWordPuzzle.map((char, index) =>
        findLetterIndex === index ? word.charAt(index) : char,
      );
      setWordPuzzle(newWordPuzzle);
      findLetterIndex = word.indexOf(key, findLetterIndex + 1);
    }
    setGuesses({ letter: key, correct: true });
    
    if (!newWordPuzzle.includes("_")) setWin(true);
  }

  return (
    <button
      disabled={isKeyGuessed || !playing}
      className={
        "btn bg-body-secondary m-1 col-1 px-0 py-1 border-2 rounded-1 d-inline-block " + defineBorder()
      }
      onClick={guessLetter}
    >
      {letterKey}
    </button>
  );
}

export default VirtualKeys;
