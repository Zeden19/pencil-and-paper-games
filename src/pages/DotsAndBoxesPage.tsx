import GamePages from "../GamePages.tsx";
import useDotsAndBoxes from "../Dots&Boxes/stores.ts";
import DotsAndBoxesGrid from "../Dots&Boxes/DotsAndBoxesGrid.tsx";

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
