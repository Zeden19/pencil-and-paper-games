import { User } from "@supabase/supabase-js";
import supabase from "../services/supabase-client.ts";

async function updateUserGamePlayed(user: User | null, game : "tictactoegamesplayed") {
  if (user) {
    const { data } = await supabase.from("profiles").select().eq("id", user.id);
    if (!data) return;
    const gamesPlayed = data[0][game];
    const { error } = await supabase
      .from("profiles")
      .update({ [game]: gamesPlayed ? gamesPlayed + 1 : 1 })
      .eq("id", user.id);
  }
}

export default updateUserGamePlayed;
