//todo abstract title and layout of pages into component for this, home, about & contact
import styles from "./styles.module.css";

function LeaderboardPage() {
  return (
    <div className={"container"}>
      <h1 className={`text-center pt-4 pb-1 ${styles.title}`}>Leaderboards</h1>
    </div>
  );
}

export default LeaderboardPage;
