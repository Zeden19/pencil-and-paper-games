import HangManBoard from "../HangMan/HangManBoard.tsx";
import useHangManStore from "../HangMan/store.ts";
import { words } from "../HangMan/words.ts";

function HangmanPage() {
  // noinspection JSUnusedLocalSymbols
  const { playing, startGame } = useHangManStore();

  function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>HangMan</h2>
      <HangManBoard />

      <button
        onClick={() => startGame(getWord())}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {playing ? "Reset" : "Play"}
      </button>
      <button className={"btn btn-primary"}>Help</button>
    </div>
  );
}

export default HangmanPage;
