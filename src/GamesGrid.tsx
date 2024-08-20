import battleship from "./assets/battleshipPlaceholder.jpg";
import connect4 from "./assets/connect4Placeholder.jpg";
import hangman from "./assets/hangmanPlaceholder.jpg";
import tictactoe from "./assets/tictactoePlaceholder.png";
import GameCard from "./GameCard.tsx";

const games = [
  {
    label: "Tic Tac toe",
    description: "The Most Simple of Simple Games.",
    img: tictactoe,
    url: "/tictactoe",
  },
  {
    label: "Connect 4",
    description: "4 In a Row Grants a Win!",
    img: connect4,
    url: "/connect4",
  },
  {
    label: "Hangman",
    description: "Guess the Word, Letter by Letter.",
    img: hangman,
    url: "/hangman",
  },
  {
    label: "Battleship",
    description: "Press the Assault, Sink the Enemy Fleet!",
    img: battleship,
    url: "/battleship",
  },
];

function GamesGrid() {
  return (
    <div className={"container text-center"}>
      <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gx-3"}>
        {games.map((game) => (
          <div key={game.label} className={"col"}>
            <GameCard
              img={game.img}
              label={game.label}
              description={game.description}
              url={game.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesGrid;
