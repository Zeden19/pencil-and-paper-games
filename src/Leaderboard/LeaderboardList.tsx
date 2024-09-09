import { Tables } from "../../database.types.ts";
import styles from "./styles.module.css";
import { gamesPlayingMapping } from "../services/gamesPlayingMapping.ts";
import { Link } from "react-router-dom";
import Avatar from "../Avatar.tsx";

interface Props {
  game: "Tic Tac Toe" | "Hangman" | "Connect 4" | "Dots And Boxes";
  profiles: Tables<"profiles">[];
}

function LeaderboardList({ game, profiles }: Props) {
  const gamesPlayed = gamesPlayingMapping(game);
  return (
    <ol className={styles.orderedList} type={"1"}>
      {profiles
        .sort((profileA, profileB) => profileB[gamesPlayed]! - profileA[gamesPlayed]!)
        .map((profile) => (
          //todo make these accordians
          <li
            key={profile.id}
            className={`py-2 border-bottom border-secondary-subtle ${styles.listElement}`}>
            <div className={"text-start ms-4"}>
              <Avatar className={"h-auto w-25 me-3"} src={profile.avatar!} />
              <Link to={`/account/${profile.id}`} className={"link-secondary"}>
                {profile.full_name}
              </Link>
            </div>
            <div className={"me-2"}>{profile[gamesPlayed]}</div>
          </li>
        ))}
    </ol>
  );
}

export default LeaderboardList;
