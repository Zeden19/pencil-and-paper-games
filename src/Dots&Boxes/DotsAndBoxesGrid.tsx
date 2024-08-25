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
              style={{ height: "115px" }}
              className={cx({ col: true, heightSmall: rowIndex === 4, "mt-4": rowIndex === 0 })}
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
