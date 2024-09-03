import HangManBoard from "./HangManBoard.tsx";
import useHangManStore from "./store.ts";
import { words } from "./words.ts";
import GamePages from "../GamePages.tsx";
import axios from "axios";
import React from "react";

function HangmanPage() {
  const { playing, startGame, word, hint, setHint, incorrectGuesses, win, wordPuzzle } =
    useHangManStore();

  function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function getHint() {
    if (hint) return;
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => setHint(res.data[0].meanings[0].definitions[0].definition));
  }

  return (
    <GamePages
      title={"Hangman"}
      startFunction={() => startGame(getWord())}
      playing={playing}
      helpModalId={"hangman"}
      helpModalDescription={
        <div>
          The series of dashes represent the word you are trying to guess. You can guess a letter by
          clicking on any letter on the <b>virtual keyboard</b>. If you guess right the letters will
          be placed where they are in the word. If the guess is wrong, a part will be added to
          hangman. If the hangman is complete, you{" "}
          <p className={"text-danger d-inline-block"}>lose</p>! If you complete the word before the
          hangman is completed you <p className={"text-success d-inline-block"}>win!</p> {"\n\n"}{" "}
          You can also guess the entire word, which will result in a{" "}
          <p className={"text-success d-inline-block"}>instant win</p>
          or a part <p className={"text-danger d-inline-block"}>being added</p>
          to hangman.
          {"\n\n"} Good luck!
        </div>
      }
      aboveHelpButtons={
        <button
          disabled={!playing || hint !== ""}
          onClick={getHint}
          className={"btn btn-primary d-block my-2 px-4 m-auto"}
        >
          Hint
        </button>
      }
    >
      {hint && hint}
      <div className={"text-danger"}>
        {incorrectGuesses >= 6 && (
          <div>
            You loose. Word was: <b>{word}</b>
          </div>
        )}
      </div>
      <div className={"text-success"}>{win && wordPuzzle.length !== 0 && "You Win!"}</div>
      <HangManBoard />
    </GamePages>
  );
}

export default HangmanPage;
