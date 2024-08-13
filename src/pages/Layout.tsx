import Navigation from "../Navigation.tsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet/>
    </>
  );
}

export default Layout;
