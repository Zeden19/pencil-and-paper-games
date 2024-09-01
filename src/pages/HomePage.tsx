import GamesGrid from "../GamesGrid.tsx";
import styles from "../styles.module.css";
import supabase from "../services/supabase-client.ts";
import { useEffect, useState } from "react";
import { Tables } from "../../database.types.ts";

function HomePage() {
  const [countries, setCountries] = useState([] as Tables<"countries">[]);
  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (data) setCountries(data);
  }

  return (
    <div className={"container-fluid"}>
      <h2 className={`h1 text-center pt-4 pb-1 ${styles.title}`}>Pencil&PaperGames.com</h2>
      <h3 className={"h3 text-center mt-0 mb-3"}>Games</h3>
      <GamesGrid />

      <ul>{countries?.map((country) => <li key={country.id}>{country.name}</li>)}</ul>
    </div>
  );
}

export default HomePage;
