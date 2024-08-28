import useDotsAndBoxes, { Dot, Line } from "./stores.ts";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import Lines from "./Lines.tsx";
import { directions } from "./emptyGrid.ts";

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
    boxGrid,
  } = useDotsAndBoxes();

  const circleX = 50;
  const circleY = 50;
  const circleRadius = 10;

  const cx = classNames.bind(styles);

  function handleClick() {
    if (!playing) return;

    // getting the current cells that are highlighted
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
    // if no cells highlighted, then you can't draw a line from the current cell
    if (cellsHighlighted.length === 0) return;

    // at this point, we know that the cell in lineDrawState can make a line to the selected cell
    if (lineDrawState.canDrawLine && cell.highlighted) {
      // getting the direction of the line we want to draw
      const selectedCell = grid[lineDrawState.startRow][lineDrawState.startCol];
      let direction = Object.keys(selectedCell).find(
        (key) =>
          (selectedCell[key] as Line).cellRow === rowIndex &&
          (selectedCell[key] as Line).cellCol === colIndex,
      );
      // setting the direction AND the opposite direction of the lines
      (selectedCell[direction!] as Line).line = true;
      (cell[oppositeDirection(direction!)!] as Line).line = true;

      // only checking right and down since thats what the references in Box refer to
      const drawnLine =
        direction === "down" || direction === "right"
          ? (selectedCell[direction!] as Line)
          : (cell[oppositeDirection(direction!)!] as Line);

      // finding the box where we drew the line
      let box = boxGrid.flat().find((cell) =>
        directions.find((key) => {
          if (
            cell.directions[key.direction].cellCol === drawnLine.cellCol &&
            cell.directions[key.direction].cellRow === drawnLine.cellRow
          ) {
            direction = key.direction;
            return true;
          }
        }),
      );

      if (Object.values(box!.directions).every((value: Line) => value.line))
        console.log("KILL MEE");

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
