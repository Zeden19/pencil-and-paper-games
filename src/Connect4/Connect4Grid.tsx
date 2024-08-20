import useConnect4Store from "./stores.ts";
import styles from "./styles.module.css";

function Connect4Grid() {
  const { grid } = useConnect4Store();
  return (
    <div style={{ maxWidth: "800px" }} className={"container text-center bg-primary rounded g-4"}>
      <div className={"row " + styles.rowCols7}>
        {grid.map((down, downIndex) =>
          down.map((right, rightIndex) => (
            <div
              key={downIndex.toString() + " " + rightIndex.toString()}
              className={"col py-2 px-md-3 px-1"}
            >
              <div className={"rounded-circle bg-white py-2 py-md-4 border border-2 border-black"}>
                {downIndex} {rightIndex}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default Connect4Grid;
