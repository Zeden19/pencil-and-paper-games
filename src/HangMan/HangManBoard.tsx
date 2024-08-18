import { words } from "./words.ts";
import useHangManStore from "./store.ts";
import styles from "./styles.module.css";

function HangManBoard() {
  const { playing, win, startGame, word, guesses, setWin, setGuesses, incorrectGuesses } =
    useHangManStore();

  return (
    <div>
      <div className={"container-sm d-flex gap-2 align-items-center justify-content-center"}>
        <svg height="250" width="200" className={styles.figureContainer}>
          <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" />

          {/*Head*/}
          {incorrectGuesses >= 1 && (
            <circle cx="140" cy="70" r="20" className={styles.figurePart} />
          )}

          {/*Body*/}
          {incorrectGuesses >= 2 && (
            <line x1="140" y1="90" x2="140" y2="150" className={styles.figurePart} />
          )}

          {/*Arms*/}
          {incorrectGuesses >= 3 && (
            <line x1="140" y1="120" x2="120" y2="100" className={styles.figurePart} />
          )}
          {incorrectGuesses >= 3 && (
            <line x1="140" y1="120" x2="160" y2="100" className={styles.figurePart} />
          )}

          {/*Legs*/}
          {incorrectGuesses >= 4 && (
            <line x1="140" y1="150" x2="120" y2="180" className={styles.figurePart} />
          )}
          {incorrectGuesses >= 5 && (
            <line x1="140" y1="150" x2="160" y2="180" className={styles.figurePart} />
          )}
        </svg>

        {word.split("").map((char) => <div>_</div>)}
      </div>

      <div className={"h4"}>Guessed Letters:</div>
    </div>
  );
}

export default HangManBoard;
