import TicTacToeGrid from "./TicTacToeGrid.tsx";
import useTicTacToeStore from "./store.ts";
import GamePages from "../GamePages.tsx";
import { useEffect } from "react";

function TicTacToePage() {
  const { playing, startGame, setVsCpu, vsCpu, cleanUp, winner, turn } = useTicTacToeStore();
  
  console.log("re-rendered");

  return (
    <GamePages
      title={"TicTacToe"}
      startFunction={() => (startGame())}
      cleanUpFunction={cleanUp}
      aboveHelpButtons={
        <button
          disabled={playing}
          onClick={() => setVsCpu()}
          className={"btn btn-primary d-block my-2 px-4 m-auto"}>
          {vsCpu ? "Vs CPU" : "Vs Player"}
        </button>
      }
      playing={playing}
      helpModalId={"tictactoe"}
      helpModalDescription={
        "In this 2 player game, each player places their token (X or O) on the grid. " +
        "If a player gets 3 tokens in a row (horizontal, diagonal or vertical) they win. \n\n" +
        "As simple as that!"
      }>
      <p>
        {vsCpu ? "Player" : "Player 1"}: X | {vsCpu ? " Cpu" : " Player 2"}: O
      </p>

      <p className={"h4"}>
        {playing
          ? turn.toUpperCase() + " Turn"
          : winner
            ? winner.toUpperCase() + " Wins!"
            : "Click Start to Play"}
      </p>

      <TicTacToeGrid />
    </GamePages>
  );
}

export default TicTacToePage;
