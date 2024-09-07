import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../services/supabase-client.ts";
import styles from "./styles.module.css";
import { Tables } from "../../database.types.ts";
import genericAvatar from "../assets/genericAvatar.jpg";
import GamesPlayed from "./GamesPlayed.tsx";

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
      <GamesPlayed user={user}/>
    </div>
  );
}

export default ProfilePage;
