import { NavLink } from "react-router-dom";
import { GamesDropdown } from "./GamesDropdown.tsx";

export function RouteButtons() {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>

      <GamesDropdown />

      <li className="nav-item">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">
          Contact
        </NavLink>
      </li>
    </ul>
  );
}

export default RouteButtons;
