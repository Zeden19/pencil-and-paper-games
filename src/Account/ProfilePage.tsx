import { useParams } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import supabase from "../services/supabase-client.ts";
import styles from "./styles.module.css";
import { Tables } from "../../database.types.ts";
import { gameFields } from "../Navigation/gameFields.tsx";
import genericAvatar from "../assets/genericAvatar.jpg";

function gameMap(
  user: Tables<"profiles">,
  game: {
    label: "Tic Tac Toe" | "Hangman" | "Connect 4" | "Dots And Boxes";
    description: string;
    img: string;
    url: string;
    icon: ReactNode;
  },
) {
  switch (game.label) {
    case "Tic Tac Toe":
      return user.tictactoegamesplayed;
    case "Connect 4":
      return user.connect4gamesplayed;
    case "Hangman":
      return user.hangmangamesplayed;
    case "Dots And Boxes":
      return user.dotsboxesgamesplayed;
  }
}

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Tables<"profiles">>();

  useEffect(() => {
    async function getUserData() {
      const { data: profileData } = await supabase.from("profiles").select().eq("id", id!);
      if (profileData) {
        setUser({ ...profileData[0] });
      }
    }

    getUserData();
  }, [id]);

  if (!user) return null;
  const userGames = gameFields.map((game) => ({ ...game, value: gameMap(user, game) }));

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.leftContainer}`}>
        <img
          src={user?.avatar || genericAvatar}
          className={"rounded-circle border border-black border-2 mb-4 w-100"}
          alt="avatar"
        />
        <div className={styles.nameDescription}>
          <h2>{user?.full_name}</h2>
          <p className={"text-secondary fw-normal p-1"}>{user.description}</p>
        </div>
      </div>
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
    </div>
  );
}

export default ProfilePage;
