import useConnect4Store from "./stores.ts";
import styles from "./styles.module.css";
import { useState } from "react";
import yellowChip from "../assets/yellowChip.png";
import redChip from "../assets/redChip.png";

//todo: refractor: consider the for loop extraGrid for updating winningChips
//todo: add chip at top selection

function Connect4Grid() {
  const [colHovered, setColHovered] = useState(NaN);
  const { grid, setGrid, turn, setTurn, playing, setWinner } = useConnect4Store();

  function setWiningChips(
    indices: [
      { row: number; col: number },
      { row: number; col: number },
      { row: number; col: number },
      { row: number; col: number },
    ],
  ) {
    indices.forEach((index) => (grid[index.row][index.col].winning = true));
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
    let leftCol = col;
    while (leftCol !== 0 && grid[row][leftCol - 1].turn === turn) {
      leftCol--;
    }
    if (
      leftCol <= 4 &&
      grid[row][leftCol].turn === grid[row][leftCol + 1].turn &&
      grid[row][leftCol + 1].turn === grid[row][leftCol + 2].turn &&
      grid[row][leftCol + 2].turn === grid[row][leftCol + 3].turn
    ) {
      setWinner(turn);
      setWiningChips([
        { row: row, col: leftCol },
        { row: row, col: leftCol + 1 },
        { row: row, col: leftCol + 2 },
        { row: row, col: leftCol + 3 },
      ]);
    }

    // checking vertical; since there can't be an "up" victory, we only check down
    if (
      row <= 2 &&
      grid[row][col].turn === grid[row + 1][col].turn &&
      grid[row + 1][col].turn === grid[row + 2][col].turn &&
      grid[row + 2][col].turn === grid[row + 3][col].turn
    ) {
      setWinner(turn);
      setWiningChips([
        { row: row, col: col },
        { row: row + 1, col: col },
        { row: row + 2, col: col },
        { row: row + 3, col: col },
      ]);
      return;
    }

    // checking diagonal; this time we move ourselves to the rightmost/leftmost diagonal chip and check from there
    // getting bottom left
    let bottomLeftCol = col;
    let bottomLeftRow = row;
    while (
      grid[bottomLeftRow + 1] &&
      grid[bottomLeftRow + 1][bottomLeftCol - 1] &&
      grid[bottomLeftRow + 1][bottomLeftCol - 1].turn === turn
    ) {
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (
      bottomLeftRow >= 3 &&
      bottomLeftCol <= 3 &&
      grid[bottomLeftRow][bottomLeftCol].turn == grid[bottomLeftRow - 1][bottomLeftCol + 1].turn &&
      grid[bottomLeftRow - 1][bottomLeftCol + 1].turn ==
        grid[bottomLeftRow - 2][bottomLeftCol + 2].turn &&
      grid[bottomLeftRow - 2][bottomLeftCol + 2].turn ==
        grid[bottomLeftRow - 3][bottomLeftCol + 3].turn
    ) {
      setWinner(turn);
      setWiningChips([
        { row: bottomLeftRow, col: bottomLeftCol },
        { row: bottomLeftRow - 1, col: bottomLeftCol + 1 },
        { row: bottomLeftRow - 2, col: bottomLeftCol + 2 },
        { row: bottomLeftRow - 3, col: bottomLeftCol + 3 },
      ]);
      return;
    }

    // getting bottom right
    let bottomRightCol = col;
    let bottomRightRow = row;
    while (
      grid[bottomRightRow + 1] &&
      grid[bottomRightRow + 1][bottomRightCol + 1] &&
      grid[bottomRightRow + 1][bottomRightCol + 1].turn === turn
    ) {
      bottomRightRow++;
      bottomRightCol++;
    }
    if (
      bottomRightRow >= 3 &&
      bottomRightCol >= 3 &&
      grid[bottomRightRow][bottomRightCol].turn ==
        grid[bottomRightRow - 1][bottomRightCol - 1].turn &&
      grid[bottomRightRow - 1][bottomRightCol - 1].turn ==
        grid[bottomRightRow - 2][bottomRightCol - 2].turn &&
      grid[bottomRightRow - 2][bottomRightCol - 2].turn ==
        grid[bottomRightRow - 3][bottomRightCol - 3].turn
    ) {
      setWinner(turn);
      setWiningChips([
        { row: bottomRightRow, col: bottomRightCol },
        { row: bottomRightRow - 1, col: bottomRightCol - 1 },
        { row: bottomRightRow - 2, col: bottomRightCol - 2 },
        { row: bottomRightRow - 3, col: bottomRightCol - 3 },
      ]);
      return;
    }

    // checking tie
    if (
      !grid
        .map((row) => row.map((tile) => tile.turn))
        .flat()
        .includes("")
    ) {
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
                className={`rounded-circle bg-white  border border-2 border-black ${tile.winning && styles.winningChip}`}
              >
                <img alt={"Chip"} className={"w-100 h-100"} src={tile.src} />
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default Connect4Grid;
