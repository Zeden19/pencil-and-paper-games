import HangManBoard from "../HangMan/HangManBoard.tsx";
import useHangManStore from "../HangMan/store.ts";

function HangmanPage() {
  const { playing, win, startGame, word, guesses, setWin, setGuesses } =
    useHangManStore();

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>TicTacToe</h2>
      <HangManBoard />
      <button className={"btn btn-primary d-block my-2 px-4 m-auto"}>
        {playing ? "Reset" : "Play"}
      </button>
      <button className={"btn btn-primary"}>Help</button>
    </div>
  );
}

export default HangmanPage;
