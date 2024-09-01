import { NavLink } from "react-router-dom";
import { gameFields } from "./gameFields.tsx";

export function GamesDropdown() {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Games
      </a>
      <ul className="dropdown-menu">
        {gameFields.map((game) => (
          <li key={game.label}>
            <NavLink to={game.url} className={"dropdown-item"}>
              {game.icon} {game.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default GamesDropdown;
