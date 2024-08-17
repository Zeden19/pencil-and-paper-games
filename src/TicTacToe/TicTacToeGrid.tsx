import useTicTacToeStore from "./store.ts";
import thickO from "../assets/thickO.png";
import thickX from "../assets/thickX.png";

function TicTacToeGrid() {
  const { board, handleTileClick, playing, turn, setTurn, setWinner } =
    useTicTacToeStore();

  const isWinner = (indexDown: number, indexRight: number) => {
    const newBoard = useTicTacToeStore.getState().board; // getting the new state

    // check right
    if (
      newBoard[indexDown][0] === newBoard[indexDown][1] &&
      newBoard[indexDown][1] === newBoard[indexDown][2]
    ) {
      newBoard[indexDown][0] = "w" + newBoard[indexDown][0];
      newBoard[indexDown][1] = "w" + newBoard[indexDown][1];
      newBoard[indexDown][2] = "w" + newBoard[indexDown][2];
      setWinner(turn, newBoard);
      return true;
    }
    // check down
    if (
      newBoard[0][indexRight] === newBoard[1][indexRight] &&
      newBoard[1][indexRight] === newBoard[2][indexRight]
    ) {
      newBoard[0][indexRight] = "w" + newBoard[0][indexRight];
      newBoard[1][indexRight] = "w" + newBoard[1][indexRight];
      newBoard[2][indexRight] = "w" + newBoard[2][indexRight];
      setWinner(turn, newBoard);
      return true;
    }

    // check diagonal top left
    if (
      newBoard[0][0] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][2] &&
      newBoard[0][0] !== ""
    ) {
      newBoard[0][0] = "w" + newBoard[0][0];
      newBoard[1][1] = "w" + newBoard[1][1];
      newBoard[2][2] = "w" + newBoard[2][2];
      setWinner(turn, newBoard);
      return true;
    }

    // check diagonal top right
    if (
      newBoard[0][2] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][0] &&
      newBoard[0][2] !== ""
    ) {
      newBoard[0][2] = "w" + newBoard[0][2];
      newBoard[1][1] = "w" + newBoard[1][1];
      newBoard[2][0] = "w" + newBoard[2][0];
      setWinner(turn, newBoard);
      return true;
    }

    // check no winner
    if (!newBoard.some((row) => row.some((tile) => tile === ""))) {
      setWinner("Nobody", newBoard);
      return true;
    }
    return false;
  };

  const getClassName = (indexDown: number, indexRight: number) => {
    if (
      (indexRight === 0 && indexDown === 0) ||
      (indexRight === 1 && indexDown === 0) ||
      (indexRight === 0 && indexDown === 1) ||
      (indexRight === 1 && indexDown === 1)
    ) {
      return "h-25 border border-top-0 border-start-0 border-3 border-black h-100";
    }

    if (
      (indexRight === 2 && indexDown === 0) ||
      (indexRight === 2 && indexDown === 1)
    ) {
      return "border-bottom border-3 border-black";
    }

    if (
      (indexRight === 0 && indexDown === 2) ||
      (indexRight === 1 && indexDown === 2)
    ) {
      return "border-end border-3 border-black";
    }

    return ""; // Default case, no additional border styles
  };

  function handleClick(indexDown: number, indexRight: number) {
    if (!playing) return;
    if (board[indexDown][indexRight] !== "") return;
    handleTileClick(indexDown, indexRight);
    isWinner(indexDown, indexRight);
    setTurn();
  }

  return (
    <div style={{ maxWidth: "800px" }} className={"container wm py-2 px-5"}>
      <div className="row row-cols-3">
        {board.map((row, indexDown) =>
          row.map((title, indexRight) => (
            <div
              onClick={() => {
                handleClick(indexDown, indexRight);
              }}
              className={getClassName(indexDown, indexRight)}
              key={indexRight.toString() + " " + indexDown.toString()}
            >
              <div
                style={{ cursor: "default" }}
                className={"display-1 fw-bolder"}
              >
                {title ? (
                  title.includes("w") ? (
                    <div className={"text-success"}>{title.toUpperCase().charAt(1)}</div>
                  ) : (
                    title.toUpperCase()
                  )
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default TicTacToeGrid;
