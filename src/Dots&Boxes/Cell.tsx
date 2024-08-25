import useDotsAndBoxes, { Dot } from "./stores.ts";
import { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames/bind";

interface Props {
  rowIndex: number;
  colIndex: number;
  cell: Dot;
}

function Cell({ rowIndex, colIndex, cell }: Props) {
  const { grid, setGrid, turn, setTurn, winner, setWinner } = useDotsAndBoxes();

  const cx = classNames.bind(styles);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected(!selected);
    if (cell.right !== undefined) grid[rowIndex][colIndex + 1].highlighted = true;
    if (cell.left !== undefined) grid[rowIndex][colIndex - 1].highlighted = true;
    if (cell.down !== undefined) grid[rowIndex + 1][colIndex].highlighted = true;
    if (cell.up !== undefined) grid[rowIndex - 1][colIndex].highlighted = true;
    
    console.log(grid);
    setGrid(grid);
  }
  
  return (
    <svg viewBox="0 0 80 80" width="25" height="25">
      <circle
        onClick={handleClick}
        className={cx({
          circle: true,
          cellHighlighted: cell.highlighted,
          cellClicked: selected,
        })}
        role={"button"}
        cx="40"
        cy="40"
        r="38"
      />
    </svg>
  );
}

export default Cell;
