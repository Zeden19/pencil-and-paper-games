import HangManBoard from "../HangMan/HangManBoard.tsx";
import useHangManStore from "../HangMan/store.ts";
import { words } from "../HangMan/words.ts";
import GamePages from "../GamePages.tsx";

function HangmanPage() {
  // noinspection JSUnusedLocalSymbols
  const { playing, startGame } = useHangManStore();

  function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  return (
    <GamePages title={"Hangman"} startFunction={() => startGame(getWord())} playing={playing}>
      <HangManBoard />
    </GamePages>
  );
}

export default HangmanPage;
