import GamePages from "../GamePages.tsx";
import Connect4Grid from "./Connect4Grid.tsx";
import useConnect4Store from "./stores.ts";

function Connect4Page() {
  const { playing, startGame, turn, winner } = useConnect4Store();

  return (
    <GamePages
      playing={playing}
      title={"Connect 4"}
      startFunction={() => {
        startGame();
      }}
      helpModalId={"connect4"}
      helpModalDescription={<p>On each players turn, a player can drop their token into one of the columns.
        If a player has 4 in a row <b>horizontally</b>, <b>diagonally</b> or <b>vertically</b> they win! If the entire board if filled up
        the game ends in a draw.</p>}
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
