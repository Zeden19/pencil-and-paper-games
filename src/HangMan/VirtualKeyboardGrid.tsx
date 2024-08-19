import VirtualKeys from "./VirtualKeys.tsx";

function VirtualKeyboardGrid() {
  // prettier-ignore
  const letterKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z",
    "X", "C", "V", "B", "N", "M"];

  return (
    <div className={"container-sm text-center g-1"}>
      <div className={"row"}>{letterKeys.map((key) => (
        <VirtualKeys letterKey={key} key={key} />
      ))}</div>
    </div>
  );
}

export default VirtualKeyboardGrid;
