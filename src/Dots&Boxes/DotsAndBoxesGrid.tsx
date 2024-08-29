import useDotsAndBoxes from "./stores.ts";
import styles from "./styles.module.css";
import Cell from "./Cell.tsx";
import classNames from "classnames/bind";

function DotsAndBoxesGrid() {
  const { grid } = useDotsAndBoxes();
  const cx = classNames.bind(styles);
  return (
    <div style={{ maxWidth: "900px" }} className={"container text-center"}>
      <div className={"row row-cols-6"}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              style={{ height: "110px" }}
              className={cx({
                "col p-0": true,
              })}
              key={row + " " + colIndex}
            >
              <Cell cell={cell} rowIndex={rowIndex} colIndex={colIndex} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default DotsAndBoxesGrid;
