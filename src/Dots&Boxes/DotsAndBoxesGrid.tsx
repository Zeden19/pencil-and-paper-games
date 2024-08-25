import useDotsAndBoxes from "./stores.ts";
import styles from "./styles.module.css";

function DotsAndBoxesGrid() {
  const { grid } = useDotsAndBoxes();
  return (
    <div style={{ maxWidth: "900px" }} className={"container text-center"}>
      <div className={"row row-cols-6"}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              style={{ height: "115px" }}
              className={`col ${rowIndex === 4 && styles.heightSmall} ${rowIndex === 0 && "mt-4"}`}
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
