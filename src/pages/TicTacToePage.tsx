import TicTacToeGrid from "../TicTacToe/TicTacToeGrid.tsx";
import useTicTacToeStore from "../TicTacToe/store.ts";

//todo: make board taller
// todo: if needed, make board width smaller on large devices
function TicTacToePage() {
  const playing = useTicTacToeStore((state) => state.playing);
  const setPlaying = useTicTacToeStore((state) => state.setPlaying);
  const setVsCpu = useTicTacToeStore((state) => state.setVsCpu);
  const vsCpu = useTicTacToeStore((state) => state.vsCpu);
  const reset = useTicTacToeStore(state => state.reset);

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>TicTacToe</h2>

      <p>
        {vsCpu ? "Player" : "Player 1"}: X | {vsCpu ? " Cpu" : " Player 2"}: O
      </p>
      <TicTacToeGrid/>

      <button
        onClick={() => playing ? reset() : setPlaying()}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {playing ? "Reset" : "Play"}
      </button>

      <button
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
