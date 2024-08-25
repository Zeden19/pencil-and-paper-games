import useDotsAndBoxes, { Dot } from "./stores.ts";
import { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import { Simulate } from "react-dom/test-utils";

interface Props {
  rowIndex: number;
  colIndex: number;
  cell: Dot;
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
  } = useDotsAndBoxes();
  let {grid} = useDotsAndBoxes();

  const cx = classNames.bind(styles);
  
  function setCellHighlighted() {
    if (cell.right !== undefined) grid[rowIndex][colIndex + 1].highlighted = true;
    if (cell.left !== undefined) grid[rowIndex][colIndex - 1].highlighted = true;
    if (cell.down !== undefined) grid[rowIndex + 1][colIndex].highlighted = true;
    if (cell.up !== undefined) grid[rowIndex - 1][colIndex].highlighted = true;
  }
  
  function handleClick() {
    if (!playing) return;

    if (lineDrawState.canDrawLine) {
      if (cell.highlighted) {
        console.log("LineDrawState " + lineDrawState.startRow + " " + lineDrawState.startCol);
        console.log("Current Cell " + rowIndex + " " + colIndex);
        return;
      }
      
      // make everything  and set lineDrawState to something else
      grid = (grid.map(row => row.map(cell => ({...cell, highlighted: false}))));
      setCellHighlighted();
      setGrid(grid);
      setLineDrawState(rowIndex, colIndex, true);
      return;
    }
    
    
    setCellHighlighted();
    setLineDrawState(rowIndex, colIndex, true);
    setGrid(grid);
  }

  return (
    <svg viewBox="0 0 80 80" width="25" height="25">
      <circle
        onClick={handleClick}
        className={cx({
          circle: true,
          cellHighlighted: cell.highlighted,
          cellClicked: rowIndex === lineDrawState.startRow && colIndex === lineDrawState.startCol,
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
