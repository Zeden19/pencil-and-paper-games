import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser.ts";
import { useEffect, useState } from "react";
import supabase from "../services/supabase-client.ts";
import { Tables } from "../../database.types.ts";

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [userData, setUserData] = useState<Tables<"profiles">>();
  
  useEffect(() => {
    getUserData();
  });
  
  async function getUserData() {
    const { data } = await supabase.from("profiles").select().eq("id", id!);
    if (data) {
      setUserData(data[0]);
    }
  }
  
  return (<>
    <p>{userData?.tictactoegamesplayed}</p>
    <p>{userData?.dotsboxesgamesplayed}</p>
    <p>{userData?.connect4gamesplayed}</p>
    <p>{userData?.hangmangamesplayed}</p>
    
  </>);
}

export default ProfilePage;