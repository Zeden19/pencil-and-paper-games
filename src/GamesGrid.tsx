import dotsandboxes from "./assets/dots&boxesPlaceholder.png";
import connect4 from "./assets/connect4Picture.png";
import hangman from "./assets/hangmanPicture.png";
import tictactoe from "./assets/tictactoePicture.png";
import GameCard from "./GameCard.tsx";

const games = [
  {
    label: "Tic Tac Toe",
    description: "The Definition of Simple.",
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
    label: "Dots And Boxes",
    description: "Place the Line, Get the Box.",
    img: dotsandboxes,
    url: "/dotsandboxes",
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
