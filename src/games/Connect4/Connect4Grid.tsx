import useConnect4Store from "./stores.ts";
import styles from "./styles.module.css";
import { useState } from "react";
import yellowChip from "../../assets/yellowChip.png";
import redChip from "../../assets/redChip.png";

//todo: add chip at top selection
function Connect4Grid() {
  const [colHovered, setColHovered] = useState(NaN);
  const { grid, setGrid, turn, setTurn, playing, setWinner } = useConnect4Store();

  function getFirstChipInRow(
    turn: string,
    row: number,
    col: number,
    rowIncrement: number,
    colIncrement: number,
  ) {
    while (
      grid[row + rowIncrement] &&
      grid[row + rowIncrement][col + colIncrement] &&
      grid[row + rowIncrement][col + colIncrement].turn === turn
    ) {
      row += rowIncrement;
      col += colIncrement;
    }
    return [row, col];
  }

  function checkAndSetWin(
    turn: string,
    startingRow: number,
    startingCol: number,
    rowIncrement: number,
    colIncrement: number,
  ) {
    const newGrid = JSON.parse(JSON.stringify(grid)); // creating deep copy
    for (let i = 0; i < 4; i++) {
      if (grid[startingRow][startingCol].turn !== turn) {
        return;
      }
      newGrid[startingRow][startingCol].winning = true;
      startingRow += rowIncrement;
      startingCol += colIncrement;
    }
    setGrid(newGrid);
    setWinner(turn);
  }

  function handleClick(col: number, turn: string) {
    if (!playing) return;
    // find available location
    let row = undefined;

    // simulating the "fall" of a chip
    for (let i = 0; i < 6; i++) {
      if (grid[i][col].turn === "") row = i;
    }
    if (row === undefined) return;

    grid[row][col].turn = turn;
    grid[row][col].src = turn === "yellow" ? yellowChip : redChip;
    setGrid(grid);
    setTurn();

    // checking if player has won

    // checking horizontal
    // go to the leftmost chip and move right
    const leftCol = getFirstChipInRow(turn, row, col, 0, -1)[1];
    if (leftCol <= 3) checkAndSetWin(turn, row, leftCol, 0, 1);

    // checking vertical; since there can't be an "up" victory, we only check down
    if (row <= 2) checkAndSetWin(turn, row, col, 1, 0);

    // checking diagonal; this time we move ourselves to the rightmost/leftmost diagonal chip and check from there
    // getting bottom left
    const [bottomLeftRow, bottomLeftCol] = getFirstChipInRow(turn, row, col, 1, -1);
    if (bottomLeftRow >= 3 && bottomLeftCol <= 3)
      checkAndSetWin(turn, bottomLeftRow, bottomLeftCol, -1, 1);

    // getting bottom right
    const [bottomRightRow, bottomRightCol] = getFirstChipInRow(turn, row, col, 1, 1);
    if (bottomRightRow >= 3 && bottomRightCol >= 3)
      checkAndSetWin(turn, bottomRightRow, bottomRightCol, -1, -1);

    // checking tie
    if (
      !grid
        .map((row) => row.map((tile) => tile.turn))
        .flat()
        .includes("")
    ) {
      // checking tie
      setWinner("Nobody");
    }
  }

  return (
    <div style={{ maxWidth: "800px" }} className={"container text-center bg-primary rounded g-4"}>
      <div className={"row " + styles.rowCols7}>
        {grid.map((down, downIndex) =>
          down.map((tile, rightIndex) => (
            <div
              onMouseOver={() => setColHovered(rightIndex)}
              onMouseOut={() => setColHovered(NaN)}
              onClick={() => handleClick(rightIndex, turn)}
              key={downIndex.toString() + " " + rightIndex.toString()}
              className={`col py-2 px-md-3 px-1 ${colHovered === rightIndex && styles.hoveredCol}`}
            >
              <div
                className={`rounded-circle bg-white border border-2 border-black ${tile.winning && styles.winningChip}`}
              >
                <img draggable={false} alt={"Chip"} className={"w-100 h-100"} src={tile.src} />
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default Connect4Grid;
