import useTicTacToeStore from "./store.ts";

function TicTacToeGrid() {
  const { board, handleTileClick, playing, turn, setTurn, setWinner } = useTicTacToeStore();

  const isWinner = (indexDown: number, indexRight: number) => {
    const newBoard = useTicTacToeStore.getState().board; // getting the new state
    const markWinner = (indices: [number[], number[], number[]]) => {
      indices.forEach((i) => (newBoard[i[0]][i[1]] = "w" + newBoard[i[0]][i[1]]));
      setWinner(turn, newBoard);
      return true;
    };

    // Check row
    if (newBoard[indexDown].every((cell) => cell === newBoard[indexDown][0] && cell !== "")) {
      return markWinner([
        [indexDown, 0],
        [indexDown, 1],
        [indexDown, 2],
      ]);
    }

    // Check column
    if (
      newBoard.every((row) => row[indexRight] === newBoard[0][indexRight] && row[indexRight] !== "")
    ) {
      return markWinner([
        [0, indexRight],
        [1, indexRight],
        [2, indexRight],
      ]);
    }

    // Check diagonal top-left to bottom-right
    if (
      newBoard[0][0] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][2] &&
      newBoard[0][0] !== ""
    ) {
      return markWinner([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    }

    // Check diagonal top-right to bottom-left
    if (
      newBoard[0][2] === newBoard[1][1] &&
      newBoard[1][1] === newBoard[2][0] &&
      newBoard[0][2] !== ""
    ) {
      return markWinner([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
    }

    // Check for a draw
    if (!newBoard.flat().includes("")) {
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

    if ((indexRight === 2 && indexDown === 0) || (indexRight === 2 && indexDown === 1)) {
      return "border-bottom border-3 border-black";
    }

    if ((indexRight === 0 && indexDown === 2) || (indexRight === 1 && indexDown === 2)) {
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
              <div style={{ cursor: "default" }} className={"display-1 fw-bolder"}>
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
