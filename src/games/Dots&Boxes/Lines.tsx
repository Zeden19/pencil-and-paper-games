import styles from "./styles.module.css";
import { Cell } from "./Grid.ts";

interface Props {
  xCord: number;
  yCord: number;
  radius: number;
  cell: Cell;
}

function Lines({ xCord, radius, yCord, cell }: Props) {
  const top = 100;
  const bottom = 0;
  return (
    <>
      {cell.right?.drawn && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord + radius}
          x2={top}
          y1={yCord}
          y2={yCord}
        />
      )}

      {cell.left?.drawn && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord - radius}
          x2={bottom}
          y1={yCord}
          y2={yCord}
        />
      )}

      {cell.bottom?.drawn && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord}
          x2={xCord}
          y1={yCord + radius}
          y2={top}
        />
      )}

      {cell.top?.drawn && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord}
          x2={xCord}
          y1={bottom}
          y2={yCord - radius}
        />
      )}
    </>
  );
}

export default Lines;
