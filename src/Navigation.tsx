import { GiBattleship, GiTicTacToe } from "react-icons/gi";
import {
  MdAccountCircle,
  MdDarkMode,
  MdGridOff,
  MdLightMode,
} from "react-icons/md";
import { PiPersonSimpleBold, PiSignInBold } from "react-icons/pi";
import { CgDarkMode } from "react-icons/cg";

function Navigation() {
  const iconRightSize = "2rem";
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <GiTicTacToe size={"3.5rem"} />
        </a>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
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
                  <a className="dropdown-item" href="#">
                    <GiTicTacToe className={"me-1"} /> Tic-Tac-toe
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <MdGridOff className={"me-1"} />
                    Connect 4
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    <PiPersonSimpleBold className={"me-1"} />
                    Hangman
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <GiBattleship className={"me-1"} />
                    BattleShip
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"#"}>
                Contact
              </a>
            </li>
          </ul>
          <div className={"d-flex gap-4"}>
            <li className="d-flex">
              <div className={"dropdown nav-item"}>
                <MdAccountCircle
                  className={"nav-link dropdown-toggle"}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role={"button"}
                  size={iconRightSize}
                />
                <ul className={"dropdown-menu"}>
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
                  className={"nav-link dropdown-toggle"}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role={"button"}
                  size={iconRightSize}
                />
                <ul className={"dropdown-menu"}>
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
