import { ReactNode } from "react";

interface Props {
  title: string;
  startFunction: () => void;
  playing: boolean;
  children: ReactNode;
  helpModalId: string;
  helpModalDescription: ReactNode;
  aboveHelpButtons?: ReactNode;
}

function GamePages({
  title,
  startFunction,
  children,
  playing,
  helpModalId,
  helpModalDescription,
  aboveHelpButtons = "",
}: Props) {
  return (
    <div className={"container-fluid text-center bg-body-tertiary pb-3"}>
      <h2 className={"h2 pt-3 pb-2"}>{title}</h2>
      {children}
      <button className={"btn btn-primary d-block my-2 px-4 m-auto"} onClick={startFunction}>
        {playing ? "Reset" : "Play"}
      </button>
      {aboveHelpButtons}
      <button
        type={"button"}
        className={"btn btn-primary"}
        data-bs-toggle="modal"
        data-bs-target={"#" + helpModalId}
      >
        Help
      </button>

      {/*Modal*/}
      {/*We could make this better by including things like: difficulty, number of players, description in a nice layout*/}
      {/*We could also include little pictures that show the game*/}
      <div
        className="modal fade"
        id={helpModalId}
        tabIndex={parseInt("-1")}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title + " - Help"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div style={{ whiteSpace: "pre-line" }} className="modal-body">
              {helpModalDescription}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePages;
