import useDotsAndBoxes, { Dot, Line } from "./stores.ts";
import styles from "./styles.module.css";
import classNames from "classnames/bind";

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

//todo add more customizability to the store to allow for specific values to change without changing the whole grid
// for example: setHighlighted (row, col, boolean), setLine(). This will prevent unnecessary re-renders
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
  } = useDotsAndBoxes();

  const cx = classNames.bind(styles);

  function handleClick() {
    if (!playing) return;

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
      return;
    }

    // at this point, we have to re-set the cells highlighted (and line draw state)
    // set the correct cells to be highlighted (and un-highlights cells)
    setCellsHighlighted([
      { row: rowIndex, col: colIndex + 1 },
      { row: rowIndex, col: colIndex - 1 },
      { row: rowIndex + 1, col: colIndex },
      { row: rowIndex - 1, col: colIndex },
    ]);
    setLineDrawState(rowIndex, colIndex, true);
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
