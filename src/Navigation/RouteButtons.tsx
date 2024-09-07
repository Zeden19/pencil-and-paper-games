import { NavLink } from "react-router-dom";
import { GamesDropdown } from "./GamesDropdown.tsx";

export function RouteButtons() {
  const navItems = [
    { label: "Leaderboards", to: "/leaderboard" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      <GamesDropdown />
      {navItems.map((item) => (
        <li key={item.label} className="nav-item">
          <NavLink className="nav-link" to={item.to}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default RouteButtons;
