import VirtualKeys from "./VirtualKeys.tsx";

function VirtualKeyboardGrid() {
  // prettier-ignore
  const letterKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z",
    "X", "C", "V", "B", "N", "M"];

  return (
    <div className={"container text-center"}>
      <div className={"row row-cols-10 justify-content-center flex-nowrap"}>
        {letterKeys.slice(0, 10).map((key) => (
          <VirtualKeys letterKey={key} key={key} />
        ))}
      </div>
      <div className={"row row-cols-9 justify-content-center"}>
        {letterKeys.slice(10, 19).map((key) => (
          <VirtualKeys letterKey={key} key={key} />
        ))}
      </div>
      <div className={"row row-cols-7 justify-content-center"}>
        {letterKeys.slice(19).map((key) => (
          <VirtualKeys letterKey={key} key={key} />
        ))}
      </div>
    </div>
  );
}

export default VirtualKeyboardGrid;
