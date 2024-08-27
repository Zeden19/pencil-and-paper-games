import useDotsAndBoxes, { Box, Dot, Line } from "./stores.ts";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import Lines from "./Lines.tsx";
import emptyGrid, { directions } from "./emptyGrid.ts";
import { useState } from "react";

interface Props {
  rowIndex: number;
  colIndex: number;
  cell: Dot;
}

function oppositeDirection(direction: string) {
  switch (direction) {
    case "right":
      return "left";
    case "left":
      return "right";
    case "up":
      return "down";
    case "down":
      return "up";
  }
}

function Cell({ rowIndex, colIndex, cell }: Props) {
  const {
    setGrid,
    turn,
    setTurn,
    winner,
    setWinner,
    playing,
    lineDrawState,
    setLineDrawState,
    setCellsHighlighted,
    grid,
    boxGrid
  } = useDotsAndBoxes();
  
  const circleX = 50;
  const circleY = 50;
  const circleRadius = 10;

  const cx = classNames.bind(styles);
  
  console.log(boxGrid);

  function handleClick() {
    if (!playing) return;

    let cellsHighlighted: { row: number; col: number }[] = [];
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      if (cell[direction.direction]?.line === false) {
        cellsHighlighted = [
          ...cellsHighlighted,
          { row: direction.rowIncrement + rowIndex, col: direction.colIncrement + colIndex },
        ];
      }
    }

    if (cellsHighlighted.length === 0) return;

    if (lineDrawState.canDrawLine && cell.highlighted) {
      // at this point, we know that the cell in lineDrawState can make a line to the selected cell
      const selectedCell = grid[lineDrawState.startRow][lineDrawState.startCol];

      const direction = Object.keys(selectedCell).find(
        (key) =>
          (selectedCell[key as keyof Dot] as Line).cellRow === rowIndex &&
          (selectedCell[key as keyof Dot] as Line).cellCol === colIndex,
      );

      (selectedCell[direction! as keyof Dot] as Line).line = true;
      (cell[oppositeDirection(direction!) as keyof Dot] as Line).line = true;
      setGrid(grid);
      setTurn();
      return;
    }

    // at this point, we have to re-set the cells highlighted (and line draw state)
    // set the correct cells to be highlighted (and un-highlights cells)
    setCellsHighlighted(cellsHighlighted);
    setLineDrawState(rowIndex, colIndex, true);
  }

  return (
    <svg viewBox="0 0 100 100" width={"100%"} height={"100%"} preserveAspectRatio={"none"}>
      <circle
        onClick={handleClick}
        className={cx({
          circle: true,
          cellHighlighted: cell.highlighted,
          cellClicked: rowIndex === lineDrawState.startRow && colIndex === lineDrawState.startCol,
        })}
        role={"button"}
        cx={circleX}
        cy={circleY}
        r={circleRadius}
      />
      <Lines xCord={circleX} yCord={circleY} radius={circleRadius} cell={cell} />
    </svg>
  );
}

export default Cell;
