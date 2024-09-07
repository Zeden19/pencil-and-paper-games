import { Tables } from "../../database.types.ts";
import styles from "./styles.module.css";

function gamesPlayingMapping(game: string) {
  switch (game) {
    case "TicTacToe":
      return "tictactoegamesplayed";
    case "Hangman":
      return "hangmangamesplayed";
    case "Connect 4":
      return "connect4gamesplayed";
  }
  return "tictactoegamesplayed";
}

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
            <div>
              <img
                style={{ height: "auto", width: "20%" }}
                className={"rounded-circle border border-black border-2 me-3"}
                alt={"avatar"}
                src={profile.avatar ?? undefined}
              />
              {profile.full_name}
            </div>
            <div className={"me-2"}>{profile[gamesPlayed]}</div>
          </li>
        ))}
    </ol>
  );
}

export default LeaderboardList;
