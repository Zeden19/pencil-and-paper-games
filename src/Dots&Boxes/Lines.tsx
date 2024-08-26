import { Dot } from "./stores.ts";
import styles from "./styles.module.css";

interface Props {
  xCord: number;
  yCord: number;
  radius: number;
  cell: Dot;
}

function Lines({ xCord, radius, yCord, cell }: Props) {
  const top = 100;
  const bottom = 0;
  return (
    <>
      {cell.right?.line && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord + radius}
          x2={top}
          y1={yCord}
          y2={yCord}
        />
      )}

      {cell.left?.line && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord - radius}
          x2={bottom}
          y1={yCord}
          y2={yCord}
        />
      )}

      {cell.down?.line && (
        <line
          stroke={"black"}
          className={styles.line}
          x1={xCord}
          x2={xCord}
          y1={yCord + radius}
          y2={top}
        />
      )}

      {cell.up?.line && (
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
