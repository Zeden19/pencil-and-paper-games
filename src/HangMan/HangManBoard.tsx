import useHangManStore from "./store.ts";
import styles from "./styles.module.css";
import React, { useEffect } from "react";

function HangManBoard() {
  const {
    word,
    guesses,
    setGuesses,
    incorrectGuesses,
    setIncorrectGuesses,
    wordPuzzle,
    setWordPuzzle,
    playing,
    setWin,
    win,
  } = useHangManStore();

  useEffect(() => {
    if (!wordPuzzle.includes("_")) setWin(true);
    else if (incorrectGuesses >= 6) setWin(false);
  }, [wordPuzzle, setWin, incorrectGuesses]);

  function guessLetter(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const guess = event.target.value.toLowerCase();

    if (guess === "") return;
    if (guess.length > 1) return;
    if (guesses.includes(guess)) return;
    setGuesses(guess);

    // check position of guessed letter
    let findLetterIndex = word.indexOf(guess);

    // no letter found; increment incorrectGuesses by 1
    if (findLetterIndex === -1) {
      setIncorrectGuesses(incorrectGuesses + 1);
      return;
    }

    // find each time the guess occurred
    while (findLetterIndex !== -1) {
      const newWordPuzzle = wordPuzzle.map((char, index) =>
        findLetterIndex === index ? word.charAt(index) : char,
      );
      setWordPuzzle(newWordPuzzle);
      findLetterIndex = word.indexOf(guess, findLetterIndex + 1);
    }
  }

  function guessFullWord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fullWordGuess = (form.elements[0] as HTMLInputElement).value
      .trimEnd()
      .trimStart()
      .toLowerCase();
    
    if (fullWordGuess === word) {
      setWordPuzzle(word.split(""));
      setWin(true);
      return;
    }
    setIncorrectGuesses(incorrectGuesses + 1);
  }

  //todo: refactor code, since everything uses the same layout of heading, 2 buttons
  //todo : add virtual keyboard
  return (
    <div>
      {incorrectGuesses >= 6 && (
        <div className={"text-danger"}>
          You loose. Word was: <b>{word}</b>
        </div>
      )}
      {win && <div className={"text-success"}>You Win!</div>}
      <div className={"container-sm d-flex gap-2 align-items-center justify-content-center"}>
        <svg height="250" width="200" className={styles.figureContainer}>
          <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" />

          {/*Head*/}
          {incorrectGuesses >= 1 && <circle cx="140" cy="70" r="20" />}

          {/*Body*/}
          {incorrectGuesses >= 2 && <line x1="140" y1="90" x2="140" y2="150" />}

          {/*Arms*/}
          {incorrectGuesses >= 3 && <line x1="140" y1="120" x2="120" y2="100" />}
          {incorrectGuesses >= 4 && <line x1="140" y1="120" x2="160" y2="100" />}

          {/*Legs*/}
          {incorrectGuesses >= 5 && <line x1="140" y1="150" x2="120" y2="180" />}
          {incorrectGuesses >= 6 && <line x1="140" y1="150" x2="160" y2="180" />}
        </svg>

        <div>
          <div className={"d-flex gap-2"}>
            {wordPuzzle.map((char, index) => (
              <div className={"text-decoration-underline"} key={index}>
                {char}
              </div>
            ))}
          </div>
          <div className={"h4"}>Guessed Letters: {guesses.map((guess) => guess + " ")}</div>
        </div>
      </div>

      <div style={{ maxWidth: "400px" }} className={"container-fluid text-center mb-3"}>
        <div className={"row"}>
          <label htmlFor="guessFullWord" className={"form-label col-auto"}>
            Guess Full Word:
          </label>
          <form className={"p-0"} onSubmit={(event) => guessFullWord(event)}>
            <input
              disabled={!playing}
              type={"text"}
              className={"form-control col-1"}
              id={"guessFullWord"}
            />
          </form>
        </div>

        <div className={"row"}>
          <label htmlFor="guessInput" className={"form-label col-auto"}>
            Guess Letter:
          </label>
          <input
            onChange={(event) => guessLetter(event)}
            disabled={!playing}
            type={"text"}
            className={"form-control m-auto col-1"}
            id={"guessInput"}
            maxLength={1}
          />
        </div>
      </div>
    </div>
  );
}

export default HangManBoard;
