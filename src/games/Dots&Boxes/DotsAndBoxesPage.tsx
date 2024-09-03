import GamePages from "../GamePages.tsx";
import useDotsAndBoxes from "./stores.ts";
import DotsAndBoxesGrid from "./DotsAndBoxesGrid.tsx";
import capitalize from "../../services/capitalize.ts";

function DotsAndBoxesPage() {
  const { playing, startGame, turn, scores, winner } = useDotsAndBoxes();
  return (
    <>
      <GamePages
        title={"Dots And Boxes"}
        startFunction={startGame}
        playing={playing}
        helpModalId={"dotsandboxes"}
        helpModalDescription={
          <p>
            During a players turn, they draw one line horizontally or vertically from one dot to
            another. If a player completes a box on their turn, they get a point <b>and</b> they get
            another turn. {"\n\n"}
            Once all possible lines are drawn, the player with the most points wins!
          </p>
        }>
        <div>{"Red: " + scores.red + " Blue: " + scores.blue}</div>
        <p className={'mb-0'}>
          {playing
            ? capitalize(turn) + " Turn"
            : winner
              ? capitalize(winner) + " Wins!"
              : "Click Start to Play"}
        </p>
        <DotsAndBoxesGrid />
      </GamePages>
    </>
  );
}

export default DotsAndBoxesPage;
