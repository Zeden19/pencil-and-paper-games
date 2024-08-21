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
    let right = 0;
    for (let i = col + 1; i < col + 4; i++) {
      if (grid[row][i] === turn) right += 1
    }
    let left = 0;
    for (let i = col - 1; i > col - 4; i--) {
      if (grid[row][i] === turn) left += 1
    }
    if (left + right + 1 >= 4) { // + 1 since we didn't account for the current chip when checking left and right
      setWinner(turn)
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
