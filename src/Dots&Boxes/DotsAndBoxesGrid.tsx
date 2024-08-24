import useDotsAndBoxes from "./stores.ts";
function DotsAndBoxesGrid() {
  const { grid } = useDotsAndBoxes();
  return (
    <div style={{maxWidth: "1000px"}} className={"container text-center"}>
      <div className={"row row-cols-6"}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div style={{ height: "125px" }}
                 className={"col"}
                 key={rowIndex.toString() + " " + colIndex.toString()}
            >
              <svg viewBox="0 0 80 80" width="25" height="25">
                <circle className="circle" cx="40" cy="40" r="38" />
              </svg>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default DotsAndBoxesGrid;
