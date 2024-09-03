import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "../services/supabase-client.ts";

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    getSession();
  }, []);
  
  async function getSession() {
    const { data: {user}, error } = await supabase.auth.getUser();
    setUser(user);
  }
  
  return { user, setUser };
}

export default useUser;