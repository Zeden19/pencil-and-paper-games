import { GiTicTacToe } from "react-icons/gi";
import { MdAccountCircle, MdDarkMode, MdGridOff, MdLightMode } from "react-icons/md";
import { PiDotsNineBold, PiPersonSimpleBold, PiSignInBold } from "react-icons/pi";
import { CgDarkMode } from "react-icons/cg";
import { NavLink } from "react-router-dom";

function Navigation() {
  const iconRightSize = "2rem";
  return (
    <nav className="navbar navbar-expand-sm bg-body-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" end to="/">
          <GiTicTacToe size={"3.5rem"} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

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
                <li>
                  <NavLink className="dropdown-item" to="/tictactoe">
                    <GiTicTacToe className={"me-1"} /> Tic-Tac-toe
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/connect4">
                    <MdGridOff className={"me-1"} />
                    Connect 4
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/hangman">
                    <PiPersonSimpleBold className={"me-1"} />
                    Hangman
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/dotsandboxes">
                    <PiDotsNineBold className={"me-1"} />
                    Dots and Boxes
                  </NavLink>
                </li>
              </ul>
            </li>

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
          <div className={"d-flex gap-4"}>
            <li className="d-flex">
              <div className={"dropdown  nav-item"}>
                <MdAccountCircle
                  className={"nav-link dropdown-toggle"}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role={"button"}
                  size={iconRightSize}
                />
                <ul className={"dropdown-menu dropdown-menu-start dropdown-menu-md-end"}>
                  <li className={"dropdown-item"}>
                    <PiSignInBold className={"me-1"} />
                    <a>Sign up</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className={"d-flex flex-row"}>
              <div className={"dropdown nav-item"}>
                <MdDarkMode
                  role={"button nav-link"}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  size={iconRightSize}
                />
                <ul className={"dropdown-menu dropdown-menu-start dropdown-menu-md-end"}>
                  <li className={"dropdown-item"}>
                    <MdLightMode className={"me-1"} />
                    Light Mode
                  </li>
                  <li className={"dropdown-item"}>
                    <MdDarkMode className={"me-1"} />
                    Dark Mode
                  </li>
                  <li className={"dropdown-item"}>
                    <CgDarkMode className={"me-1"} />
                    Auto
                  </li>
                </ul>
              </div>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
