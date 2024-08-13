import Navigation from "../Navigation.tsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigation />
      <main><Outlet/></main>
    </>
  );
}

export default Layout;
