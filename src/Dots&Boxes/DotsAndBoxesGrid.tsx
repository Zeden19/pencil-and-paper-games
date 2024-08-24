import useDotsAndBoxes from "./stores.ts";

function DotsAndBoxesGrid() {
  const { grid } = useDotsAndBoxes();
  return (
    <div style={{ maxWidth: "800px" }} className={"container text-center h-50"}>
      <div className={"row row-cols-5"}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              className={"col align-content-center border border-3 border-black"}
              style={{ height: "100px" }}
              key={rowIndex.toString() + " " + colIndex.toString()}
            >
              box
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default DotsAndBoxesGrid;
