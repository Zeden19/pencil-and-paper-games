import { ReactNode } from "react";

interface Props {
  title: string;
  startFunction: () => void;
  playing: boolean;
  children: ReactNode;
  aboveHelpButtons?: ReactNode;
}

function GamePages({ title, startFunction, children, playing, aboveHelpButtons = "" }: Props) {
  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 pt-3 pb-2"}>{title}</h2>
      {children}
      <button className={"btn btn-primary d-block my-2 px-4 m-auto"} onClick={startFunction}>
        {playing ? "Reset" : "Play"}
      </button>
      {aboveHelpButtons}
      <button className={"btn btn-primary"}>Help</button>
    </div>
  );
}

export default GamePages;
