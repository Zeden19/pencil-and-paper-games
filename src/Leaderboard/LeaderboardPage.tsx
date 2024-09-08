//todo abstract title and layout of pages into component for this, home, about & contact
import styles from "./styles.module.css";
import { gameFields } from "../Navigation/gameFields.tsx";
import { FaTrophy } from "react-icons/fa";
import LeaderboardList from "./LeaderboardList.tsx";
import supabase from "../services/supabase-client.ts";
import { useEffect, useState } from "react";
import { Tables } from "../../database.types.ts";
import LeaderBoardSkeleton from "./LeaderBoardSkeleton.tsx";

function LeaderboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<Tables<"profiles">[]>([]);
  useEffect(() => {
    async function getProfiles() {
      const { data: profileData } = await supabase.from("profiles").select();
      if (profileData) {
        setProfiles(profileData);
        setIsLoading(false);
      }
    }

    getProfiles();
  }, []);

  if (isLoading) return <LeaderBoardSkeleton />;
  return (
    <div className={"container text-center"}>
      <h1 className={`text-center pt-4 pb-1 ${styles.title}`}>
        <FaTrophy /> Leaderboards <FaTrophy />
      </h1>

      <div
        style={{ margin: "auto" }}
        className={"row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"}>
        {gameFields.map((game) => (
          <div key={game.label} className={"col p-3"}>
            <div className={"bg-body-tertiary card"}>
              <div className={"card-body"}>
                <h3 className={"card-title mb-4 fs-4"}>
                  {game.icon} {game.label}
                </h3>
                <LeaderboardList profiles={profiles} game={game.label} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
