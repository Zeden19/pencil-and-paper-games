import TicTacToeGrid from "../TicTacToe/TicTacToeGrid.tsx";
import useTicTacToeStore from "../TicTacToe/store.ts";
import GamePages from "../GamePages.tsx";

function TicTacToePage() {
  const playing = useTicTacToeStore((state) => state.playing);
  const setPlaying = useTicTacToeStore((state) => state.setPlaying);
  const setVsCpu = useTicTacToeStore((state) => state.setVsCpu);
  const vsCpu = useTicTacToeStore((state) => state.vsCpu);
  const reset = useTicTacToeStore((state) => state.reset);
  const winner = useTicTacToeStore((state) => state.winner);
  const turn = useTicTacToeStore((state) => state.turn);

  return (
    <GamePages
      title={"TicTacToe"}
      startFunction={() => (playing ? reset() : setPlaying())}
      aboveHelpButtons={
        <button
          disabled={playing}
          onClick={() => setVsCpu()}
          className={"btn btn-primary d-block my-2 px-4 m-auto"}
        >
          {vsCpu ? "Vs CPU" : "Vs Player"}
        </button>
      }
      playing={playing}
    >
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
    </GamePages>
  );
}

export default TicTacToePage;
