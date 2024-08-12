import { GiTicTacToe } from "react-icons/gi";
import { MdAccountCircle, MdDarkMode } from "react-icons/md";

function Navigation() {
  const iconRightSize = 30;
  return (
    <nav className={"navbar navbar-expand"}>
      <div className={"container-fluid align-items-center"}>
        <div className={"d-flex align-items-center"}>
          <a className={"navbar-brand"}>
            <GiTicTacToe size={50} />
          </a>
          <div className={"d-flex gap-2"}>
            <div className={"dropdown"}>
              <a
                className={"nav-link dropdown-toggle"}
                role={"button"}
                data-bs-toggle={"dropdown"}
                aria-expanded={"false"}
              >
                Games
              </a>

              <ul className={"dropdown-menu"}>
                <li>
                  <a className={"dropdown-item"}>Tic Tac Toe</a>
                </li>
                <li>
                  <a className={"dropdown-item"}>Hang Man</a>
                </li>
                <li>
                  <a className={"dropdown-item"}>Connect 4</a>
                </li>
                <li>
                  <a className={"dropdown-item"}>Battleship</a>
                </li>
              </ul>
            </div>

            <a className={"nav-link"}>About</a>
            <a className={"nav-link"}>Contact</a>
          </div>
        </div>

        <div className={"d-flex gap-2"}>
          <a className={"nav-item"}>
            <MdAccountCircle size={iconRightSize} />
          </a>
          <a className={"nav-item"}>
            <MdDarkMode size={iconRightSize} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
