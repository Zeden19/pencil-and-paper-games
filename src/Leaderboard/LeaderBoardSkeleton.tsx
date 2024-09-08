import styles from "./styles.module.css";
import { gameFields } from "../Navigation/gameFields.tsx";

function LeaderBoardSkeleton() {
  const leaderBoardSkeletons = [1, 2, 3, 4, 5];
  return (
    <div className={"container text-center"}>
      <h1 className={`text-center mt-4 mb-1 placeholder-lg placeholder rounded col-4`} />

      <div
        style={{ margin: "auto" }}
        className={"row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"}>
        {gameFields.map((game) => (
          <div key={game.label} className={"col p-3"}>
            <div className={"bg-body-tertiary card"}>
              <div className={"card-body"}>
                <h3 className={"card-title mb-4 fs-4 placeholder rounded"}>
                  {game.icon} {game.label}
                </h3>

                {/*Leaderboard list*/}
                <ul style={{ listStyle: "none" }} className={`${styles.orderedList}`}>
                  {leaderBoardSkeletons.map((skeleton) => (
                    <li key={skeleton} className={`py-2 border-bottom border-secondary-subtle`}>
                      <div className={"d-flex justify-content-between"}>
                        <div className={"w-100 text-start"}>
                          <span
                            style={{ height: "auto", width: "10%" }}
                            className={"rounded-circle me-3 placeholder"}
                          />
                          <span className={"link-secondary col-11 placeholder rounded w-50"} />
                        </div>
                        <div className={"me-2 placeholder rounded col-1"} />
                      </div>
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoardSkeleton;
