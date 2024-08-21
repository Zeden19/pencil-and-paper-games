import useConnect4Store from "./stores.ts";
import styles from "./styles.module.css";
import { useState } from "react";
import yellowChip from "../assets/yellowChip.png";
import redChip from "../assets/redChip.png";

function Connect4Grid() {
  const [colHovered, setColHovered] = useState(NaN);
  const { grid, setGrid, turn, setTurn, playing, setWinner } = useConnect4Store();

  function handleClick(col: number, turn: string) {
    if (!playing) return;
    // find available location
    let row = undefined;

    // simulating the "fall" of a chip
    for (let i = 0; i < 6; i++) {
      if (grid[i][col] === "") row = i;
    }

    if (row === undefined) return;

    grid[row][col] = turn;
    setGrid(grid);
    setTurn();

    // checking horizontal
    // this works by checking how many of the same chips are to the left and right
    let right = 0;
    for (let i = col + 1; i < col + 4; i++) {
      if (grid[row][i] === turn) right += 1;
      else break;
    }
    let left = 0;
    for (let i = col - 1; i > col - 4; i--) {
      if (grid[row][i] === turn) left += 1;
      else break;
    }
    if (left + right + 1 >= 4) {
      // + 1 since we didn't account for the current chip when checking left and right
      setWinner(turn);
      return;
    }

    // checking vertical; since there can't be an "up" victory, we should only check down
    if (
      row <= 2 &&
      grid[row][col] === grid[row + 1][col] &&
      grid[row + 1][col] === grid[row + 2][col] &&
      grid[row + 2][col] === grid[row + 3][col]
    ) {
      setWinner(turn);
      return;
    }

    // checking diagonal; this time we move ourselves to the rightmost/leftmost diagonal chip and check from there
    // checking bottom left
    let bottomLeftCol = col;
    let bottomLeftRow = row;
    while (grid[bottomLeftRow + 1] && grid[bottomLeftRow + 1][bottomLeftCol - 1] === turn) {
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (
      grid[bottomLeftRow][bottomLeftCol] == grid[bottomLeftRow - 1][bottomLeftCol + 1] &&
      grid[bottomLeftRow - 1][bottomLeftCol + 1] == grid[bottomLeftRow - 2][bottomLeftCol + 2] &&
      grid[bottomLeftRow - 2][bottomLeftCol + 2] == grid[bottomLeftRow - 3][bottomLeftCol + 3]
    ) {
      setWinner(turn);
      return;
    }

    // checking bottom right
    let bottomRightCol = col;
    let bottomRightRow = row;
    while (grid[bottomRightRow + 1] && grid[bottomRightRow + 1][bottomRightCol + 1] === turn) {
      bottomRightRow++;
      bottomRightCol++;
    }
    if (
      grid[bottomRightRow][bottomRightCol] == grid[bottomRightRow - 1][bottomRightCol - 1] &&
      grid[bottomRightRow - 1][bottomRightCol - 1] == grid[bottomRightRow - 2][bottomRightCol - 2] &&
      grid[bottomRightRow - 2][bottomRightCol - 2] == grid[bottomRightRow - 3][bottomRightCol - 3]
    ) {
      setWinner(turn);
      return;
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
                className={`rounded-circle bg-white ${!tile && "py-md-4 py-2"} border border-2 border-black`}
              >
                {tile ? (
                  <img
                    alt={"token"}
                    className={"w-100 h-100"}
                    src={tile === "yellow" ? yellowChip : redChip}
                  />
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default Connect4Grid;
