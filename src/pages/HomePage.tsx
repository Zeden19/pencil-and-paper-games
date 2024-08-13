import GamesGrid from "../GamesGrid.tsx";

function HomePage() {
  return (
    <div className={"container-fluid"}>
      <h2 className={"h2 text-center my-4"}>Pencil&PaperGames.com</h2>
      <h3 className={"h3 text-center my-3"}>Games</h3>
      <GamesGrid/>
    </div>
  )
}

export default HomePage;