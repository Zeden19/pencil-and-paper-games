import TicTacToeGrid from "../TicTacToe/TicTacToeGrid.tsx";
import useTicTacToeStore from "../TicTacToe/store.ts";

function TicTacToePage() {
  const playing = useTicTacToeStore((state) => state.playing);
  const setPlaying = useTicTacToeStore((state) => state.setPlaying);
  const setVsCpu = useTicTacToeStore((state) => state.setVsCpu);
  const vsCpu = useTicTacToeStore((state) => state.vsCpu);
  const reset = useTicTacToeStore((state) => state.reset);
  const winner = useTicTacToeStore((state) => state.winner);
  const turn = useTicTacToeStore((state) => state.turn);

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>TicTacToe</h2>
      <p>
        {vsCpu ? "Player" : "Player 1"}: X | {vsCpu ? " Cpu" : " Player 2"}: O
      </p>

      <p className={"h4"}>
        {playing
          ? turn.toUpperCase() + " Turn"
          : winner
            ? winner.toUpperCase() + " Wins!"
            : "Click Start to Play"}
      </p>

      <TicTacToeGrid />

      <button
        onClick={() => (playing ? reset() : setPlaying())}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {playing ? "Reset" : "Play"}
      </button>

      <button
        disabled={playing}
        onClick={() => setVsCpu()}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {vsCpu ? "Vs CPU" : "Vs Player"}
      </button>

      <button className={"btn btn-primary d-block px-4 m-auto"}>Help</button>
    </div>
  );
}

export default TicTacToePage;
