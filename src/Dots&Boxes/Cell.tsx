import useDotsAndBoxes from "./stores.ts";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import { Box, Cell as DotCell } from "./Grid.ts";
import Lines from "./Lines.tsx";

interface Props {
  rowIndex: number;
  colIndex: number;
  cell: DotCell;
}

function Cell({ rowIndex, colIndex, cell }: Props) {
  const {
    turn,
    setTurn,
    setWinner,
    playing,
    grid,
    setGrid,
    setScore,
    scores: { red, blue },
  } = useDotsAndBoxes();

  function setScoreGridTurn(box: Box) {
    if (box.isCompleted()) {
      box.owner = turn;
      setScore(turn);
      setGrid(grid);
      setTurn(turn);
      if (grid.boxGrid.flat().every((box) => box.isCompleted()))
        setWinner(red > blue ? "Red" : red < blue ? "Blue" : "Nobody");
      return true;
    }
    return false;
  }

  const circleX = 50;
  const circleY = 50;
  const circleRadius = 10;

  const cx = classNames.bind(styles);

  function handleClick() {
    if (!playing) return;

    if (cell.highlighted) {
      const boxes = grid.setLines(cell)!.boxes;
      console.log(boxes);

      let boxCompleted = false;
      if (setScoreGridTurn(boxes[0])) boxCompleted = true;
      if (boxes[1] && setScoreGridTurn(boxes[1])) boxCompleted = true;
      if (!boxCompleted) {
        setTurn(turn === "red" ? "blue" : "red");
        setGrid(grid);
      }
      return;
    }

    grid.setCellsSelectedAndHighlighted(rowIndex, colIndex);
    setGrid(grid);
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
      <Lines xCord={circleX} yCord={circleY} radius={circleRadius} cell={cell} />
    </svg>
  );
}

export default Cell;
