interface Props {
  board: string[][];
  turn: "x" | "o";
  handleTileClick: (indexRow: number, index: number) => void;
}

function TicTacToeGrid({ board, turn, handleTileClick }: Props) {
  function renderBoard(indexRow: number, index: number, title: string) {
    const key = indexRow.toString() + " " + index.toString();
    const onClick = () => handleTileClick(indexRow, index);
    

    if (
      (indexRow === 0 && index === 0) ||
      (indexRow === 1 && index === 0) ||
      (indexRow === 0 && index === 1) ||
      (indexRow === 1 && index === 1)
    )
      return (
        <div
          key={key}
          className={
            "h-25 border border-top-0 border-start-0 border-3 border-black"
          }
          onClick={onClick}
        >
          {title} {key}
        </div>
      );

    if ((indexRow === 2 && index === 0) || (indexRow === 2 && index === 1)) {
      return (
        <div
          key={key}
          className={"border-bottom border-3 border-black"}
          onClick={onClick}
        >
          {title} {key}
        </div>
      );
    }

    if ((indexRow === 0 && index === 2) || (indexRow === 1 && index === 2))
      return (
        <div
          onClick={onClick}
          key={key}
          className={"border-end border-3 border-black"}
        >
          {title} {key}
        </div>
      );

    return (
      <div onClick={onClick} key={key}>
        {title} {key}
      </div>
    );
  }

  return (
    <>
      <div className={"container-fluid py-2 px-5"}>
        <div className="row row-cols-3">
          {board.map((row, indexRow) =>
            row.map((tile, index) => renderBoard(index, indexRow, tile)),
          )}
        </div>
      </div>
    </>
  );
}

export default TicTacToeGrid;
