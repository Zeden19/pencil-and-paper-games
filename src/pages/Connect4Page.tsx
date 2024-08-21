import GamePages from "../GamePages.tsx";
import Connect4Grid from "../Connect4/Connect4Grid.tsx";
import useConnect4Store from "../Connect4/stores.ts";

function Connect4Page() {
  const {playing, startGame} = useConnect4Store();
  
  return (
    <GamePages
      playing={playing}
      title={"Connect 4"}
      startFunction={() => {
        startGame();
      }}
    >
      Red or Yellow Turn
      <Connect4Grid />
    </GamePages>
  );
}

export default Connect4Page;