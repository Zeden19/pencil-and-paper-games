import GamePages from "../GamePages.tsx";
import Connect4Grid from "../Connect4/Connect4Grid.tsx";

function Connect4Page() {
  return (
    <GamePages playing={true} title={"Connect 4"} startFunction={() => ''}>
      Red or Yellow Turn
      <Connect4Grid/>
      
    </GamePages>
  )
}

export default Connect4Page;