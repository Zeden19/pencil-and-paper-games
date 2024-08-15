import useTicTacToeStore from "./store.ts";

function TicTacToeGrid() {
  const {
    board,
    handleTileClick,
    playing,
    turn,
    setTurn,
    setPlaying,
    setWinner,
  } = useTicTacToeStore();

  const isWinner = (indexDown: number, indexRight: number) => {
    const newBoard = useTicTacToeStore.getState().board; // getting the new state

    // check right
    if (
      newBoard[indexDown][0] === newBoard[indexDown][1] &&
      newBoard[indexDown][1] === newBoard[indexDown][2]
    ) {
      setWinner(turn);
      return true;
    }
    // check down
    if (
      newBoard[0][indexRight] === newBoard[1][indexRight] &&
      newBoard[1][indexRight] === newBoard[2][indexRight]
    ) {
      setWinner(turn);
      return true;
    }

    // check diagonal top left
    if (
      newBoard[0][0] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][2] &&
      newBoard[0][0] !== "empty"
    ) {
      setWinner(turn);
      return true;
    }

    // check diagonal top right (i feel guilty hard coding it, but realistically it's the simplest solution)
    if (
      newBoard[0][2] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][0] &&
      newBoard[0][2] !== "empty"
    ) {
      setWinner(turn);
      return true;
    }

    // check no winner
    if (!newBoard.some((row) => row.some((tile) => tile === "empty"))) {
      setWinner("Nobody");
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
      return "h-25 border border-top-0 border-start-0 border-3 border-black";
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

  return (
    <>
      <div className={"container-fluid py-2 px-5"}>
        <div className="row row-cols-3">
          {board.map((row, indexDown) =>
            row.map((title, indexRight) => (
              <div
                onClick={() => {
                  if (!playing) return;
                  if (board[indexDown][indexRight] !== "empty") return;
                  handleTileClick(indexDown, indexRight);
                  isWinner(indexDown, indexRight)
                  setTurn();
                }}
                className={getClassName(indexDown, indexRight)}
                key={indexRight.toString() + " " + indexDown.toString()}
              >
                {title}
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default TicTacToeGrid;
