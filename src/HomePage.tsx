import GamesGrid from "./GamesGrid.tsx";
import styles from "./styles.module.css";

function HomePage() {
  return (
    <div className={"container-fluid"}>
      <h2 className={`h1 text-center pt-4 pb-1 ${styles.title}`}>Pencil&PaperGames.com</h2>
      <h3 className={"h3 text-center mt-0 mb-3"}>Games</h3>
      <GamesGrid />
    </div>
  );
}

export default HomePage;
