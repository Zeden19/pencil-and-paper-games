import GamePages from "../GamePages.tsx";
import useDotsAndBoxes from "./stores.ts";
import DotsAndBoxesGrid from "./DotsAndBoxesGrid.tsx";

function DotsAndBoxesPage() {
  const { playing, startGame } = useDotsAndBoxes();
  return (
    <GamePages
      title={"Dots And Boxes"}
      startFunction={startGame}
      playing={playing}
      helpModalId={"dotsandboxes"}
      helpModalDescription={"dotsandboxes"}
    >
      <DotsAndBoxesGrid />
    </GamePages>
  );
}

export default DotsAndBoxesPage;
