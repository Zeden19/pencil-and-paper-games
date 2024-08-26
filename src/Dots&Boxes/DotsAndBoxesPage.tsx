import GamePages from "../GamePages.tsx";
import useDotsAndBoxes from "./stores.ts";
import DotsAndBoxesGrid from "./DotsAndBoxesGrid.tsx";
import capitalize from "../helpers/capitalize.ts";

function DotsAndBoxesPage() {
  const { playing, startGame, turn } = useDotsAndBoxes();
  return (
    <GamePages
      title={"Dots And Boxes"}
      startFunction={startGame}
      playing={playing}
      helpModalId={"dotsandboxes"}
      helpModalDescription={"dotsandboxes"}
    >
      {capitalize(turn)} Turn
      <DotsAndBoxesGrid />
    </GamePages>
  );
}

export default DotsAndBoxesPage;
