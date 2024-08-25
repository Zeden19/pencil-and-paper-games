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
  const { setGrid, turn, setTurn, winner, setWinner, playing, lineDrawState, setLineDrawState } =
    useDotsAndBoxes();
  let { grid } = useDotsAndBoxes();

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
        // at this point, we know that the cell in lineDrawState can make a line to the selected cell
        const selectedCell = grid[lineDrawState.startRow][lineDrawState.startCol];

        const direction = Object.keys(selectedCell).find(
          (key) =>
            (selectedCell[key as keyof Dot] as Line).cellRow === rowIndex &&
            (selectedCell[key as keyof Dot] as Line).cellCol === colIndex,
        );

        (selectedCell[direction! as keyof Dot] as Line).line = true;
        (cell[oppositeDirection(direction!) as keyof Dot] as Line).line = true
        setGrid(grid);
        return;
      }

      // make everything un-highlighted and set lineDrawState to something else
      grid = grid.map((row) => row.map((cell) => ({ ...cell, highlighted: false })));
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
