import { useState } from "react";


//todo: make board taller
// todo: if needed, make board width smaller on large devices
// todo: make the board a component
function TicTacToePage() {
  const [board, setBoard] = useState([
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);

  function renderBoard(indexRow: number, index: number, title: string) {
    console.log(index, indexRow);
    const key = indexRow.toString() + " " + index.toString();

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
        >
          {key}
        </div>
      );

    if ((indexRow === 2 && index === 0) || (indexRow === 2 && index === 1)) {
      return (
        <div key={key} className={"border-bottom border-3 border-black"}>
          {key}
        </div>
      );
    }

    if ((indexRow === 0 && index === 2) || (indexRow === 1 && index === 2))
      return (
        <div key={key} className={"border-end border-3 border-black"}>
          {key}
        </div>
      );

    return <div key={key}>{key}</div>;
  }

  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 py-4"}>TicTacToe</h2>

      <div className={"container-fluid py-2 px-5"}>
        <div className="row row-cols-3">
          {board.map((row, indexRow) =>
            row.map((tile, index) => renderBoard(index, indexRow, tile)),
          )}
        </div>
      </div>
        <button className={"btn btn-primary d-block my-2 px-4 m-auto"}>Play</button>
        <button className={"btn btn-primary d-block px-4 m-auto"}>Help</button>
    </div>
  );
}

export default TicTacToePage;
