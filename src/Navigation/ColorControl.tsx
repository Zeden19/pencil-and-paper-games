import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ColorControl(props: { size: string }) {
  return (
    <li className={"d-flex flex-row"}>
      <div className={"dropdown nav-item"}>
        <MdDarkMode
          role={"button nav-link"}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          size={props.size}
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
        </ul>
      </div>
    </li>
  );
}

export default ColorControl;