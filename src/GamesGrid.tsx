import GameCard from "./GameCard.tsx";
import { gameFields } from "./Navigation/gameFields.tsx";

function GamesGrid() {
  return (
    <div className={"container text-center"}>
      <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gx-3"}>
        {gameFields.map((game) => (
          <div key={game.label} className={"col mb-lg-0 mb-3"}>
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
