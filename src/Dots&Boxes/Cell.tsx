import useDotsAndBoxes, { Box, Line } from "./stores.ts";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import { Cell as DotCell} from "./Grid.ts";

interface Props {
  rowIndex: number;
  colIndex: number;
  cell: DotCell;
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

function isBoxComplete(box: Box): boolean {
  return Object.values(box!.directions).every((value: Line) => value.line);
}

function Cell({ rowIndex, colIndex, cell }: Props) {
  const { turn, setTurn, setWinner, playing, grid, setScore } = useDotsAndBoxes();
  //
  // function setScoreGridTurn(box: Box) {
  //   if (isBoxComplete(box!)) {
  //     box.completed = true;
  //     setScore(turn);
  //     setGrid(grid);
  //     setTurn(turn);
  //     if (boxGrid.flat().every((cell) => isBoxComplete(cell)))
  //       setWinner(red > blue ? "Red" : red < blue ? "Blue" : "Nobody");
  //     return true;
  //   }
  //   return false;
  // }

  const circleX = 50;
  const circleY = 50;
  const circleRadius = 10;

  const cx = classNames.bind(styles);

  function handleClick() {
    if (!playing) return;

    // // getting the current cells that are going to be highlighted
    // let cellsHighlighted: { row: number; col: number }[] = [];
    // for (let i = 0; i < directions.length; i++) {
    //   const direction = directions[i];
    //   if (cell[direction.direction]?.line === false) {
    //     cellsHighlighted = [
    //       ...cellsHighlighted,
    //       { row: direction.rowIncrement + rowIndex, col: direction.colIncrement + colIndex },
    //     ];
    //   }
    // }
    // // if no cells highlighted, then you can't draw a line from the current cell
    // if (cellsHighlighted.length === 0) return;
    //
    // // at this point, we know that the cell in lineDrawState can make a line to the selected cell
    // if (lineDrawState.canDrawLine && cell.highlighted) {
    //   // getting the direction of the line we want to draw
    //   const selectedCell = grid[lineDrawState.startRow][lineDrawState.startCol];
    //   const direction = Object.keys(selectedCell).find(
    //     (key) =>
    //       (selectedCell[key] as Line).endRow === rowIndex &&
    //       (selectedCell[key] as Line).endCol === colIndex,
    //   );
    //   // setting the direction AND the opposite direction of the lines
    //   (selectedCell[direction!] as Line).line = true;
    //   (cell[oppositeDirection(direction!)!] as Line).line = true;
    //
    //   // only checking right and down since that is what the references in Box refer to
    //   const drawnLine =
    //     direction === "down" || direction === "right"
    //       ? (selectedCell[direction!] as Line)
    //       : (cell[oppositeDirection(direction!)!] as Line);
    //
    //   // finding the box where we drew the line
    //   const box = boxGrid
    //     .flat()
    //     .find((cell) =>
    //       directions.find(
    //         (key) =>
    //           cell.directions[key.direction].endCol === drawnLine.endCol &&
    //           cell.directions[key.direction].endRow === drawnLine.endRow,
    //       ),
    //     );
    //
    //   // most lines are a part of 2 boxes, so here we check the other box
    //   let box2;
    //   const boxRow = boxGrid.findIndex((row) => row.includes(box!));
    //   const boxCol = boxGrid[boxRow].findIndex((boxCell) => boxCell === box);
    //
    //   if (
    //     (direction === "right" || direction === "left") &&
    //     boxRow !== 3 &&
    //     drawnLine.startRow !== 0
    //   )
    //     box2 = boxGrid[boxRow + 1][boxCol];
    //   else if ((direction === "up" || direction === "down") && boxCol !== 0)
    //     box2 = boxGrid[boxRow][boxCol + 1];
    //
    //   if (setScoreGridTurn(box!)) return;
    //   if (box2 && setScoreGridTurn(box2)) return;
    //
    //   // no box completed
    //   setGrid(grid);
    //   setTurn(turn === "red" ? "blue" : "red");
    //   return;
    // }
    //
    // // at this point, we have to re-set the cells highlighted (and line draw state)
    // // set the correct cells to be highlighted (and un-highlights cells)
    // setCellsHighlighted(cellsHighlighted);
    // setLineDrawState(rowIndex, colIndex, true);
  }

  return (
    <svg viewBox="0 0 100 100" width={"100%"} height={"100%"} preserveAspectRatio={"none"}>
      <circle
        onClick={handleClick}
        className={cx({
          circle: true,
          cellHighlighted: cell.highlighted,
          cellClicked: cell.selected,
        })}
        role={"button"}
        cx={circleX}
        cy={circleY}
        r={circleRadius}
      />
      {/*<Lines xCord={circleX} yCord={circleY} radius={circleRadius} cell={cell} />*/}
    </svg>
  );
}

export default Cell;
