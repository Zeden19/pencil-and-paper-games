import styles from "./styles.module.css";
import { gameFields } from "../Navigation/gameFields.tsx";
import { Tables } from "../../database.types.ts";
import { gamesPlayingMapping } from "../services/gamesPlayingMapping.ts";

interface Props {
  user: Tables<"profiles">;
}

function GamesPlayed({ user }: Props) {
  const userGames = gameFields.map((game) => ({
    ...game,
    value: user[gamesPlayingMapping(game.label)],
  }));
  return (
    <div className={`${styles.rightContainer}`}>
      <div className={"fw-bold fs-3 mb-2"}>Games Played</div>
      <div className={`bg-body-secondary rounded-3 px-3 w-100 pb-2`}>
        {userGames.map((game) => (
          <div
            className={`d-flex justify-content-between py-2 border-bottom border-secondary-subtle ${styles.gameCard}`}
            key={game.label}>
            <div className={"fs-5"}>
              {game.icon}
              {game.label}
            </div>
            <div className={"fs-5"}>{game.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPlayed;
