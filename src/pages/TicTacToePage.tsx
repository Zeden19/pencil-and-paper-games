import { useState } from "react";
import TicTacToeGrid from "../TicTacToeGrid.tsx";

//todo: make board taller
// todo: if needed, make board width smaller on large devices
// todo: use zustland to prevent prop drilling
function TicTacToePage() {
  const [board, setBoard] = useState([
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);
  const [vsCpu, setVsCpu] = useState(true);
  const [turn, setTurn] = useState<"x" | "o">("x");
  const [playing, setPlaying] = useState(false);

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>TicTacToe</h2>

      <p>
        {vsCpu ? "Player" : "Player 1"}: X |{vsCpu ? " Cpu" : " Player 2"}: O
      </p>
      <TicTacToeGrid
        handleTileClick={(indexRow, index) => {
          if (!playing) return;
          
          // for some reason the way the 2d array gets referenced is flipped
          if (board[index][indexRow] !== "empty") return;

          setBoard(
            board.map((column, rowIndex) =>
              rowIndex === index
                ? column.map((tile, tileIndex) =>
                    tileIndex === indexRow ? turn : tile,
                  )
                : column,
            ),
          );
          setTurn(turn === "x" ? "o" : "x");
        }}
        turn={turn}
        board={board}
      />

      <button
        onClick={() => setPlaying(true)}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {playing ? "Reset" : "Play"}
      </button>

      <button
        onClick={() => setVsCpu(!vsCpu)}
        className={"btn btn-primary d-block my-2 px-4 m-auto"}
      >
        {vsCpu ? "Vs CPU" : "Vs Player"}
      </button>

      <button className={"btn btn-primary d-block px-4 m-auto"}>Help</button>
    </div>
  );
}

export default TicTacToePage;
