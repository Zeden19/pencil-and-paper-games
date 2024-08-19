import useHangManStore from "./store.ts";
import styles from "./styles.module.css";
import React, { useEffect } from "react";
import VirtualKeyboardGrid from "./VirtualKeyboardGrid.tsx";

function HangManBoard() {
  const {
    word,
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

  return (
    <div>
      {incorrectGuesses >= 6 && (
        <div className={"text-danger"}>
          You loose. Word was: <b>{word}</b>
        </div>
      )}
      {win && wordPuzzle.length !== 0 && <div className={"text-success"}>You Win!</div>}

      <div className={"d-flex text-center align-items-center justify-content-center"}>
        <svg width={"11rem"} height={"15rem"} className={styles.figureContainer}>
          {/*Scaffolding*/}
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

        <div className={"d-flex flex-column align-items-start gap-3"}>
          <div>
            {wordPuzzle.map((char, index) => (
              <div className={"text-decoration-underline d-inline-block me-2"} key={index}>
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Bottom buttons*/}
      <div style={{ maxWidth: "600px" }} className={"container-fluid text-center mb-3"}>
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

        <div className={"row mt-3"}>
          <VirtualKeyboardGrid />
        </div>
      </div>
    </div>
  );
}

export default HangManBoard;
