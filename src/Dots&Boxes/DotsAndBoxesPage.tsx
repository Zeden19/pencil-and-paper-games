import GamePages from "../GamePages.tsx";
import useDotsAndBoxes from "./stores.ts";
import DotsAndBoxesGrid from "./DotsAndBoxesGrid.tsx";
import capitalize from "../helpers/capitalize.ts";

function DotsAndBoxesPage() {
  const { playing, startGame, turn, scores, winner } = useDotsAndBoxes();
  return (
    <>
      <GamePages
        title={"Dots And Boxes"}
        startFunction={startGame}
        playing={playing}
        helpModalId={"dotsandboxes"}
        helpModalDescription={"dotsandboxes"}
      >
        {winner && <div className={"mb-2"}>{capitalize(winner)} Wins!</div>}
        {<div>{"Red: " + scores.red + " Blue: " + scores.blue}</div>}
        {<div>{playing && capitalize(turn) + " Turn"}</div>}
        <DotsAndBoxesGrid />
      </GamePages>
    </>
  );
}

export default DotsAndBoxesPage;
