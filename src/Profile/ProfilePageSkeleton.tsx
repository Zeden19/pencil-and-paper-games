import styles from "./styles.module.css";
import React from "react";

function ProfilePageSkeleton() {
  const skeletonGames = [1, 2, 3, 4];
  return (
    <div className={`placeholder-glow ${styles.container}`}>
      <div className={`${styles.leftContainer}`}>
        {/*Image*/}
        <span
          style={{ height: "17em" }}
          className={"rounded-circle mb-4 col-12 placeholder placeholder-lg w-100"}></span>

        <div className={styles.nameDescription}>
          {/*Profile Info*/}
          <h2 className={"placeholder rounded"} style={{ overflowWrap: "break-word" }}>
            Skeleton title
          </h2>
          <p style={{ overflowWrap: "break-word" }} className={"placeholder rounded"}>
            This is my description. It can get pretty long though.
          </p>
          <button
            aria-disabled={true}
            className={"btn btn-secondary disabled w-100 mb-5 placeholder"}
          />
        </div>
      </div>

      {/*Games played*/}
      <div className={`${styles.rightContainer}`}>
        <div className={"fw-bold fs-3 mb-2 placeholder rounded"}>Games Played</div>
        <div className={`bg-body-secondary rounded-3 px-3 w-100 pb-2`}>
          {skeletonGames.map((skeleton) => (
            <div
              className={`d-flex justify-content-between py-2 border-bottom border-secondary-subtle ${styles.gameCard}`}
              key={skeleton}>
              <div className={"fs-5 placeholder rounded"}>Tic Tac Toe</div>
              <div className={"fs-5 placeholder rounded col-1"}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
