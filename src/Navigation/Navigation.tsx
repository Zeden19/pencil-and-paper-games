//todo: Split this component up & fix file structure
import { GiTicTacToe } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import AuthControl from"./AuthControl.tsx";
import { ColorControl } from "./ColorControl.tsx";
import { RouteButtons } from "./RouteButtons.tsx";

function Navigation() {
  const iconRightSize = "2.5rem";
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
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <RouteButtons />
          <div className={"d-flex gap-4"}>
            <AuthControl iconRightSize={iconRightSize} />
            <ColorControl size={iconRightSize} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
