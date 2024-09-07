import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import supabase from "../services/supabase-client.ts";
import styles from "./styles.module.css";
import { Tables } from "../../database.types.ts";
import genericAvatar from "../assets/genericAvatar.jpg";
import GamesPlayed from "./GamesPlayed.tsx";
import ProfileInfo from "./ProfileInfo.tsx";
import EditProfile from "./EditProfile.tsx";

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Tables<"profiles">>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const { data: profileData } = await supabase.from("profiles").select().eq("id", id!);
      if (profileData) {
        setProfile({ ...profileData[0] });
      }
    }
    getUserData();
  }, [id]);

  if (!profile) return null;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.leftContainer}`}>
        <img
          src={profile?.avatar || genericAvatar}
          className={"rounded-circle border border-black border-2 mb-4 w-100"}
          alt="avatar"
        />
        <div className={styles.nameDescription}>
          {isEditing ? (
            <EditProfile
              profile={profile}
              setNewProfile={(profile: Tables<"profiles">) => setProfile(profile)}
              handleSaveClick={() => setIsEditing(false)}
            />
          ) : (
            <ProfileInfo profile={profile} handleEditClick={() => setIsEditing(true)} />
          )}
        </div>
      </div>
      <GamesPlayed user={profile} />
    </div>
  );
}

export default ProfilePage;
