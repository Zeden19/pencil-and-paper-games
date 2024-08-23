import HangManBoard from "../HangMan/HangManBoard.tsx";
import useHangManStore from "../HangMan/store.ts";
import { words } from "../HangMan/words.ts";
import GamePages from "../GamePages.tsx";

function HangmanPage() {
  const { playing, startGame } = useHangManStore();

  function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  return (
    <GamePages
      title={"Hangman"}
      startFunction={() => startGame(getWord())}
      playing={playing}
      helpModalId={"hangman"}
      helpModalDescription={
        <p>
          The series of dashes represent the word you are trying to guess. You can guess a letter by
          clicking on any letter on the <b>virtual keyboard</b>. If you guess right the letters will
          be placed where they are in the word. If the guess is wrong, a part will be added to
          hangman. If the hangman is complete, you{" "}
          <div className={"text-danger d-inline-block"}>lose</div>! If you complete the word before
          the hangman is completed you <div className={"text-success d-inline-block"}>win!</div>{" "}
          {"\n\n"} You can also guess the entire word, which will result in a{" "}
          <div className={"text-success d-inline-block"}>instant win</div>{" "}
          or a part <div className={"text-danger d-inline-block"}>being added</div> to hangman.
          {"\n\n"} Good luck!
        </p>
      }
    >
      <HangManBoard />
    </GamePages>
  );
}

export default HangmanPage;
