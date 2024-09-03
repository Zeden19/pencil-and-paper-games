import useDotsAndBoxes from "./stores.ts";
import Cell from "./Cell.tsx";

function DotsAndBoxesGrid() {
  const { grid } = useDotsAndBoxes();
  return (
    <div style={{ maxWidth: "750px" }} className={"container text-center"}>
      <div className={"row row-cols-6"}>
        {grid.cellGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => <Cell cell={cell} rowIndex={rowIndex} colIndex={colIndex} />),
        )}
      </div>
    </div>
  );
}

export default DotsAndBoxesGrid;
