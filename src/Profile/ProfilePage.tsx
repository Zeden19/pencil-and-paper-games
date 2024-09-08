import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Tables } from "../../database.types.ts";
import genericAvatar from "../assets/genericAvatar.jpg";
import GamesPlayed from "./GamesPlayed.tsx";
import ProfileInfo from "./ProfileInfo.tsx";
import EditProfile from "./EditProfile.tsx";
import ProfilePageSkeleton from "./ProfilePageSkeleton.tsx";
import supabase from "../services/supabase-client.ts";
import ProfileNotFound from "./ProfileNotFound.tsx";
import useUser from "../hooks/useUser.ts";

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Tables<"profiles">>();
  const [error, setError] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function getUserData() {
      const { data: profileData, error } = await supabase.from("profiles").select().eq("id", id!);
      if (profileData) {
        setProfile({ ...profileData[0] });
      }
      if (error) {
        setError(true)
      }
    }
    getUserData();
  }, [id]);

  if (error) return <ProfileNotFound/>
  if (!profile) return <ProfilePageSkeleton />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.leftContainer}`}>
        <img
          src={profile.avatar ?? genericAvatar}
          className={`rounded-circle border border-black border-2 mb-4 w-100`}
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
            <ProfileInfo user={user} profile={profile} handleEditClick={() => setIsEditing(true)} />
          )}
        </div>
      </div>
      <GamesPlayed user={profile} />
    </div>
  );
}

export default ProfilePage;
