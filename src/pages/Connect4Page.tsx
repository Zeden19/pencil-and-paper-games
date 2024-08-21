import GamePages from "../GamePages.tsx";
import Connect4Grid from "../Connect4/Connect4Grid.tsx";
import useConnect4Store from "../Connect4/stores.ts";

function Connect4Page() {
  const { playing, startGame, turn, winner } = useConnect4Store();

  return (
    <GamePages
      playing={playing}
      title={"Connect 4"}
      startFunction={() => {
        startGame();
      }}
    >
      {playing && <div className={"mb-2"}>{turn.charAt(0).toUpperCase() + turn.slice(1)} Turn</div>}
      {winner && (
        <div className={"mb-2"}>{winner.charAt(0).toUpperCase() + winner.slice(1)} Wins!</div>
      )}
      <Connect4Grid />
    </GamePages>
  );
}

export default Connect4Page;
